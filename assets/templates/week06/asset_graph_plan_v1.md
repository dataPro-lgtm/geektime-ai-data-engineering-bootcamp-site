# Week06 Asset Graph Plan v1

## 1. Asset Key Namespace

Use one explicit namespace for all Week06-owned assets.

Recommended prefix:

```text
week06/
```

## 2. Core Materializable Assets

| Asset key | Purpose | Upstream | Partitioned | Owner |
|---|---|---|---|---|
| `week06/factory/manifest_gate` | Validate input declaration | source manifest | yes/no | |
| `week06/ingestion/raw_ticket_events_partitioned` | Thin wrapper around ticket ingest | manifest gate | yes | |
| `week06/silver/ticket_fact_partitioned` | Structured ticket fact state | raw ticket events | yes | |
| `week06/ops/run_evidence_report` | Write evidence report | all core assets | by run | |

## 3. Observable / External Assets

| Asset key | Type | Status rule |
|---|---|---|
| `source/seed_manifests` | observable source | observation job only |
| `week06/external/lakehouse_baseline` | external / optional | skipped if Week04 unavailable |
| `week06/external/support_kpi_mart` | external / optional | skipped if Week05 unavailable |

## 4. Jobs

| Job | Selection | Rule |
|---|---|---|
| `week6_observe_sources_job` | source observations only | never mix with core materialization |
| `week6_data_factory_core_job` | Week06 regular assets only | no observable source assets |

## 5. Graph Notes

- Do not duplicate existing `ingestion/raw_ticket_events` keys.
- Do not create two assets with the same semantic meaning and different dependencies.
- Keep the Student Core graph small enough to teach and debug.

