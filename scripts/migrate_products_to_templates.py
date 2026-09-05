"""Migrasi §D — setiap produk (varian) mendapat INDUK hidup (`product_templates`).
Idempoten; laporan angka. Pakai: python3 scripts/migrate_products_to_templates.py"""
import asyncio
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "backend"))
from dotenv import load_dotenv  # noqa: E402
load_dotenv(ROOT / "backend" / ".env")


async def main() -> int:
    from services import product_variant_service as pvs
    before = await pvs.count_orphans()
    res = await pvs.resolve_orphans("Migrasi §D")
    print(f"produk yatim sebelum: {before} → sesudah: {res['orphans_left']}; ditautkan {res['products_linked']}, induk baru {res['templates_created']}")
    return 0 if res["orphans_left"] == 0 else 1


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
