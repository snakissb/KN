import { useState } from "react";
import { Loader2 } from "lucide-react";
import axios, { API } from "../../services/apiClient";

const errText = (e, fb) => { const d = e.response?.data?.detail; return (d && (d.message || (typeof d === "string" ? d : JSON.stringify(d)))) || fb; };
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/** Label kecil 58mm untuk potongan sampel: nomor roll anak, pelanggan, panjang, produk, SO. */
export function printSampleLabel(r) {
  const html = `<!doctype html><html lang="id"><head><meta charset="utf-8"><title>Label ${esc(r.child_roll_no)}</title>
<style>@page{size:58mm 40mm;margin:2mm}body{font-family:Arial,sans-serif;margin:0;width:54mm}
.no{font-size:20px;font-weight:800;letter-spacing:.5px}.row{font-size:11px;margin-top:2px}.b{font-weight:700}.small{font-size:9px;color:#444;margin-top:4px}</style></head>
<body><div class="no">${esc(r.child_roll_no)}</div>
<div class="row b">${esc(r.customer_name)}</div>
<div class="row">${esc(r.product_name)} · ${esc(r.sku)}</div>
<div class="row"><span class="b">${esc(r.length)} ${esc(r.unit)}</span> · dari ${esc(r.cut_roll_no)}</div>
<div class="small">${esc(r.number)} · ${esc(r.sales_order_number || "")} · ${new Date().toLocaleDateString("id-ID")}</div>
<script>window.onload=function(){window.print();}</script></body></html>`;
  const w = window.open("", "_blank", "width=420,height=360");
  if (!w) return;
  w.document.open(); w.document.write(html); w.document.close();
}

/** Aksi tugas gudang di mobile (Tahap 2): satu tombol besar per langkah, hasil = ikon + teks. */
/** Label roll baru inbound (58×40 mm per roll): nomor roll besar, produk, panjang, grade, lot. */
export function printInboundRollLabels(task, rolls) {
  const pages = (rolls || []).map((r) => `<section><div class="no">${esc(r.roll_no)}</div>
<div class="row b">${esc(task.product_name || task.product_id)}</div>
<div class="row"><span class="b">${esc(r.length)} ${esc(r.unit || task.unit || "")}</span> · Grade ${esc(r.grade || "A")}</div>
<div class="row">Lot ${esc(r.lot || "-")}${r.dye_lot ? ` · Dye ${esc(r.dye_lot)}` : ""}</div>
<div class="small">${esc(task.po_number || "")} · ${esc(task.warehouse_name || task.warehouse_id || "")} · ${new Date().toLocaleDateString("id-ID")}</div></section>`).join("");
  const html = `<!doctype html><html lang="id"><head><meta charset="utf-8"><title>Label roll</title>
<style>@page{size:58mm 40mm;margin:2mm}body{font-family:Arial,sans-serif;margin:0;width:54mm}section{page-break-after:always;padding-bottom:2mm}
.no{font-size:20px;font-weight:800;letter-spacing:.5px}.row{font-size:11px;margin-top:2px}.b{font-weight:700}.small{font-size:9px;color:#444;margin-top:4px}</style></head>
<body>${pages}<script>window.onload=function(){window.print();}</script></body></html>`;
  const w = window.open("", "_blank", "width=420,height=360");
  if (!w) return;
  w.document.open(); w.document.write(html); w.document.close();
}

export function InboundActions({ task, onDone, onCompleted }) {
  const [qty, setQty] = useState(String(task.expected_qty ?? task.quantity ?? ""));
  const [lot, setLot] = useState(""); const [dye, setDye] = useState("");
  const [msg, setMsg] = useState(null); const [busy, setBusy] = useState(false);
  const run = async (fn, ok) => { setBusy(true); setMsg(null); try { await fn(); setMsg({ ok: true, text: ok }); onDone?.(); } catch (e) { setMsg({ ok: false, text: errText(e, "Gagal.") }); } finally { setBusy(false); } };
  const receive = () => run(() => axios.post(`${API}/inbound/tasks/${task.id}/scan-receive`, { product_id: task.product_id, actual_qty: parseFloat(qty) || 0 }), "Diterima. Lanjut Selesai bila semua sudah dihitung.");
  const complete = async () => {
    setBusy(true); setMsg(null);
    try {
      const { data } = await axios.post(`${API}/inbound/tasks/${task.id}/complete`, { supplier_lot: lot, dye_lot: dye });
      // Hasil + tombol cetak label diangkat ke induk (bertahan setelah kartu hilang dari daftar).
      onCompleted?.({ task, rolls: data.created_rolls || [] });
    } catch (e) { setMsg({ ok: false, text: errText(e, "Gagal.") }); } finally { setBusy(false); }
  };
  return (
    <div className="mt-2 space-y-2" data-testid={`mw-inbound-actions-${task.id}`}>
      {["pending", "receiving", "in_progress"].includes(task.status) && (
        <div className="flex gap-2">
          <input type="number" className="flex-1 rounded-lg border p-3 text-lg" value={qty} onChange={(e) => setQty(e.target.value)} data-testid={`mw-receive-qty-${task.id}`} />
          <button className="primary-button px-4" disabled={busy} onClick={receive} data-testid={`mw-receive-btn-${task.id}`}>Terima</button>
        </div>
      )}
      {["receiving", "qc_check", "in_progress"].includes(task.status) && (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <input className="rounded-lg border p-2" placeholder="Lot supplier" value={lot} onChange={(e) => setLot(e.target.value)} data-testid={`mw-lot-${task.id}`} />
            <input className="rounded-lg border p-2" placeholder="Dye lot" value={dye} onChange={(e) => setDye(e.target.value)} data-testid={`mw-dye-${task.id}`} />
          </div>
          <button className="secondary-button w-full py-3" disabled={busy} onClick={complete} data-testid={`mw-complete-btn-${task.id}`}>{busy ? <Loader2 size={14} className="animate-spin inline" /> : null} Selesai (masuk stok)</button>
        </div>
      )}
      {msg && <div className={`notice-bar ${msg.ok ? "success" : "danger"}`} data-testid={`mw-action-msg-${task.id}`}>{msg.text}</div>}
    </div>
  );
}

export function OutboundActions({ task, onDone }) {
  const [qty, setQty] = useState(String(task.quantity ?? ""));
  const [msg, setMsg] = useState(null); const [busy, setBusy] = useState(false);
  const run = async (fn, ok) => { setBusy(true); setMsg(null); try { await fn(); setMsg({ ok: true, text: ok }); onDone?.(); } catch (e) { setMsg({ ok: false, text: errText(e, "Gagal.") }); } finally { setBusy(false); } };
  const pick = () => run(() => axios.post(`${API}/outbound/tasks/${task.id}/scan-pick`, null, { params: { actual_qty: parseFloat(qty) || 0 } }), "Diambil. Lanjut Berangkatkan bila sudah dikemas.");
  const dispatch = () => run(() => axios.post(`${API}/outbound/tasks/${task.id}/dispatch`), "Diberangkatkan — surat jalan dibuat.");
  return (
    <div className="mt-2 space-y-2" data-testid={`mw-outbound-actions-${task.id}`}>
      {["pending", "created", "picking", "in_progress", "released"].includes(task.status) && (
        <div className="flex gap-2">
          <input type="number" className="flex-1 rounded-lg border p-3 text-lg" value={qty} onChange={(e) => setQty(e.target.value)} data-testid={`mw-pick-qty-${task.id}`} />
          <button className="primary-button px-4" disabled={busy} onClick={pick} data-testid={`mw-pick-btn-${task.id}`}>Ambil</button>
        </div>
      )}
      {["picked", "packing", "packed", "ready"].includes(task.status) && (
        <button className="secondary-button w-full py-3" disabled={busy} onClick={dispatch} data-testid={`mw-dispatch-btn-${task.id}`}>Berangkatkan</button>
      )}
      {msg && <div className={`notice-bar ${msg.ok ? "success" : "danger"}`} data-testid={`mw-action-msg-${task.id}`}>{msg.text}</div>}
    </div>
  );
}

export function SampleCutActions({ task, onCut }) {
  const [epc, setEpc] = useState(""); const [rollId, setRollId] = useState(""); const [reason, setReason] = useState("");
  const [msg, setMsg] = useState(null); const [busy, setBusy] = useState(false);
  const cut = async (useSuggested) => {
    setBusy(true); setMsg(null);
    try {
      const body = useSuggested ? { roll_id: task.suggested_roll_id } : { epc, roll_id: rollId, reason };
      const { data } = await axios.post(`${API}/sample-requests/${task.sample_request_id}/cut`, body);
      // Hasil + tombol cetak diangkat ke induk (TaskList) supaya tetap tampil setelah kartu tugas hilang dari daftar.
      onCut?.(data);
    } catch (e) { setMsg({ ok: false, text: errText(e, "Potong gagal.") }); } finally { setBusy(false); }
  };
  return (
    <div className="mt-2 space-y-2" data-testid={`mw-sample-actions-${task.id}`}>
      <div className="text-xs text-[#6E6E73]">Untuk {task.customer_name} · {task.quantity} {task.unit} · saran FIFO: <b>{task.suggested_roll_no || "tidak ada"}</b></div>
      {task.suggested_roll_id && <button className="primary-button w-full py-3" disabled={busy} onClick={() => cut(true)} data-testid={`mw-sample-cut-suggested-${task.id}`}>Potong roll saran ({task.suggested_roll_no})</button>}
      <div className="rounded-lg border p-2 space-y-2">
        <div className="text-xs">Roll lain (pindai EPC atau ketik ID roll) — wajib alasan bila bukan saran:</div>
        <input className="w-full rounded-lg border p-2" placeholder="EPC tag" value={epc} onChange={(e) => setEpc(e.target.value)} data-testid={`mw-sample-epc-${task.id}`} />
        <input className="w-full rounded-lg border p-2" placeholder="atau ID roll" value={rollId} onChange={(e) => setRollId(e.target.value)} data-testid={`mw-sample-rollid-${task.id}`} />
        <input className="w-full rounded-lg border p-2" placeholder="Alasan (mis. roll saran tidak ditemukan)" value={reason} onChange={(e) => setReason(e.target.value)} data-testid={`mw-sample-reason-${task.id}`} />
        <button className="secondary-button w-full py-2" disabled={busy || (!epc && !rollId)} onClick={() => cut(false)} data-testid={`mw-sample-cut-other-${task.id}`}>Potong roll ini</button>
      </div>
      {msg && <div className={`notice-bar ${msg.ok ? "success" : "danger"}`} data-testid={`mw-action-msg-${task.id}`}>{msg.text}</div>}
    </div>
  );
}
