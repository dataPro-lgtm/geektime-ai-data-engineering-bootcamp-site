# Week06 Data Factory Runbook v1

## 1. Scope

This runbook guides Week06 data factory operation:

- observe source state
- materialize core assets
- backfill or replay failed partitions
- run checks
- write evidence
- decide downstream status

## 2. Required Services

- PostgreSQL:
- MinIO:
- Dagster:
- devbox:

## 3. Environment Variables

| Variable | Required | Notes |
|---|---|---|
| `DATABASE_URL` | yes | |
| `MINIO_ENDPOINT` | yes | |
| `WEEK6_REPORT_DIR` | yes | |
| `WEEK6_PARTITION_START_DATE` | yes | |
| `RELEASE_ID` | optional | |
| `TRACE_ID` | optional | |
| `LAKEHOUSE_ENABLED` | optional | |
| `ANALYTICS_ENABLED` | optional | |

## 4. Load Definitions

```bash
python - <<'PY'
from dagster import Definitions
from pipelines.definitions import defs
Definitions.validate_loadable(defs)
print("definitions loadable")
PY
```

## 5. Materialize Core Partition

Partition key:

```text
YYYY-MM-DD
```

Target assets:

- `week06/factory/manifest_gate`
- `week06/ingestion/raw_ticket_events_partitioned`
- `week06/silver/ticket_fact_partitioned`
- `week06/ops/run_evidence_report`

## 6. Recovery Decision

| Question | If yes | If no |
|---|---|---|
| Is current state trusted? | inspect failed partition | restore first |
| Is failure transient? | retry / rerun | inspect input semantics |
| Same batch/source? | replay | choose backfill or stop |
| Historical gap? | backfill | write runbook note |

## 7. Checks

- [ ] manifest consistency
- [ ] row count
- [ ] duplicate / idempotency
- [ ] required field null rate
- [ ] partition completeness

## 8. Evidence

Evidence path:

```text
reports/week06/run_evidence/
```

Summary path:

```text
reports/week06/week06_delivery_summary.md
```

## 9. Downstream Decision

| Result | Action |
|---|---|
| all required checks passed | unblock downstream |
| warning only | continue with note |
| required check failed | block and backfill |
| optional dependency skipped | document reason; do not fake passed |

