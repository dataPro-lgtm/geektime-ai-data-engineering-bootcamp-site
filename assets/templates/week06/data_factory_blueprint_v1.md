# Week06 Data Factory Blueprint v1

## 1. Scope

- This blueprint upgrades existing Week03-Week05 scripts, tables, and metrics into an operable asset factory.
- It does not rewrite ingest, lakehouse, analytics, parse, RAG, tools, or governance logic.

## 2. Core Statement

Week06 turns scripts, tables, and marts into assets that can be materialized, partitioned, checked, backfilled, traced, and handed off.

## 3. Asset Factory Boundary

| Area | In scope | Out of scope |
|---|---|---|
| Ingest | Thin wrappers around existing scripts | Rewriting Week03 ingest logic |
| Lakehouse | Optional / external observation | Rebuilding Week04 Iceberg |
| Analytics | Optional / external mart status | Rebuilding Week05 dbt |
| Orchestration | Dagster OSS assets/jobs/checks | Dagster+ required features |
| Evidence | Run evidence JSON/Markdown | Full OpenLineage platform |

## 4. Minimal Asset Graph

```text
source seed manifests
  -> week06/factory/manifest_gate
  -> week06/ingestion/raw_ticket_events_partitioned
  -> week06/silver/ticket_fact_partitioned
  -> week06/ops/run_evidence_report
```

Optional nodes:

- `week06/external/lakehouse_baseline`
- `week06/external/support_kpi_mart`
- `week06/future/parse_normalize_ready_gate`

## 5. Required Decisions

- Asset key namespace:
- Default partition strategy:
- Source observation strategy:
- Core materialization job:
- Optional dependency status rule:
- Run evidence report path:

## 6. Acceptance Criteria

- [ ] `Definitions` can load.
- [ ] Core materializable assets do not mix observable source assets in the same job.
- [ ] Daily partition strategy is documented.
- [ ] At least 5 checks are defined.
- [ ] Run evidence schema distinguishes required and optional fields.
- [ ] Week04/Week05 optional dependencies can be skipped without fake passed status.

