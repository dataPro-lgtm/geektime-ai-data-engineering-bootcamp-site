# Week06 Delivery Summary v1

## 1. Scope

- Covered assets:
- Covered partitions:
- Optional dependencies:
- Out-of-scope items:

## 2. Asset Graph Summary

| Asset | Type | Partitioned | Status | Notes |
|---|---|---|---|---|
| `week06/factory/manifest_gate` | materializable | | | |
| `week06/ingestion/raw_ticket_events_partitioned` | materializable | yes | | |
| `week06/silver/ticket_fact_partitioned` | materializable | yes | | |
| `week06/external/lakehouse_baseline` | optional | | | |
| `week06/external/support_kpi_mart` | optional | | | |
| `week06/ops/run_evidence_report` | materializable | | | |

## 3. Backfill / Replay Record

- Partition key:
- Mode:
- Reason codes:
- Dry-run report:
- Execution report:
- Downstream decision:

## 4. Asset Checks Summary

| Check | Asset | Partition | Result | Recommended action |
|---|---|---|---|---|
| manifest consistency | | | | |
| row count | | | | |
| duplicate / idempotency | | | | |
| required field null rate | | | | |
| partition completeness | | | | |

## 5. Run Evidence

- Evidence schema version:
- Evidence report path:
- Run id:
- Release id:
- Trace id:
- Git sha:

## 6. Known Limitations

- Week04 lakehouse status:
- Week05 analytics status:
- Dagster+ dependency:
- OpenLineage / governance:
- Week07 / Week08 future hooks:

## 7. Next Steps

- [ ] Stabilize runtime imports.
- [ ] Add broader asset checks.
- [ ] Connect Week07 parse assets.
- [ ] Prepare Week08 retrieval baseline.
- [ ] Preserve evidence for Week11 / Week14.

