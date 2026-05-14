# Week06 Run Evidence Schema Notes v1

## 1. Required Fields

| Field | Notes |
|---|---|
| `evidence_schema_version` | Example: `week06.v1` |
| `run_id` | Stable run identifier |
| `asset_key` | Asset being reported |
| `partition_key` | Partition boundary |
| `status` | `passed`, `failed`, `skipped`, or `warning` |
| `started_at` | ISO timestamp |
| `finished_at` | ISO timestamp |
| `report_path` | Path to evidence file |
| `reason_codes` | Machine-readable decision reasons |

## 2. Optional Fields

| Field | Why optional |
|---|---|
| `source_snapshot_id` | Week04 may be unavailable |
| `output_snapshot_id` | Week04 may be unavailable |
| `dbt_invocation_id` | Week05 may be unavailable |
| `semantic_metric_count` | Semantic mart may be skipped |
| `lineage_snapshot_path` | Full lineage reserved for later weeks |
| `eval_run_id` | Week11+ field |

## 3. Status Rules

| Status | Meaning |
|---|---|
| `passed` | Required checks passed |
| `warning` | Non-critical issue; downstream can continue with note |
| `failed` | Downstream must not consume |
| `skipped` | Optional dependency not enabled or not available |

## 4. Example Skipped Optional Dependency

```json
{
  "status": "skipped",
  "reason_codes": ["week5_analytics_not_enabled"],
  "dbt_invocation_id": null,
  "semantic_metric_count": null
}
```

