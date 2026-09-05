"""Varian produk — INDUK WAJIB (keputusan pemilik 2026-09, §D).

Model: `product_templates` = induk (style/katalog, spesifikasi & harga dasar diwarisi);
`products` = VARIAN per axis (warna · grade · lebar) — SKU, stok, roll, RFID, harga, SO/PO
semuanya hidup di level varian (sudah demikian: setiap dokumen merujuk `product_id`).
Modul ini menjamin tidak ada produk yatim: `ensure_parent()` menautkan/menciptakan induk
dari nama produk, `resolve_orphans()` memulihkan `template_id` yang menunjuk induk mati.
"""
from __future__ import annotations

import re
from typing import Any, Dict, List

from core_utils import now_iso, safe_doc
from db import db
from services import product_template_service as tpl

_SUFFIX = re.compile(r"\s*\((per [A-Za-z]+|siap print,?\s*per [A-Za-z]+)\)\s*$", re.I)


def family_name(product: Dict[str, Any]) -> str:
    """Nama induk dari nama varian: buang penanda satuan `(per Kg)` dan kata 'Sisa'."""
    n = _SUFFIX.sub("", (product.get("name") or "").strip())
    n = re.sub(r"\bSisa\b", "", n).strip(" -")
    return re.sub(r"\s{2,}", " ", n) or (product.get("sku") or "Produk")


def variant_attrs(product: Dict[str, Any]) -> Dict[str, Any]:
    attrs = dict(product.get("variant_attrs") or {})
    attrs.setdefault("color", (product.get("color") or "").strip() or "-")
    attrs.setdefault("grade", (product.get("grade") or "A").strip())
    if product.get("lebar"):
        attrs.setdefault("lebar", product.get("lebar"))
    if product.get("variant") and product.get("variant") not in ("Regular", "Standard"):
        attrs.setdefault("quality", product.get("variant"))
    return attrs


def variant_label(attrs: Dict[str, Any]) -> str:
    parts = [str(attrs.get("color") or "").strip()]
    if attrs.get("quality"):
        parts.append(str(attrs["quality"]))
    parts.append(f"Grade {attrs.get('grade', 'A')}")
    return " · ".join(p for p in parts if p and p != "-") or "Standar"


async def ensure_parent(product: Dict[str, Any], actor: str = "System") -> Dict[str, Any]:
    """Pastikan produk (varian) punya induk HIDUP; buat induk dari nama bila belum ada."""
    tid = (product.get("template_id") or "").strip()
    parent = await db.product_templates.find_one({"id": tid}, {"_id": 0}) if tid else None
    if not parent:
        fam = family_name(product)
        parent = await db.product_templates.find_one({"name": fam}, {"_id": 0})
    if not parent:
        parent = await tpl.create_template({
            "name": family_name(product), "category": product.get("category") or "Kain",
            "fabric_type": product.get("fabric_type") or "", "motif": product.get("motif") or "Polos",
            "stage": product.get("stage") or "finished", "description": product.get("description") or "",
            "image": product.get("image") or "", "base_unit": product.get("base_unit") or "meter",
            "base_price": product.get("price") or 0, "gramasi": product.get("gramasi") or 0,
            "lebar": product.get("lebar") or 0, "supplier": product.get("supplier") or "Internal",
            "yarn_count": product.get("yarn_count") or "", "yarn_count_system": product.get("yarn_count_system") or "",
            "axes": [{"key": "color", "label": "Warna", "values": []}, {"key": "grade", "label": "Grade", "values": ["A", "B", "C"]}],
        }, actor)
    attrs = variant_attrs(product)
    await db.products.update_one({"id": product["id"]}, {"$set": {
        "template_id": parent["id"], "variant_attrs": attrs, "variant_label": variant_label(attrs),
        "updated_at": now_iso()}})
    return safe_doc(parent)


async def resolve_orphans(actor: str = "System") -> Dict[str, Any]:
    """Migrasi: semua produk tanpa induk hidup ditautkan (idempoten, laporan angka)."""
    live = {t["id"] for t in await db.product_templates.find({}, {"_id": 0, "id": 1}).to_list(5000)}
    fixed, created_before = 0, len(live)
    async for p in db.products.find({}, {"_id": 0}):
        if (p.get("template_id") or "") in live and p.get("variant_label"):
            continue
        await ensure_parent(p, actor)
        fixed += 1
    live_after = await db.product_templates.count_documents({})
    return {"products_linked": fixed, "templates_created": live_after - created_before,
            "orphans_left": await count_orphans()}


async def count_orphans() -> int:
    live = {t["id"] for t in await db.product_templates.find({}, {"_id": 0, "id": 1}).to_list(5000)}
    return sum(1 for p in await db.products.find({}, {"_id": 0, "template_id": 1}).to_list(20000)
               if (p.get("template_id") or "") not in live)


async def family_summary(template_id: str) -> Dict[str, Any]:
    """Induk untuk katalog & agregasi: daftar varian + stok tersedia/dipesan per varian & total."""
    parent = await db.product_templates.find_one({"id": template_id}, {"_id": 0})
    if not parent:
        return {}
    variants = await db.products.find({"template_id": template_id}, {"_id": 0}).to_list(2000)
    ids = [v["id"] for v in variants]
    agg: Dict[str, Dict[str, float]] = {}
    async for b in db.inventory_balances.find({"product_id": {"$in": ids}}, {"_id": 0}):
        a = agg.setdefault(b["product_id"], {"available": 0.0, "reserved": 0.0, "rolls": 0})
        a["available"] += float(b.get("available") or b.get("available_qty") or 0)
        a["reserved"] += float(b.get("reserved") or b.get("reserved_qty") or 0)
    rolls = await db.inventory_rolls.aggregate([
        {"$match": {"product_id": {"$in": ids}, "length_remaining": {"$gt": 0}}},
        {"$group": {"_id": "$product_id", "n": {"$sum": 1}, "tagged": {"$sum": {"$cond": [{"$ifNull": ["$rfid_tag_id", False]}, 1, 0]}}}}]).to_list(2000)
    rmap = {r["_id"]: r for r in rolls}
    rows: List[Dict[str, Any]] = []
    for v in variants:
        a = agg.get(v["id"], {"available": 0.0, "reserved": 0.0})
        r = rmap.get(v["id"], {})
        rows.append({"id": v["id"], "sku": v.get("sku"), "name": v.get("name"), "variant_label": v.get("variant_label"),
                     "variant_attrs": v.get("variant_attrs") or {}, "price": v.get("price"), "status": v.get("status"),
                     "available": round(a["available"], 2), "reserved": round(a["reserved"], 2),
                     "rolls": r.get("n", 0), "rolls_tagged": r.get("tagged", 0)})
    return {"template": safe_doc(parent), "variants": rows,
            "totals": {"variants": len(rows), "available": round(sum(x["available"] for x in rows), 2),
                       "reserved": round(sum(x["reserved"] for x in rows), 2), "rolls": sum(x["rolls"] for x in rows)}}
