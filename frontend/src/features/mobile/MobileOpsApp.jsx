import { useEffect, useState } from "react";
import { Inbox, Gauge, Monitor, Loader2 } from "lucide-react";
import axios, { API } from "../../services/apiClient";
import MobileShell from "./MobileShell";
import { formatCurrency } from "../../utils/formatters";

function QueuePanel() {
  const [q, setQ] = useState(null);
  const [err, setErr] = useState("");
  useEffect(() => { axios.get(`${API}/approvals/my-queue`).then((r) => setQ(r.data)).catch((e) => setErr(e.response?.data?.detail || "Antrean tidak bisa dimuat.")); }, []);
  if (err) return <div className="notice-bar danger m-4" data-testid="mo-queue-error">{String(err)}</div>;
  if (!q) return <div className="p-6 text-center text-sm"><Loader2 className="animate-spin inline" size={16} /> Memuat…</div>;
  const items = q.items || q.queue || [];
  if (!items.length) return <div className="p-8 text-center text-sm text-[#6E6E73]" data-testid="mo-queue-empty">Tidak ada persetujuan yang menunggu Anda.</div>;
  return (
    <div className="space-y-2 p-3" data-testid="mo-queue-list">
      {items.map((it, i) => (
        <div key={it.id || i} className="m-card p-3" data-testid={`mo-queue-${it.id || i}`}>
          <div className="flex justify-between"><b>{it.doc_number || it.number || it.title || it.stage_label || it.stage}</b><span className="status-pill pill-warning">{it.stage_label || it.stage || "menunggu"}</span></div>
          <div className="text-xs text-[#6E6E73] mt-1">{it.customer_name || it.requester_name || ""}{it.amount != null ? ` · ${formatCurrency(it.amount)}` : ""}</div>
        </div>
      ))}
      <p className="text-xs text-[#6E6E73] px-1">Memutuskan persetujuan dilakukan di tampilan desktop (ikon monitor di atas).</p>
    </div>
  );
}

function KpiPanel() {
  const [d, setD] = useState(null);
  useEffect(() => { axios.get(`${API}/dashboard`).then((r) => setD(r.data)).catch(() => setD({})); }, []);
  if (!d) return <div className="p-6 text-center text-sm">Memuat…</div>;
  const nums = Object.entries(d).filter(([, v]) => typeof v === "number").slice(0, 8);
  if (!nums.length) return <div className="p-8 text-center text-sm text-[#6E6E73]" data-testid="mo-kpi-empty">Belum ada angka ringkas untuk peran ini.</div>;
  return (
    <div className="grid grid-cols-2 gap-2 p-3" data-testid="mo-kpi">
      {nums.map(([k, v]) => (
        <div key={k} className="m-card p-3"><div className="text-[11px] text-[#6E6E73]">{k.replace(/_/g, " ")}</div><div className="text-xl font-bold tabular-nums">{v}</div></div>
      ))}
    </div>
  );
}

export default function MobileOpsApp(props) {
  const tabs = [
    { id: "queue", label: "Persetujuan", icon: Inbox, render: () => <QueuePanel /> },
    { id: "kpi", label: "Ringkas", icon: Gauge, render: () => <KpiPanel /> },
    { id: "desktop", label: "Desktop", icon: Monitor, render: () => (
      <div className="p-6 text-center space-y-3" data-testid="mo-desktop">
        <p className="text-sm">Layar lengkap peran <b>{props.user?.role}</b> tersedia di tampilan desktop.</p>
        <button className="primary-button w-full py-4" onClick={props.onForceDesktop} data-testid="mo-open-desktop">Buka Tampilan Desktop</button>
      </div>) },
  ];
  return <MobileShell {...props} tabs={tabs} testId="mobile-ops-app" />;
}
