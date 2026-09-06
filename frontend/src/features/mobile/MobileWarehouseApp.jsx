import { useEffect, useState } from "react";
import { ClipboardList, ScanLine, Tags, PackageCheck, AlertTriangle, CheckCircle2, Loader2, Scissors, Printer } from "lucide-react";
import axios, { API } from "../../services/apiClient";
import MobileShell from "./MobileShell";
import { InboundActions, OutboundActions, SampleCutActions, printSampleLabel, printInboundRollLabels } from "./MobileTaskActions";

const STATUS_ID = { pending: "Menunggu", receiving: "Menerima", qc_check: "Cek QC", put_away: "Simpan", picking: "Ambil", packing: "Kemas", escalated: "Eskalasi", completed: "Selesai", shipped: "Terkirim" };

function TaskList({ type }) {
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState("");
  const [open, setOpen] = useState("");
  const [lastCut, setLastCut] = useState(null);
  const [lastInbound, setLastInbound] = useState(null);
  const load = () => axios.get(`${API}/wms/tasks`).then((r) => setRows((Array.isArray(r.data) ? r.data : r.data.items || r.data.tasks || []).filter((t) => (t.flow_type || t.type) === type && !["completed", "shipped", "cancelled", "done"].includes(t.status))))
    .catch((e) => setErr(e.response?.data?.detail || "Gagal memuat tugas."));
  useEffect(() => { load(); }, [type]); // eslint-disable-line
  if (err) return <div className="notice-bar danger m-4" data-testid="mw-task-error">{String(err)}</div>;
  if (rows === null) return <div className="p-6 text-center text-sm"><Loader2 className="animate-spin inline" size={16} /> Memuat…</div>;
  const label = { inbound: "barang masuk", outbound: "barang keluar", sample_cut: "potong sampel" }[type] || type;
  if (!rows.length) return <div className="p-8 text-center text-sm text-[#6E6E73]" data-testid="mw-task-empty">Tidak ada tugas {label} yang terbuka.</div>;
  const Actions = { inbound: InboundActions, outbound: OutboundActions, sample_cut: SampleCutActions }[type];
  return (
    <div className="space-y-2 p-3" data-testid={`mw-task-list-${type}`}>
      {lastInbound && (
        <div className="m-card p-3 bg-[#E6F6EC] space-y-2" data-testid={`mw-inbound-done-${lastInbound.task.id}`}>
          <div className="notice-bar success" data-testid={`mw-action-msg-${lastInbound.task.id}`}>SELESAI · {lastInbound.task.product_name} · {lastInbound.rolls.length} roll baru masuk stok{lastInbound.rolls.length ? `: ${lastInbound.rolls.map((r) => r.roll_no).join(", ")}` : ""}</div>
          {lastInbound.rolls.length > 0 && <button className="primary-button w-full py-3 flex items-center justify-center gap-2" onClick={() => printInboundRollLabels(lastInbound.task, lastInbound.rolls)} data-testid={`mw-inbound-print-${lastInbound.task.id}`}><Printer size={16} /> Cetak label {lastInbound.rolls.length} roll</button>}
          <button className="secondary-button w-full py-2" onClick={() => setLastInbound(null)} data-testid={`mw-inbound-done-close-${lastInbound.task.id}`}>Tutup</button>
        </div>
      )}
      {lastCut && (
        <div className="m-card p-3 bg-[#E6F6EC] space-y-2" data-testid={`mw-sample-done-${lastCut.taskId}`}>
          <div className="notice-bar success" data-testid={`mw-action-msg-${lastCut.taskId}`}>DIPOTONG · {lastCut.res.cut_roll_no} → <b>{lastCut.res.child_roll_no}</b> · {lastCut.res.sales_order_number}{lastCut.res.receipt_number ? ` · ${lastCut.res.receipt_number}` : ""}</div>
          <button className="primary-button w-full py-3 flex items-center justify-center gap-2" onClick={() => printSampleLabel(lastCut.res)} data-testid={`mw-sample-print-${lastCut.taskId}`}><Printer size={16} /> Cetak label potongan</button>
          <button className="secondary-button w-full py-2" onClick={() => setLastCut(null)} data-testid={`mw-sample-done-close-${lastCut.taskId}`}>Tutup</button>
        </div>
      )}
      {rows.map((t) => (
        <div key={t.id} className="m-card p-3" data-testid={`mw-task-${t.id}`} onClick={() => setOpen(open === t.id ? "" : t.id)}>
          <div className="flex items-center justify-between"><b className="text-[15px]">{t.product_name || t.product_id}</b>
            <span className={`status-pill ${t.status === "escalated" ? "pill-danger" : "pill-warning"}`}>{STATUS_ID[t.status] || t.status}</span></div>
          <div className="text-xs text-[#6E6E73] mt-1">{t.warehouse_name || t.warehouse_id} · qty <b className="tabular-nums">{t.quantity}</b> {t.unit || ""}{t.order_number ? ` · ${t.order_number}` : ""}{t.po_number ? ` · ${t.po_number}` : ""}{t.sample_number ? ` · ${t.sample_number}` : ""}</div>
          {open === t.id && Actions && <div onClick={(e) => e.stopPropagation()}><Actions task={t} onDone={load} onCut={(res) => { setLastCut({ taskId: t.id, res }); load(); }} onCompleted={(res) => { setLastInbound(res); load(); }} /></div>}
        </div>
      ))}
    </div>
  );
}

function ScanPanel() {
  const [epc, setEpc] = useState("");
  const [res, setRes] = useState(null);
  const [busy, setBusy] = useState(false);
  const scan = async () => {
    if (!epc.trim()) return;
    setBusy(true); setRes(null);
    try {
      const { data } = await axios.get(`${API}/rfid/tags`);
      const tags = Array.isArray(data) ? data : data.tags || data.items || [];
      const hit = tags.find((t) => (t.epc || "").toLowerCase() === epc.trim().toLowerCase() || t.id === epc.trim());
      if (!hit) { setRes({ kind: "bad", title: "TAG TIDAK DIKENAL", text: "EPC ini tidak terdaftar. Periksa tag atau tempel tag baru." }); return; }
      const held = ["reserved", "committed", "picked", "packed"].includes(hit.roll_status);
      setRes({ kind: held ? "warn" : "ok", title: held ? "TERIKAT PESANAN" : "COCOK",
        text: `${hit.roll_no || hit.roll_id} · ${hit.product_name || hit.product_id || ""} · status ${hit.roll_status || "-"} · ${hit.warehouse_id || ""}` });
    } catch (e) { setRes({ kind: "bad", title: "GAGAL", text: e.response?.data?.detail || "Pindai gagal, coba lagi." }); }
    finally { setBusy(false); }
  };
  const Icon = res?.kind === "ok" ? CheckCircle2 : AlertTriangle;
  return (
    <div className="p-4 space-y-3" data-testid="mw-scan">
      <p className="text-sm text-[#6E6E73]">Pindai / ketik EPC tag roll. Hasil ditampilkan besar: ikon + teks, bukan warna saja.</p>
      <input className="w-full rounded-xl border-2 border-[#E5E5EA] p-4 text-lg" placeholder="EPC tag…" value={epc} onChange={(e) => setEpc(e.target.value)} data-testid="mw-scan-input" autoFocus />
      <button className="primary-button w-full py-4 text-lg" disabled={busy} onClick={scan} data-testid="mw-scan-btn">{busy ? "Mengirim…" : "Pindai"}</button>
      {res && (
        <div className={`rounded-2xl p-5 text-center ${res.kind === "ok" ? "bg-[#E6F6EC]" : res.kind === "warn" ? "bg-[#FFF4E5]" : "bg-[#FDECEC]"}`} data-testid={`mw-scan-result-${res.kind}`}>
          <Icon size={44} className="mx-auto" />
          <div className="text-xl font-bold mt-2">{res.title}</div>
          <div className="text-sm mt-1">{res.text}</div>
        </div>
      )}
    </div>
  );
}

function UntaggedPanel() {
  const [rows, setRows] = useState(null);
  useEffect(() => { axios.get(`${API}/rfid/untagged-rolls`).then((r) => setRows(Array.isArray(r.data) ? r.data : r.data.rolls || r.data.items || [])).catch(() => setRows([])); }, []);
  if (rows === null) return <div className="p-6 text-center text-sm">Memuat…</div>;
  if (!rows.length) return <div className="p-8 text-center text-sm text-[#6E6E73]" data-testid="mw-untagged-empty">Semua roll sudah bertag.</div>;
  return (
    <div className="space-y-2 p-3" data-testid="mw-untagged-list">
      <div className="text-xs text-[#6E6E73] px-1">{rows.length} roll belum bertag (termasuk potongan baru — P-1).</div>
      {rows.map((r) => (
        <div key={r.id} className="m-card p-3 flex items-center justify-between" data-testid={`mw-untagged-${r.id}`}>
          <div><b>{r.roll_no}</b><div className="text-xs text-[#6E6E73]">{r.product_name || r.product_id} · {r.warehouse_id} · sisa {r.length_remaining} {r.unit || ""}</div></div>
          <Tags size={18} />
        </div>
      ))}
    </div>
  );
}

export default function MobileWarehouseApp(props) {
  const tabs = [
    { id: "inbound", label: "Masuk", icon: PackageCheck, render: () => <TaskList type="inbound" /> },
    { id: "outbound", label: "Keluar", icon: ClipboardList, render: () => <TaskList type="outbound" /> },
    { id: "sample", label: "Sampel", icon: Scissors, render: () => <TaskList type="sample_cut" /> },
    { id: "scan", label: "Pindai", icon: ScanLine, render: () => <ScanPanel /> },
    { id: "untagged", label: "Belum Tag", icon: Tags, render: () => <UntaggedPanel /> },
  ];
  return <MobileShell {...props} tabs={tabs} testId="mobile-warehouse-app" />;
}
