# Week06 Partition / Backfill Strategy v1

## 1. Default Partition

Default Student Core partition:

```text
daily partition
```

Example:

```text
partition_key = 2026-04-21
```

## 2. Why Daily First

- Easy to explain.
- Easy to backfill.
- Easy to map to reports and business dates.
- Stable enough before dynamic / multi partitions.

## 3. Partition Fields

| Field | Meaning |
|---|---|
| `partition_key` | Date or window being materialized |
| `batch_id` | Batch execution identifier |
| `manifest_id` | Input declaration identifier |
| `source_fingerprint` | Source content identity |
| `data_release_id` | Release boundary for downstream consumption |

## 4. Recovery Action Matrix

| Action | Use when | Must record |
|---|---|---|
| retry | transient execution failure | run_id, error, retry count |
| rerun | same job definition, same semantic input | idempotency evidence |
| replay | same batch / source needs replay | manifest_id, batch_id |
| backfill | historical partition gap | partition_key, reason code |
| restore | current state is not trusted | source/output snapshot |

## 5. Dry-run Backfill Record

```json
{
  "partition_key": "2026-04-21",
  "mode": "backfill",
  "dry_run": true,
  "reason_codes": ["missing_partition_report"],
  "target_assets": [
    "week06/ingestion/raw_ticket_events_partitioned",
    "week06/silver/ticket_fact_partitioned"
  ]
}
```

## 6. Guardrails

- Do not default to full rerun.
- Do not delete production tables for demos.
- Do not backfill without checks.
- Do not unblock downstream without run evidence.

