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

## Yang dikerjakan 2026-09-06 sesi 15 (laporan: `memory/LAPORAN_SESI_2026-09-06_SESI15.md`)
- BUG FIX (user): harga khusus disetujui kini terpakai di keranjang/pesanan HP sales (`MobileCart` + `useEffectivePrices`, badge sumber harga).
- Offline sales: idempotency `/sales-orders`, `/hr/visits`, `/price-approvals`; check-in/out & pesanan lewat antrean; `OfflineBanner` di app sales.
- Job `printer_stuck_watch` (label > 30 mnt tanpa printer online → notifikasi kepala gudang & manager, dedupe).
- Service worker `public/sw.js` (app shell + data terakhir, `X-From-Cache`, banner tugas dari cache).
- Ratchet INV-ATOMIC-01 34 → 30 (bank recon book-charge/holding/allocate/cancel). Guard 60 cek.
- Probe `scripts/probe_sesi15.py` SEMUA PASS · gate hijau · testing agent iteration_330 semua PASS.

## Yang dikerjakan 2026-09-06 sesi 14 (laporan: `memory/LAPORAN_SESI_2026-09-06_SESI14.md`)
- Offline HP gudang: middleware `Idempotency-Key` (replay balasan pertama, `X-Idempotent-Replay`), antrean localStorage + `OfflineBanner`, `POST /rfid/roll-scans` (replay pindai offline, last_scan hanya maju).
- Ratchet INV-ATOMIC-01 36 → 34: klaim verify/cycle-count complete; kompensasi transfer antar-PT; guard 55 cek.
- `GET /rfid/printer-status` + `PrinterStatusWidget` (Kesehatan gudang & HP Pindai); bin/lokasi terakhir roll (HP input bin, Lot roll table, Jejak Barang).
- Probe `scripts/probe_sesi14.py` 14/14 PASS · gate hijau · testing agent iteration_329 semua PASS.

## Yang dikerjakan 2026-09-06 sesi 13 (laporan: `memory/LAPORAN_SESI_2026-09-06_SESI13.md`)
- Ratchet INV-ATOMIC-01 38 → 36: encode tag CAS+kompensasi, retire tag CAS, advance CAS + `expected_status`; guard mekanisme `service_cas`.
- Label saat penerimaan desktop (banner inbound: popup / antrean); antrean printer bersama `kind=qr_label` (ZPL QR) di Lot/PO/inbound; panel Print & Verify menandai job QR.
- Riwayat pindai roll: `roll_scans` + `last_scan` dari `/rfid/lookup`, `GET /rfid/roll-scans/{id}`, timeline Jejak Barang + HP.
- Offline HP gudang: DITUNDA (disepakati) — perlu antrean IndexedDB + idempotency key backend.
- Probe `scripts/probe_sesi13.py` 15/15 PASS · gate hijau · testing agent iteration_327 (+ retest advance).

## Yang dikerjakan 2026-09-06 sesi 12 (laporan: `memory/LAPORAN_SESI_2026-09-06_SESI12.md`)
- Ratchet INV-ATOMIC-01 41 → 38: scan-pick CAS (picked_qty prasyarat → 409 STATE_CHANGED), klaim `dispatch_task` & `process_qc_decision` (finish_set/mark_failed).
- Pindai roll saran FIFO → tugas potong sampel (+customer_name) langsung terbuka di HP.
- Cetak massal label: `GET /rfid/labels?po_id|lot_id|task_id`, tombol di Lot detail & PO detail (`printRollLabelsBulk`).
- Probe `scripts/probe_sesi12.py` SEMUA PASS · gate hijau · testing agent iteration_326 semua PASS.

## Yang dikerjakan 2026-09-06 sesi 11 (laporan: `memory/LAPORAN_SESI_2026-09-06_SESI11.md`)
- Ratchet INV-ATOMIC-01 48 → 41: klaim `transfer_return_roll_ownership` (service), kompensasi `POST /transfers` & `POST /wms/tasks` (rollback_task_shell + safe_unlink_all), `rfid/ingest` ditinjau service (append-only).
- Cetak ulang label QR roll: `utils/rollLabels.js` (sumber tunggal); HP (Pindai + kartu tugas ber-roll), desktop (RFID Tags, Belum Ber-tag, Lot detail tab Roll).
- Pindai → Aksi: `GET /rfid/lookup` + `open_tasks` (roll_id/suggested/roll reserved SO → tugas ambil); HP membuka kartu tugas otomatis (`focusTaskId`).
- Probe `scripts/probe_sesi11.py` SEMUA PASS · gate `--quick` hijau · testing agent iteration_325 semua PASS.

## Yang dikerjakan 2026-09-05 sesi 10 (laporan: `memory/LAPORAN_SESI_2026-09-05_SESI10.md`)
- QR nomor roll pada label potongan & roll inbound; `GET /rfid/lookup` + pindai HP gudang (ketik/kamera) tanpa RFID; ratchet 49 → 48 (DELETE transfers).

## Yang dikerjakan 2026-09-05 sesi 9 (laporan: `memory/LAPORAN_SESI_2026-09-05_SESI9.md`)
- Ratchet INV-ATOMIC-01 51 → 49 (ship-to-supplier, simulate-payment, closing reopen/reclose); tab Sampel di 360 pelanggan; label roll baru inbound dari HP gudang.

## Yang dikerjakan 2026-09-05 sesi 8 (laporan: `memory/LAPORAN_SESI_2026-09-05_SESI8.md`)
- Ratchet INV-ATOMIC-01 54 → 51 (lead convert, goods-back retur beli, resolve-exception putaway); label cetak potongan sampel di HP gudang; peta lacak lapangan memuat jejak per halaman.

## Yang dikerjakan 2026-09-05 sesi 7 — sisa plan gelombang (laporan: `memory/LAPORAN_SESI_2026-09-05_SESI7.md`)
- Modul Jual Sampel §3-C lengkap (master harga per induk, quote FIFO, potong dengan klaim atomik + P-1, SO `sample` + kwitansi, mobile gudang & sales, tab hub Penjualan).
- Warna sumber tunggal + SKU varian = prefix induk + kode warna; aksi tugas gudang di mobile (Terima/Selesai, Ambil/Berangkatkan, Potong).
- Probe `scripts/probe_sesi7_sampel.py` 23/23.

## Yang dikerjakan 2026-09-05 sesi 6 — GELOMBANG 2026-09 (laporan: `memory/LAPORAN_SESI_2026-09-05_GELOMBANG.md`)
- Semua vonis auditor diverifikasi SAH. Gelombang 0: P-1 (potongan tidak mewarisi tag RFID) + penjaga INV-RFID-01 + skrip diagnosa; P-2 siap.
- Mobile SEMUA peran (cangkang bersama): gudang (tugas/pindai/belum tag), peran lain (persetujuan/KPI/desktop), sales +Minta Harga/Kunjungan/Stok.
- §3-B: satu komponen `SpecialPriceRequestForm` di 4 pintu; bukti WAJIB (400 EVIDENCE_REQUIRED); scope bawaan `order`; `GET /price-approvals/hint`.
- §D: induk WAJIB (`product_variant_service`), migrasi 15 induk/20 varian/0 yatim, `GET /product-templates/{id}/summary`.
- Paginasi layar SDM; ratchet 55→54 (quarantine/release); 5 gate merah pra-eksisting ditutup.
- Probe `scripts/probe_sesi6_gelombang.py` 16/16.

## Yang dikerjakan 2026-09-05 sesi 5 (repo `snakissb/KN`; probe: `scripts/probe_sesi5_saga.py` 27/27 PASS)
- Lingkungan: repo di-clone ke `/app`, `.env` backend diberi `CORS_ORIGINS` eksplisit (template `*` ditolak backend), deps + seed + build FE.
- **Ratchet INV-ATOMIC-01 58 → 55**: klaim saga di `return_service.reverse_writeoff` (sesudah target roll scrap ditentukan) & `relocate_return_rolls` (finish_set + `$push relocation_legs`), `ar_receipt_service.void_receipt` (klaim `status != void`, release bila `reverse_decision` gagal, finish_set) → `saga_locks.LOCKED_COLLECTIONS` + `ar_receipts` (label panel "Kwitansi pembayaran"); `POST /inventory/initial-stock` kompensasi (`rollback_initial_stock` hapus roll+mutasi bila mutasi/rebuild gagal); `inbound resolve-escalation` CAS `escalation.status != resolved` → balapan `[200, 409]`.
- Guard `verify_atomic_claim.py`: raise 4xx sesudah klaim TIDAK dituduh bila didahului `_saga.release(` (≤3 baris) — self-test 19 kasus HIJAU.
- **T-03 Lapis 4 (paginasi opt-in, kompatibel mundur)**: `GET /hr/attendance`, `/hr/visits`, `/hr/field-tracks` → envelope bila `?page=`; `GET /products/{id}/purchase-history` proyeksi field terbatas + `events_page` bila `?page=`.
- Verifikasi: probe 27/27 · `verify_data_integrity` 247/0/2 WARN (pra-eksisting) · `gate.sh --quick` 52 PASS, 5 merah = persis pra-eksisting · panel Kunci Saga menampilkan kunci `ar_receipts`.

## Backlog (prioritas)
- P1 COGS eksplisit per potongan sampel bila kebijakan menuntut; `simulate-payment` (invoices.py) tinjau sebagai compensate/log-only.
- P0 30 endpoint multi-koleksi BELUM DITINJAU (INV-ATOMIC-01 ratchet): berikutnya entities POST/DELETE/archive, config impact-apply, categories PATCH.
- P1 Mobile sales: audit paritas fitur ERP vs HP (user melaporkan banyak fitur terpotong) — layar "Lainnya" masih menyematkan komponen desktop (CRM, Retur, Pesanan Khusus, Daftar Harga); buat versi mobile-native + tambah Piutang/tagih, Inbox persetujuan harga, Customer 360.
- P1 Offline: katalog/pelanggan tersimpan cache (SW sudah menyimpan GET /products, /customers, /dashboard); antrean pesanan offline butuh UI daftar pesanan tertunda.
- P1 T-05: 2 REGISTRY GAP (P2); T-04 perbaiki 2 lokasi `PERBAIKI`.
- P1 `warehouse_id` saran reorder (keputusan pemilik masih terbuka).
- P2 5 gate `--quick` merah pra-eksisting (INV-UI-01/UI-10/UX-01/i18n); T-10 daftar saudara 459 endpoint; jalankan CI di GitHub.
