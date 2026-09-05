# PRD — Kain Nusantara (KN) · sesi audit-perbaikan 2026-09-05

## Pernyataan masalah (asli)
Lanjutkan development repo `https://github.com/snakissb/KN`: clone, verifikasi catatan audit
(`INSTRUKSI_PERBAIKAN_2026-09.md`, `audit_temuan_2026_09.py`, patch) — jika valid perbaiki, tanpa
merusak yang sudah benar; validasi cermat. Pemilih: kerjakan 11 temuan sesuai urutan gelombang;
pemisahan per temuan cukup di laporan; setuju mengubah default env (CORS/cookie/seed).

## Arsitektur
FastAPI (`backend/`, 122 router · 189 service · MongoDB via Motor) + React CRA (`frontend/`) +
guardrail statik/runtime (`scripts/gate.sh`, `scripts/guardrails/*`). Data demo `seed_realistic.py`,
fondasi `bootstrap.run_bootstrap()` saat backend start. Lingkungan dipulihkan `bash .restore_env.sh`.
Login demo: `admin@kainnusantara.id / demo12345` (lihat `memory/test_credentials.md`).

## Persona
Admin · Manajer · Admin Sales · Finance · Sales · Gudang · Desainer · Sopir · MD · Admin Gudang (ERP tekstil multi-PT).

## Yang dikerjakan 2026-09-05 (rincian + bukti: `memory/LAPORAN_PERBAIKAN_2026-09.md`)
- T-05 runner korpus permanen `scripts/run_corpus.py` + `scripts/triase_korpus.py` → `memory/TRIASE_KORPUS_2026-09.md` (220 skrip: 84 lulus · 58 lingkungan · 2 uji basi · 76 tidak tahu); pemeriksa basi `INV-GL-REV-01` diperbaiki.
- T-06 `scripts/install_hooks.sh`, `.github/workflows/gate.yml` (belum pernah dijalankan di GitHub).
- T-02 CORS gagal-berisik + cookie Secure dari env + `backend/.env.example`.
- T-08 `SEED_DEMO_ENABLED` bawaan false (dev `.env` = true).
- T-07 `scripts/gen_codebase_map.py` + guard `INV-DOC-01`; `CODEBASE_MAP.md` digenerate.
- T-11 `approve_order` idempoten; T-09 saran reorder sadar `rnd.lifecycle_enforcement` (+lencana FE); T-10 `/ar-receipts` 403 sebelum 422.
- T-03 Lapis 1–3: filter `movement_type` ke query (COLLSCAN→IXSCAN, hasil identik) + guard `INV-PERF-01` (ratchet).
- T-04 tabel triase `memory/TRIASE_NPLUS1_2026-09.md` (214 kandidat, nol perbaikan).
- T-01 Langkah 1 klaim atomik `resolve-escalation` outbound (+probe ulang-jalan) · Langkah 2 `memory/INVENTARIS_MULTI_KOLEKSI_2026-09.md` (87 endpoint).

## Yang dikerjakan 2026-09-05 sesi lanjutan (repo `pandeyoga/kn123`; rincian: `memory/LAPORAN_SESI_2026-09-05_LANJUTAN.md`)
- Keputusan T-01: **Opsi B saga** — `services/atomic_claim.py` (claim/finish_set/release), `routers/saga_locks.py` (admin list+release), klaim di 12 endpoint (9 router + 3 service: reverse retur beli/jual, putaway confirm-arrival) + CAS `so_transition`/PO close/cancel + compensate `POST /sales-orders`; guard **INV-ATOMIC-01** (`verify_atomic_claim.py`, ratchet baseline 62, mekanisme claim/cas/service/compensate) di gate.
- Panel admin "Kunci Saga" di Pusat Pengaturan (`SagaLocksPanel.jsx`, tab admin-only) — daftar & lepas `saga_lock` menggantung.
- `.restore_env.sh` [3b] gagal berisik bila `CORS_ORIGINS` kosong/`*` atau backend bukan 200.
- Skrip ragu selesai: `fase_f_write_flows` lulus di seed bersih; `po_timeline_approval` id seed dibetulkan (11/11).
- T-05: `scripts/codemod_env_url.py` → 67 berkas URL→env; 21 skrip lulus penuh lagi; 11 skrip basi dihapus (korpus 210). Dok: `memory/TRIASE_KORPUS_2026-09_TINDAK_LANJUT.md`.
- Seed: `clear_collections` dinamis (semua koleksi kecuali `KEEP_MASTER`) + `_replant_bootstrap()` → md@/wh.admin@ & fondasi hidup tanpa restart.
- Eskalasi menggantung: `POST /outbound/tasks/{id}/reopen-escalation` + lencana/panel/tombol di `EscalationManagement.jsx`.
- Lingkungan: `backend/.env` wajib `CORS_ORIGINS` eksplisit (template `*` membuat backend menolak start).
- Testing agent iteration_314: semua PASS. `gate.sh --quick`: 5 merah pra-eksisting saja.

## Yang dikerjakan 2026-09-05 sesi 5 (repo `snakissb/KN`; probe: `scripts/probe_sesi5_saga.py` 27/27 PASS)
- Lingkungan: repo di-clone ke `/app`, `.env` backend diberi `CORS_ORIGINS` eksplisit (template `*` ditolak backend), deps + seed + build FE.
- **Ratchet INV-ATOMIC-01 58 → 55**: klaim saga di `return_service.reverse_writeoff` (sesudah target roll scrap ditentukan) & `relocate_return_rolls` (finish_set + `$push relocation_legs`), `ar_receipt_service.void_receipt` (klaim `status != void`, release bila `reverse_decision` gagal, finish_set) → `saga_locks.LOCKED_COLLECTIONS` + `ar_receipts` (label panel "Kwitansi pembayaran"); `POST /inventory/initial-stock` kompensasi (`rollback_initial_stock` hapus roll+mutasi bila mutasi/rebuild gagal); `inbound resolve-escalation` CAS `escalation.status != resolved` → balapan `[200, 409]`.
- Guard `verify_atomic_claim.py`: raise 4xx sesudah klaim TIDAK dituduh bila didahului `_saga.release(` (≤3 baris) — self-test 19 kasus HIJAU.
- **T-03 Lapis 4 (paginasi opt-in, kompatibel mundur)**: `GET /hr/attendance`, `/hr/visits`, `/hr/field-tracks` → envelope bila `?page=`; `GET /products/{id}/purchase-history` proyeksi field terbatas + `events_page` bila `?page=`.
- Verifikasi: probe 27/27 · `verify_data_integrity` 247/0/2 WARN (pra-eksisting) · `gate.sh --quick` 52 PASS, 5 merah = persis pra-eksisting · panel Kunci Saga menampilkan kunci `ar_receipts`.

## Backlog (prioritas)
- P0 55 endpoint multi-koleksi BELUM DITINJAU (INV-ATOMIC-01 ratchet): berikutnya kandidat dari `memory/INVENTARIS_MULTI_KOLEKSI_2026-09.md` (mis. quarantine/release retur, cash/bank, interco).
- P1 T-05: 2 REGISTRY GAP (P2); T-04 perbaiki 2 lokasi `PERBAIKI`.
- P1 `warehouse_id` saran reorder (keputusan pemilik masih terbuka).
- P2 5 gate `--quick` merah pra-eksisting (INV-UI-01/UI-10/UX-01/i18n); T-10 daftar saudara 459 endpoint; jalankan CI di GitHub.
