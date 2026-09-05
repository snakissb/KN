# Hasil runner korpus — 2026-09-05T11:56:37

- commit: `bb8f8c8` · skrip: **220** · rc=0: **78** · rc≠0: **142** · timeout: 0
- perintah: `scripts/run_corpus.py --out coverage_data/corpus_run_2026-09-05_baseline.json --md .logs/corpus_baseline.md`

| # | Skrip | Mode | RC | Lulus/Total | Detik | Galat pertama |
|---|---|---|---|---|---|---|
| 1 | `backend/tests/test_audit_findings_reproduction.py` | pytest | 1 | 5/6 | 1.7 | FAILED tests/test_audit_findings_reproduction.py::test_D1_pagar_menuduh_saat_papan_hilang |
| 2 | `backend/tests/test_config_clear_layer.py` | pytest | 5 | ? | 0.4 |  |
| 3 | `backend/tests/test_f0b_entity_scoping.py` | pytest | 1 | 89/91 | 41.3 | FAILED tests/test_f0b_entity_scoping.py::test_list_view_all_via_query_admin[/suppliers] |
| 4 | `backend/tests/test_f0cdef_multientity.py` | pytest | 1 | 57/64 | 29.4 | FAILED tests/test_f0cdef_multientity.py::TestF0C_OperationalIsolation::test_header_ent_kanda[/inventory/rolls] |
| 5 | `backend/tests/test_f1a_pricelist.py` | pytest | 1 | 14/16 | 5.5 | FAILED tests/test_f1a_pricelist.py::TestSOIntegration::test_so_uses_entity_price_for_ksc |
| 6 | `backend/tests/test_f1b_product_templates.py` | pytest | 1 | 7/20 | 3.7 | FAILED tests/test_f1b_product_templates.py::test_create_template_ok - Asserti... |
| 7 | `backend/tests/test_f2_stock_buckets.py` | pytest | 0 | 20/20 | 7.0 |  |
| 8 | `backend/tests/test_fb01_ai_illustration.py` | pytest | 1 | 6/13 | 4.1 | FAILED tests/test_fb01_ai_illustration.py::TestIllustrateMockup::test_mockup_creates_ai_illustration_file |
| 9 | `backend/tests/test_fb02_logistics.py` | pytest | 1 | 24/29 | 4.2 | FAILED tests/test_fb02_logistics.py::TestRBAC::test_driver_update_allowed - A... |
| 10 | `backend/tests/test_g5_poc.py` | pytest | 0 | 12/12 | 5.9 |  |
| 11 | `backend/tests/test_g6_poc.py` | pytest | 1 | 17/21 | 7.5 | FAILED tests/test_g6_poc.py::test_US6_netting_dua_transaksi - AssertionError:... |
| 12 | `backend/tests/test_g6b_poc.py` | pytest | 1 | 13/15 | 10.6 | FAILED tests/test_g6b_poc.py::test_b3_siklus_retur_demo_penuh - AssertionErro... |
| 13 | `backend/tests/test_gelombang1_gl_integrity.py` | pytest | 1 | 0/18 | 0.7 | FAILED tests/test_gelombang1_gl_integrity.py::TestFlow3_VendorBill_GL::test_a_prerequisite |
| 14 | `backend/tests/test_gelombang3_auth_ppn12.py` | pytest | 1 | 10/11 | 20.8 | FAILED tests/test_gelombang3_auth_ppn12.py::TestSalesOrderGL::test_payment_creates_balanced_je_with_revenue_equals_grand_minus_ppn |
| 15 | `backend/tests/test_home_boards_and_drift.py` | pytest | 0 | 5/5 | 2.3 |  |
| 16 | `backend/tests/test_interco_g6.py` | pytest | 1 | 7/13 | 1.9 | FAILED tests/test_interco_g6.py::test_05_fixed_price_without_contract_rejected |
| 17 | `backend/tests/test_iter251_drift_and_isolation.py` | pytest | 0 | 7/7 | 2.5 |  |
| 18 | `backend/tests/test_iter252_critical_cross_entity.py` | pytest | 1 | 6/9 | 2.7 | FAILED tests/test_iter252_critical_cross_entity.py::test_recon_shows_kanda_drift_900k |
| 19 | `backend/tests/test_iter253_session_2026_06b.py` | pytest | 2 | 0/1 | 0.4 | ERROR tests/test_iter253_session_2026_06b.py - AttributeError: 'NoneType' obj... |
| 20 | `backend/tests/test_iter254_session_2026_06c.py` | pytest | 0 | 8/8 | 9.2 |  |
| 21 | `backend/tests/test_iter255_t1_t8.py` | pytest | 1 | 1/18 | 0.5 | FAILED tests/test_iter255_t1_t8.py::test_login_returns_token_field - requests... |
| 22 | `backend/tests/test_iter256_e2e_flow_sweep.py` | pytest | 1 | 0/53 | 6.6 | FAILED tests/test_iter256_e2e_flow_sweep.py::test_login_all_roles[admin] - As... |
| 23 | `backend/tests/test_iter258_purchase_e2e_and_recon.py` | pytest | 1 | 4/13 | 2.7 | FAILED tests/test_iter258_purchase_e2e_and_recon.py::TestRantaiBeli::test_03_create_po |
| 24 | `backend/tests/test_iter260_board_returns.py` | pytest | 0 | 10/10 | 5.4 |  |
| 25 | `backend/tests/test_iter261_pipeline_eligibility.py` | pytest | 0 | 15/15 | 2.5 |  |
| 26 | `backend/tests/test_iter263_wms_rfid_r0r1r2.py` | pytest | 1 | 19/27 | 7.2 | FAILED tests/test_iter263_wms_rfid_r0r1r2.py::TestR0Sites::test_list_sites_seeded |
| 27 | `backend/tests/test_iter264_putaway_fixes.py` | pytest | 1 | 1/2 | 1.5 | FAILED tests/test_iter264_putaway_fixes.py::TestSuggestGradeAware::test_grade_b_group_includes_retur |
| 28 | `backend/tests/test_iter265_r3r4r5.py` | pytest | 1 | 22/33 | 4.4 | FAILED tests/test_iter265_r3r4r5.py::TestR3DeviceIngest::test_01_api_key_issue_and_idempotent |
| 29 | `backend/tests/test_iter266_r6_cc_r7.py` | pytest | 1 | 19/31 | 2.4 | FAILED tests/test_iter266_r6_cc_r7.py::TestR6Incidents::test_01_ingest_red_creates_incident |
| 30 | `backend/tests/test_iter267_notif_health_multileg.py` | pytest | 1 | 7/18 | 2.9 | FAILED tests/test_iter267_notif_health_multileg.py::TestHealthDashboard::test_shape_and_totals |
| 31 | `backend/tests/test_iter268_order_preview.py` | pytest | 0 | 8/8 | 3.3 |  |
| 32 | `backend/tests/test_iter270_reallocate_extra.py` | pytest | 0 | 3/3 | 4.8 |  |
| 33 | `backend/tests/test_iter272_blanket_unit.py` | pytest | 1 | 0/3 | 0.9 | FAILED tests/test_iter272_blanket_unit.py::TestBlanketUnitValidation::test_bogus_unit_rejected |
| 34 | `backend/tests/test_iter273_approval_rules.py` | pytest | 0 | 12/12 | 2.0 |  |
| 35 | `backend/tests/test_iter274_regresi_ringan.py` | pytest | 1 | 7/9 | 2.1 | FAILED tests/test_iter274_regresi_ringan.py::TestDemoDataIntact::test_counts[/makloon-orders-5] |
| 36 | `backend/tests/test_iter275_g1_admin_sales_audit.py` | pytest | 1 | 38/41 | 9.7 | FAILED tests/test_iter275_g1_admin_sales_audit.py::TestOrientasi::test_desk_finance_5_antrean |
| 37 | `backend/tests/test_iter276_g2_md_audit.py` | pytest | 1 | 42/46 | 14.2 | FAILED tests/test_iter276_g2_md_audit.py::TestAlurG::test_G3_setujui_pr_lalu_realisasikan_jadi_po |
| 38 | `backend/tests/test_iter277_gates_pin_isolation.py` | pytest | 2 | 0/1 | 0.4 | ERROR tests/test_iter277_gates_pin_isolation.py - AssertionError: REACT_APP_B... |
| 39 | `backend/tests/test_iter278_fulfillment_whguard.py` | pytest | 0 | 10/10 | 5.1 |  |
| 40 | `backend/tests/test_iter279_po_line_lock.py` | pytest | 0 | 16/16 | 4.7 |  |
| 41 | `backend/tests/test_iter280_makloon_partial_queue.py` | pytest | 0 | 0/0 | 1.1 |  |
| 42 | `backend/tests/test_iter281_demo_wave12.py` | pytest | 0 | 5/5 | 1.7 |  |
| 43 | `backend/tests/test_iter284_pb01_md02_md08.py` | pytest | 1 | 5/13 | 1.3 | FAILED tests/test_iter284_pb01_md02_md08.py::test_pb01_blanket_create_ok - As... |
| 44 | `backend/tests/test_iter285_feedback_export_hutang.py` | pytest | 1 | 16/17 | 3.6 | FAILED tests/test_iter285_feedback_export_hutang.py::test_finance_desk_hutang_jatuh_tempo |
| 45 | `backend/tests/test_iter288_logistics_gps.py` | pytest | 1 | 6/10 | 1.6 | FAILED tests/test_iter288_logistics_gps.py::TestPositionGps::test_delivery_precondition |
| 46 | `backend/tests/test_iter289_driver_today.py` | pytest | 1 | 12/16 | 3.2 | FAILED tests/test_iter289_driver_today.py::TestMine::test_driver_only_own - A... |
| 47 | `backend/tests/test_iter291_audit_probes.py` | pytest | 1 | 21/22 | 4.8 | FAILED tests/test_iter291_audit_probes.py::TestDriverRbac::test_driver_can_act_on_delivery_not_assigned_to_him |
| 48 | `backend/tests/test_iter292_audit_fixes.py` | pytest | 0 | 12/12 | 4.9 |  |
| 49 | `backend/tests/test_iter292_f01_dispatch_gl.py` | pytest | 1 | 1/2 | 20.9 | FAILED tests/test_iter292_f01_dispatch_gl.py::test_f01_dispatch_posts_revenue_and_cogs |
| 50 | `backend/tests/test_iter293_audit_backlog.py` | pytest | 0 | 19/19 | 3.9 |  |
| 51 | `backend/tests/test_iter294_numbering_pdf.py` | pytest | 0 | 6/6 | 2.4 |  |
| 52 | `backend/tests/test_iter295_role_desks_bridge.py` | pytest | 1 | 2/9 | 1.9 | ERROR tests/test_iter295_role_desks_bridge.py::TestMdDesk::test_md_desk_structure |
| 53 | `backend/tests/test_iter297_revenue_policy.py` | pytest | 0 | 5/5 | 1.1 |  |
| 54 | `backend/tests/test_iter298_kebpdpt_e2e.py` | pytest | 1 | 1/15 | 2.9 | FAILED tests/test_iter298_kebpdpt_e2e.py::TestAdvanceBeforeShipment::test_01_create_order_and_advance_receipt |
| 55 | `backend/tests/test_iter299_prorata_advance_report.py` | pytest | 1 | 2/20 | 4.4 | FAILED tests/test_iter299_prorata_advance_report.py::TestPartialDispatchProrata::test_01_order_and_advance |
| 56 | `backend/tests/test_iter301_rbac_pricing_uom.py` | pytest | 1 | 0/24 | 1.8 | ERROR tests/test_iter301_rbac_pricing_uom.py::TestApprovalRbac::test_my_queue_forbidden[driver] |
| 57 | `backend/tests/test_iter302_approval_rbac.py` | pytest | 1 | 0/16 | 1.7 | ERROR tests/test_iter302_approval_rbac.py::TestApprovalQueueRbac::test_denied_roles_get_403[md] |
| 58 | `backend/tests/test_iter303_doc_resolve.py` | pytest | 0 | 12/12 | 2.4 |  |
| 59 | `backend/tests/test_iter305_hpp_from_po.py` | pytest | 1 | 4/7 | 1.7 | FAILED tests/test_iter305_hpp_from_po.py::TestHppEnrich::test_btk_mega_hpp_from_roll |
| 60 | `backend/tests/test_iter306_hpp_redaction_bootstrap.py` | pytest | 1 | 5/6 | 1.5 | FAILED tests/test_iter306_hpp_redaction_bootstrap.py::TestDashboardHpp::test_admin_dashboard_products_have_hpp |
| 61 | `backend/tests/test_m3_auto_elim_consolidation.py` | pytest | 1 | 0/10 | 0.3 | ERROR tests/test_m3_auto_elim_consolidation.py::TestAutoElimSync::test_sync_creates_auto_elim_for_new_pair |
| 62 | `backend/tests/test_m3_coa_per_pt_and_ic_transfer.py` | pytest | 1 | 0/17 | 0.3 | ERROR tests/test_m3_coa_per_pt_and_ic_transfer.py::TestCoAPerPT::test_list_accounts_global_only_no_entity_param |
| 63 | `backend/tests/test_notifications_addressing.py` | pytest | 1 | 4/5 | 1.0 | FAILED tests/test_notifications_addressing.py::test_entity_isolation_on_notifications |
| 64 | `backend/tests/test_price_approval_supersede_notification.py` | pytest | 1 | 9/12 | 2.5 | FAILED tests/test_price_approval_supersede_notification.py::test_supersede_creates_notification_for_sales_owner |
| 65 | `backend/tests/test_price_approvals_supersede.py` | pytest | 1 | 9/16 | 2.3 | FAILED tests/test_price_approvals_supersede.py::test_lifecycle_create_submit_approve |
| 66 | `backend/tests/test_roll_pick_and_reallocate.py` | pytest | 0 | 8/8 | 5.4 |  |
| 67 | `backend/tests/test_sesi_2026_06_papan_manajer.py` | pytest | 1 | 11/13 | 4.9 | FAILED tests/test_sesi_2026_06_papan_manajer.py::TestWaitingBoardsPayload::test_boards_shape[manager] |
| 68 | `backend/tests/test_uom_1_13.py` | pytest | 0 | 12/12 | 0.6 |  |
| 69 | `backend/tests/test_verifikasi_sesi_2026_08_25.py` | pytest | 1 | 9/11 | 3.9 | FAILED tests/test_verifikasi_sesi_2026_08_25.py::test_C1_C2_label_peran_dan_entitas |
| 70 | `backend/backend_test.py` | direct | 1 | 0/1 | 0.5 |   ❌ [FAIL] Login failed for admin@kainnusantara.id: 404 404 page not found |
| 71 | `backend/backend_test_18.py` | direct | 1 | 0/1 | 2.4 |   ❌ Login failed: 404 |
| 72 | `backend/backend_test_360_panels.py` | direct | 1 | ? | 0.5 | ❌ Login failed: 404 - 404 page not found |
| 73 | `backend/backend_test_bi_finance.py` | direct | 1 | ? | 0.3 | ❌ Login failed: Login failed: 404 |
| 74 | `backend/backend_test_crm_enforcements.py` | direct | 1 | 11/16 | 0.7 | ❌ FAILED - Login (all roles): Admin login failed: 404 |
| 75 | `backend/backend_test_depth1.py` | direct | 1 | 0/3 | 0.3 |   ❌ [FAIL] Login admin@kainnusantara.id failed: 404 |
| 76 | `backend/backend_test_depth3_enhancements.py` | direct | 1 | ? | 0.2 | ❌ FAIL - Expected 200, got 404 |
| 77 | `backend/backend_test_dyelot.py` | direct | 1 | ? | 0.2 |   ❌ [FAIL] Login failed: 404 404 page not found |
| 78 | `backend/backend_test_e0_isolation.py` | direct | 1 | ? | 0.9 | ❌ Login gagal: 404 - 404 page not found |
| 79 | `backend/backend_test_e4.py` | direct | 1 | ? | 0.9 |   ❌ [FAIL] Login admin@kainnusantara.id: 404 404 page not found |
| 80 | `backend/backend_test_epic7b_bank.py` | direct | 1 | ? | 0.2 |   ❌ [FAIL] Login failed for admin@kainnusantara.id: 404 404 page not found |
| 81 | `backend/backend_test_equity_changes.py` | direct | 1 | 0/1 | 0.5 |   ❌ [FAIL] Login failed: 404 404 page not found |
| 82 | `backend/backend_test_f0a_entity_context.py` | direct | 1 | ? | 0.2 | ❌ CRITICAL ERROR: Login failed for admin@kainnusantara.id: 404 - 404 page not found |
| 83 | `backend/backend_test_f3_mto_rma.py` | direct | 1 | ? | 0.4 |   ❌ [FAIL] Login failed for admin@kainnusantara.id: 404 404 page not found |
| 84 | `backend/backend_test_f6_approval_retirement.py` | direct | 1 | 0/22 | 2.9 | ❌ GET /api/approval-requests returns 404 |
| 85 | `backend/backend_test_fase4.py` | direct | 1 | ? | 0.2 | ❌   FAILED - Expected 200, got 404 |
| 86 | `backend/backend_test_fase_b.py` | direct | 1 | 0/1 | 0.7 | ❌ FAILED - Expected 200, got 404 |
| 87 | `backend/backend_test_fase_b_uom.py` | direct | 1 | ? | 0.5 |   ❌ [FAIL] Login failed for admin@kainnusantara.id: 404 |
| 88 | `backend/backend_test_fase_c_lot.py` | direct | 1 | ? | 0.5 |   ❌ [FAIL] Login failed for admin@kainnusantara.id: 404 404 page not found |
| 89 | `backend/backend_test_fase_f_closure.py` | direct | 1 | ? | 0.5 |   ❌ [FAIL] Login warehouse@kainnusantara.id — Status 404 |
| 90 | `backend/backend_test_fase_f_endpoints.py` | direct | 0 | 1/11 | 3.7 | [91m✗ Login failed for admin: 404 Client Error: Not Found for url: https://kn-product-hub.preview.emergentagent.com/api/auth/login[0m |
| 91 | `backend/backend_test_fase_f_final.py` | direct | 1 | ? | 1.0 |   ❌ [FAIL] Login failed for admin@kainnusantara.id: 404 |
| 92 | `backend/backend_test_fase_f_write_flows.py` | direct | 1 | ? | 0.4 | ❌ Login as admin@kainnusantara.id |
| 93 | `backend/backend_test_finance_analytics.py` | direct | 1 | ? | 0.3 | [12:02:31] ❌ Login failed: Login failed: 404 404 page not found |
| 94 | `backend/backend_test_g4_comprehensive.py` | direct | 0 | 0/0 | 0.4 | ❌ Login failed for admin: 404 |
| 95 | `backend/backend_test_g6.py` | direct | 1 | ? | 0.6 |   ❌ [FAIL] Login failed for admin@kainnusantara.id: 404 404 page not found |
| 96 | `backend/backend_test_g6_iter192.py` | direct | 1 | 0/1 | 0.3 |   ❌ [FAIL] Login failed: 404 404 page not found |
| 97 | `backend/backend_test_h1.py` | direct | 1 | ? | 0.3 | ❌   FAILED - Expected 200, got 404 |
| 98 | `backend/backend_test_ica_directional.py` | direct | 1 | ? | 0.5 | ❌ Failed - Expected 200, got 404 |
| 99 | `backend/backend_test_iteration_183.py` | direct | 2 | ? | 0.3 | FATAL ERROR: HTTPError: 404 Client Error: Not Found for url: https://nusantara-staging-1.preview.emergentagent.com/api/auth/login |
| 100 | `backend/backend_test_landed_cost.py` | direct | 1 | ? | 0.5 | ❌ Login admin: FAILED - Status 404 |
| 101 | `backend/backend_test_m0_color.py` | direct | 1 | 0/20 | 2.3 | ❌ FAILED: Admin login failed |
| 102 | `backend/backend_test_p4.py` | direct | 1 | ? | 0.4 |   ❌ [FAIL] Login failed: 404 404 page not found |
| 103 | `backend/backend_test_p5_p2.py` | direct | 1 | 0/1 | 0.5 |   ❌ [FAIL] Login failed for admin@kainnusantara.id: 404 404 page not found |
| 104 | `backend/backend_test_pdf_fase3.py` | direct | 1 | ? | 0.6 | ❌ FAIL — Login admin@kainnusantara.id (expected 200, got 404) |
| 105 | `backend/backend_test_phase2_forms.py` | direct | 1 | ? | 0.9 |   ❌ Login admin — status=404 |
| 106 | `backend/backend_test_po_timeline_approval.py` | direct | 1 | ? | 0.5 | ❌ Expected 200, got 404 - FAILED |
| 107 | `backend/backend_test_qc.py` | direct | 1 | ? | 0.3 |   ❌ [FAIL] Login failed: 404 404 page not found |
| 108 | `backend/backend_test_qc_4point.py` | direct | 1 | ? | 0.3 | ❌ FAIL: Admin login |
| 109 | `backend/backend_test_r1_05_06.py` | direct | 1 | ? | 0.2 | ❌ Login failed: 404 - 404 page not found |
| 110 | `backend/backend_test_r5_4b.py` | direct | 1 | ? | 0.6 | ❌ Admin login successful -  |
| 111 | `backend/backend_test_r6_3_budget.py` | direct | 1 | ? | 0.4 | ❌ FAILED - Expected 200, got 404 |
| 112 | `backend/backend_test_sales_returns.py` | direct | 1 | ? | 0.2 |   ❌ [FAIL] Admin login failed: 404 404 page not found |
| 113 | `backend/backend_test_tax_invoices.py` | direct | 1 | ? | 0.3 |   ❌ [FAIL] Login failed for admin@kainnusantara.id: 404 404 page not found |
| 114 | `backend/test_audit_2026_09_02_poc.py` | direct | 0 | ? | 1.7 | PASS 19 \| FAIL 0 |
| 115 | `backend/test_audit_temuan_poc.py` | direct | 0 | ? | 2.7 | PASS 34 \| FAIL 0 |
| 116 | `backend/test_core_approval_reminder_poc.py` | direct | 0 | ? | 2.3 | [1m▶ G5 — BUKTI-MERAH: ambang di Pusat Pengaturan benar-benar dipakai[0m |
| 117 | `backend/test_core_design_request_poc.py` | direct | 1 | ? | 4.7 |   [PASS] gate `check_nav_map` PASS (dulu CRASH `KeyError: 'designer'`)  [2mexit 0 · m============================================================[0m |
| 118 | `backend/test_core_dua_satuan_poc.py` | direct | 0 | 63/63 | 10.7 |   [PASS] satuan `hasta` disimpan di baris PO → gate MEMERAH (bukan lolos senyap) |
| 119 | `backend/test_core_e0_isolation_poc.py` | direct | 1 | ? | 2.2 |   [[92mPASS[0m] L1 BUKTI-MERAH: ada notifications milik ent_ksc di DB  (166 baris) |
| 120 | `backend/test_core_e1e2_poc.py` | direct | 1 | ? | 7.7 |   [[92mPASS[0m] E1.1c — BUKTI-MERAH: non-PKP TANPA NPWP tetap boleh (bukan asal blokir) |
| 121 | `backend/test_core_e3_write_guard_poc.py` | direct | 0 | 26/26 | 2.3 |   HASIL: 26 PASS · 0 FAIL |
| 122 | `backend/test_core_e4_master_layers_poc.py` | direct | 0 | 56/56 | 3.4 |   HASIL: 56 PASS · 0 FAIL |
| 123 | `backend/test_core_e4_poc.py` | direct | 1 | 35/41 | 2.7 |   [FAIL] Kanda memakai harga sendiri: None (asal: entity) |
| 124 | `backend/test_core_e5_visibility_poc.py` | direct | 0 | ? | 1.2 |   [[92mPASS[0m] BUKTI-MERAH: produk uji punya stok tersedia di 2 badan usaha  (product=prod_endek_bali_biru {'ent_kanda': 25.0, 'ent_ksc': 150.0}) |
| 125 | `backend/test_core_e7_interco_poc.py` | direct | 1 | ? | 4.2 |   [[92mPASS[0m] BUKTI-MERAH: pemasok bertipe 'Entitas grup' memang ada di daftar |
| 126 | `backend/test_core_e8_desk_poc.py` | direct | 1 | 94/97 | 4.3 |   [[91mFAIL[0m] jumlah keduanya = jumlah Admin Sales (tidak ada pesanan hilang)  (8+1 vs 47) |
| 127 | `backend/test_core_e8_roles_poc.py` | direct | 0 | 64/64 | 3.3 |   [[92mPASS[0m] BUKTI-MERAH parser: id sesudah komentar (& komentar berkoma) tetap terbaca  (['customers-crm', 'finance-tower', 'keuangan']) |
| 128 | `backend/test_core_f67_workflow_poc.py` | direct | 1 | ? | 2.2 | Traceback (most recent call last): |
| 129 | `backend/test_core_f6_approval_coverage_poc.py` | direct | 1 | ? | 2.7 | [1m▶ G5 — BUKTI-MERAH: suntik 1 transfer menunggu → angka WAJIB bergerak[0m |
| 130 | `backend/test_core_group_cash_migration_poc.py` | direct | 0 | ? | 3.7 |   HASIL: [92m38 PASS[0m · [91m0 FAIL[0m dari 38 pemeriksaan |
| 131 | `backend/test_core_inspeksi_poc.py` | direct | 1 | ? | 9.7 | [93mI8 · Gate INV-QC-01..03 dijalankan sungguhan — dan dibuktikan BISA MEMERAH[0m |
| 132 | `backend/test_core_lini_poc.py` | direct | 0 | 40/40 | 2.2 |   HASIL: 40 PASS · 0 FAIL |
| 133 | `backend/test_core_makloon_lini_poc.py` | direct | 0 | 35/35 | 2.0 | === HASIL POC FASE M: 35 PASS / 0 FAIL === |
| 134 | `backend/test_core_notifikasi_alamat_poc.py` | direct | 0 | ? | 1.4 |   HASIL: [92m35 PASS[0m · [92m0 FAIL[0m dari 35 pemeriksaan |
| 135 | `backend/test_core_p0_poc.py` | direct | 1 | ? | 4.2 |   [PASS] `INV-ORIG-01 --self-test` membuktikan gate BISA memerah (bukti-merah)  [2mexit 0 · K][0m R5 arah balik (PR→PO) hilang → MERAH |
| 136 | `backend/test_core_papan_po_custom_poc.py` | direct | 0 | ? | 2.4 |   [[92mPASS[0m] BUKTI-MERAH: pengukur residu MEMERAH saat 1 dokumen sengaja nyangkut |
| 137 | `backend/test_core_po_board_poc.py` | direct | 1 | ? | 10.2 |   [PASS] gate `INV-STAGE-01 --self-test (bukti-merah)` HIJAU  [2mexit 0 · luar urutan lini → MERAH |
| 138 | `backend/test_core_rantai_retur_poc.py` | direct | 1 | ? | 2.9 |   ❌ [FAIL] Pesanan tidak sampai status yang bisa diretur (status waiting_approval) |
| 139 | `backend/test_core_role_access_poc.py` | direct | 1 | ? | 4.8 |   [[91mFAIL[0m] finance     GET /approvals/backlog 200 [91m→ 403[0m |
| 140 | `backend/test_core_role_reality_poc.py` | direct | 0 | 48/48 | 3.0 | [96m[1mLANGKAH 6 — BUKTI-MERAH: sabotase matriks izin harus mengubah usulan (R10)[0m |
| 141 | `backend/test_core_sampling_poc.py` | direct | 1 | ? | 1.2 |   [FAIL] permintaan dua jenis dibuat |
| 142 | `backend/test_core_sesi_2026_06_poc.py` | direct | 1 | ? | 3.8 |   [[91mFAIL[0m] sesudah dibersihkan: buku kembali seperti sebelum POC (nol residu nilai) [91mΔ3,219,000[0m |
| 143 | `backend/test_core_sesi_2026_06b_poc.py` | direct | 1 | ? | 1.3 |   [[91mFAIL[0m] keadaan awal: roll bernilai Rp 900.000 ada di gudang penjual TANPA jurnal [91mΔ-860,000[0m |
| 144 | `backend/test_core_sesi_2026_06c_poc.py` | direct | 1 | ? | 1.8 | Traceback (most recent call last): |
| 145 | `backend/test_core_tahapan_poc.py` | direct | 0 | 57/57 | 3.8 |   [PASS] gate INV-DOMAIN-06 MEMERAH — kelalaian terlihat di tempat yang benar |
| 146 | `backend/test_f0c_scoping_leak_poc.py` | direct | 0 | ? | 1.7 |   POC F0-C — BUKTI-MERAH ISOLASI LINTAS-ENTITAS (5 temuan gate) |
| 147 | `backend/test_f3_aftersales_smoke.py` | direct | 1 | ? | 1.0 | Traceback (most recent call last): |
| 148 | `backend/test_f3_smoke.py` | direct | 1 | ? | 1.3 | Traceback (most recent call last): |
| 149 | `backend/test_fase_a_poc.py` | direct | 0 | 53/53 | 4.1 |   HASIL: 53 PASS · 0 FAIL |
| 150 | `backend/test_fase_b_uom_poc.py` | direct | 0 | 49/49 | 6.7 |   HASIL: 49 PASS · 0 FAIL |
| 151 | `backend/test_fase_c_lot_poc.py` | direct | 1 | ? | 2.6 |   ❌ [FAIL] Migrasi masih menemukan pekerjaan: {'dry_run': True, 'rolls_without_lot': 0, 'lots_created': 0, 'rolls_linked': 0, 'movements_linked': 1, 'movements_orphan_roll': 27, 'orphan_products': [], 'changed': 1, 'sett |
| 152 | `backend/test_fase_d_makloon_poc.py` | direct | 0 | ? | 3.9 |   [92mPASS 69[0m  \|  [91mFAIL 0[0m |
| 153 | `backend/test_fase_e_contracts_poc.py` | direct | 0 | ? | 4.5 |   [92mPASS 69[0m  \|  [91mFAIL 0[0m |
| 154 | `backend/test_fase_f1_receiving_uom_poc.py` | direct | 0 | ? | 2.8 |   [92mPASS 47[0m  \|  [91mFAIL 0[0m |
| 155 | `backend/test_fase_f_rnd_poc.py` | direct | 1 | ? | 13.2 | TEST 13 — BUKTI-MERAH: invarian INV-RND benar-benar MEMERAH saat dilanggar |
| 156 | `backend/test_fase_f_us3_us11_us12_poc.py` | direct | 1 | ? | 1.6 |   [FAIL] SEMUA tipe mutasi pada data punya label Indonesia di peta UI — tanpa label: ['hold', 'hold_release', 'wip_complete', 'wip_start'] |
| 157 | `backend/test_forms_poc.py` | direct | 0 | 32/32 | 1.0 | HASIL: 32 PASS · 0 FAIL |
| 158 | `backend/test_g0_config_api_test.py` | direct | 1 | ? | 0.4 | ❌ Failed - Expected 200, got 404 |
| 159 | `backend/test_g0_config_poc.py` | direct | 1 | ? | 11.5 |   PASS 114 / FAIL 1  (total 115) |
| 160 | `backend/test_g1_amendment_poc.py` | direct | 1 | ? | 1.6 |  |
| 161 | `backend/test_g2_payment_poc.py` | direct | 1 | ? | 1.4 |  |
| 162 | `backend/test_g3_variance_poc.py` | direct | 1 | ? | 1.6 |  |
| 163 | `backend/test_g4_refs_poc.py` | direct | 1 | ? | 11.5 | TEST 8 — BUKTI-MERAH: invarian INV-REF benar-benar bisa MEMERAH |
| 164 | `backend/test_g7_contrabon_poc.py` | direct | 1 | ? | 11.7 | [96m[1m── 14 · INVARIAN INV-CB-01..04 + BUKTI-MERAH (US11) ──[0m |
| 165 | `backend/test_g8_bank_poc.py` | direct | 1 | ? | 14.8 |   [[92mPASS[0m] BUKTI-MERAH (KN-G8-FORMAT-DUP): admin 2 PT melihat tiap template bawaan SEKALI — dulu preset dipasang per-entitas sehingga muncul dobel tanpa pembeda  (7 bawaan · nama ganda: tidak ada) |
| 166 | `backend/test_g9_case_poc.py` | direct | 1 | ? | 13.9 |   [[92mPASS[0m] BUKTI-MERAH (idempoten): pemindai dijalankan 2x TIDAK menggandakan kasus  (3 → 4 → 4 · dilewati 2) |
| 167 | `backend/test_makloon_core_poc.py` | direct | 0 | 19/19 | 0.9 | === HASIL POC: 19 PASS / 0 FAIL === |
| 168 | `backend/test_makloon_order_api.py` | direct | 0 | 36/37 | 1.9 |   [[91mFAIL[0m] sales GET /makloon-orders → 403 |
| 169 | `backend/test_ps21_poc.py` | direct | 1 | 40/43 | 3.5 | ❌ US-4b Goods Receipt diselesaikan (peristiwa nyata: scan → complete)  ·  scan HTTP 200 · complete HTTP 400 · {"detail":"Roll ?: tak bisa menurunkan panjang dari berat — isi gramasi & lebar (atau kg_per_meter)  |
| 170 | `backend/test_rfid_comprehensive.py` | direct | 1 | ? | 2.7 | ❌ FAILED - Login Admin (Expected 200, got 404) |
| 171 | `backend/test_roll_ssot.py` | direct | 1 | ? | 0.6 |   ❌ [FAIL] Login failed: 404 404 page not found |
| 172 | `backend/test_sales_returns_r1.py` | direct | 1 | ? | 0.4 | ❌ FAIL: Auth - Login |
| 173 | `backend/test_store_credit.py` | direct | 1 | ? | 0.4 | ❌ FAIL: Auth - Login |
| 174 | `backend/test_store_credit_comprehensive.py` | direct | 1 | ? | 0.3 | ❌ FAIL: Auth - Login |
| 175 | `backend/fase3_purchasing_test.py` | direct | 1 | 0/3 | 0.6 | ❌ Failed - Expected 200, got 404 |
| 176 | `backend/hr_analytics_test.py` | direct | 1 | 0/5 | 0.3 |   ❌ [FAIL] Login admin@kainnusantara.id failed: 404 404 page not found |
| 177 | `backend/r0_return_policy_test.py` | direct | 1 | ? | 0.3 | ❌ FAIL: API Health Check |
| 178 | `tests/agent_e7_fe_iteration_219.py` | direct | 1 | ? | 0.8 | Traceback (most recent call last): |
| 179 | `tests/backend_g9_test.py` | direct | 1 | ? | 0.7 | ❌ Failed to login as admin |
| 180 | `tests/backend_test_catch_weight.py` | direct | 1 | ? | 0.2 | ❌ Login |
| 181 | `tests/backend_test_f2_f3_sales_team_delivery.py` | direct | 1 | ? | 0.4 | ❌ FAIL: Login failed: 404 - 404 page not found |
| 182 | `tests/backend_test_p2_bugfixes.py` | direct | 1 | ? | 0.5 |   [91m[FAIL][0m Login — Status 404 |
| 183 | `tests/backend_test_security.py` | direct | 1 | ? | 0.6 | ❌ CRITICAL: Admin login failed. Cannot proceed with tests. |
| 184 | `tests/backend_test_special_orders.py` | direct | 1 | 0/17 | 2.0 | ❌ FAILED: Authentication for all roles - Login failed: 404 - 404 page not found |
| 185 | `tests/fase5_poc.py` | direct | 0 | 15/15 | 0.8 |  |
| 186 | `tests/t1_verifikasi_A2.py` | direct | 0 | ? | 0.9 | HASIL A2: [92m7 PASS[0m · [91m0 FAIL[0m |
| 187 | `tests/test_allocation_policy_17.py` | direct | 0 | 19/19 | 0.4 |  |
| 188 | `tests/test_pegging_17.py` | direct | 0 | 11/11 | 1.3 |  |
| 189 | `tests/test_shipment_18.py` | direct | 1 | ? | 0.4 | FAIL - SO approved :: None |
| 190 | `tests/test_tax_invoice_19.py` | direct | 1 | 0/1 | 0.4 | FAIL - buat SO PKP (ent_ksc) terkonfirmasi :: waiting_approval |
| 191 | `forensic/fa_ar_ap.py` | direct | 0 | ? | 0.7 |     ❌ [AR-RECON] ent_ksc AR GL 10304550.0 != subledger 0.0 |
| 192 | `forensic/fa_costing.py` | direct | 0 | ? | 0.7 |  |
| 193 | `forensic/fa_coverage_gap.py` | direct | 0 | ? | 0.7 |  |
| 194 | `forensic/fa_dark_sweep.py` | direct | 0 | ? | 1.2 |  |
| 195 | `forensic/fa_e2e.py` | direct | 0 | ? | 0.7 |  |
| 196 | `forensic/fa_edge_branches.py` | direct | 0 | ? | 0.9 |      negative-debit: rejected OK (ValueError: Nilai debit/kredit tidak boleh negatif.) |
| 197 | `forensic/fa_error_branch_500.py` | direct | 0 | ? | 2.0 |  |
| 198 | `forensic/fa_fuzz.py` | direct | 0 | ? | 0.4 |  |
| 199 | `forensic/fa_idor.py` | direct | 0 | ? | 1.0 |  |
| 200 | `forensic/fa_idor_confirm.py` | direct | 0 | ? | 1.7 |  |
| 201 | `forensic/fa_idor_matrix.py` | direct | 0 | ? | 2.2 |  |
| 202 | `forensic/fa_import_fuzz.py` | direct | 0 | ? | 1.2 |  |
| 203 | `forensic/fa_landed_cost_value.py` | direct | 0 | ? | 1.5 |  |
| 204 | `forensic/fa_mutation.py` | direct | 0 | ? | 10.2 |  |
| 205 | `forensic/fa_nplus1.py` | direct | 0 | ? | 1.8 |  |
| 206 | `forensic/fa_race.py` | direct | 0 | ? | 1.3 |  |
| 207 | `forensic/fa_runtime.py` | direct | 0 | ? | 1.2 |  |
| 208 | `forensic/fa_s074_errorpath.py` | direct | 0 | ? | 3.5 |   POST   /api/outbound/loading-check/{session_id}/complete  (complete_loading_check @ outbound_picking.py) wrapped=False  :: Internal Server Error |
| 209 | `forensic/fa_s074_semantic.py` | direct | 0 | ? | 3.0 |   [92mPASS 238[0m  \|  [91mFAIL 10[0m  \|  [93mWARN 2[0m |
| 210 | `forensic/fa_s075_verify.py` | direct | 0 | 22/27 | 1.2 |   [FAIL] credit_note_id terisi  :: None |
| 211 | `forensic/fa_session.py` | direct | 0 | ? | 1.2 |  |
| 212 | `forensic/fa_static.py` | direct | 0 | ? | 0.6 |  |
| 213 | `forensic/fa_sweep.py` | direct | 0 | ? | 2.2 |  |
| 214 | `forensic/fa_write_idor.py` | direct | 0 | ? | 1.4 |  |
| 215 | `scripts/poc_document_platform.py` | direct | 0 | ? | 0.6 |   HASIL: PASS 17 \| FAIL 0 |
| 216 | `scripts/poc_hrd.py` | direct | 1 | 20/21 | 0.9 |   [FAIL] WS handshake lewat ingress  -> GAGAL: ConnectionClosedOK: received 1000 (OK); then sent 1000 (OK) -> FALLBACK POLLING |
| 217 | `scripts/poc_hrd_h1.py` | direct | 1 | 17/18 | 0.7 |   [FAIL] Clock-out → work_min>0  -> work_min=0 |
| 218 | `scripts/poc_sales_revamp.py` | direct | 1 | 27/30 | 0.6 | RESULT: 27 PASS / 3 FAIL |
| 219 | `scripts/health_check.py` | direct | 0 | ? | 2.2 |   [92mPASS[0m 24  \|  [93mWARN[0m 0  \|  [91mFAIL[0m 0 |
| 220 | `scripts/audit_endpoint_sweep.py` | direct | 0 | ? | 4.2 |  |
