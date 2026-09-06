# Laporan Sesi 16 — 2026-09-06

## Permintaan
Mobile sales native (Pelanggan, Retur, Pesanan Khusus, Daftar Harga) · Piutang & kwitansi di HP sales · Pesanan tertunda offline · Ratchet entities/impact-apply.

## Mobile sales native (menggantikan komponen desktop yang terpotong di "Lainnya")
- `MobileCustomers.jsx`: daftar kartu + cari; detail 360 satu layar (piutang terbuka, jatuh tempo, tab Tagihan/Pesanan/Kwitansi/Sampel) dari `GET /customers/{id}/360` (kini memuat `payments` = kwitansi pelanggan).
- `MobileArReceipt.jsx`: catat pembayaran dari HP — alokasi FIFO otomatis ke `GET /ar-receipts/open-orders` (bisa diubah), metode, catatan, kelebihan → titipan; `offlinePost` (Idempotency-Key). **Kebijakan**: peran `sales` kini diberi `ar_receipt.create` (bootstrap GRANT idempoten) — keputusan user; sebelumnya E8.2 memindahkan ke finance.
- `MobileSalesNative.jsx`: `MobileReturns` (daftar + detail + buat retur dari pesanan terkirim, alasan dari master `complaint-reasons`, `quantity_returned`), `MobileSpecialOrders` (daftar + form ringkas `custom_item`), `MobilePricelist` (harga efektif per pelanggan dari `GET /customer-prices` dengan badge sumber).
- `MobilePendingQueue.jsx`: daftar aksi/pesanan yang masih antre di HP (tab Pesanan & Lainnya) + batalkan sebelum terkirim (`askConfirm`) + "Kirim sekarang".
- Idempotency prefixes + `/ar-receipts`, `/sales-returns`, `/special-orders`. `audit_create_modal`: `INLINE_DIBOLEHKAN` untuk sub-halaman HP (form menukar layar).

## Ratchet INV-ATOMIC-01: 30 → 26
- `entity_lifecycle.archive_entity`: CAS `status ≠ archived` → 409 (`service_cas`, dipakai POST archive & DELETE).
- `config_impact_service.apply`: klaim `products` sesudah validasi; body ke `_apply_plan`; `mark_failed` bila gagal; `release` di `finally`.
- `POST /entities` ditinjau `service` (id baru, seed idempoten). Guard 64 cek PASS.

## Verifikasi
- `scripts/probe_sesi16.py` SEMUA PASS (archive balapan `[200,409]`, impact-apply 409/400/200 tanpa kunci, 360 + open-orders + kwitansi idempoten oleh sales, customer-prices, retur/pesanan khusus). Gate: ux/i18n/create_modal/blocking_dialogs hijau. Testing agent: iteration terbaru.
