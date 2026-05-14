# Week04 Course Site Sync Packet v1

> 用途：课程站点更新前，先核对真实项目仓库中已经存在的路径、命令和限制。

## 1. Real Repo Paths

| 类型 | 路径 | 是否存在 | 说明 |
|---|---|---|---|
| Runbook | `runbooks/week04/README.md` |  |  |
| Code | `pipelines/lakehouse/` |  |  |
| Settings | `pipelines/lakehouse/settings.py` |  |  |
| Catalog smoke | `pipelines/lakehouse/catalog.py` |  |  |
| Materialization | `pipelines/lakehouse/materialize.py` |  |  |
| Metadata inspect | `pipelines/lakehouse/inspect_metadata.py` |  |  |
| Time travel demo | `pipelines/lakehouse/demo_time_travel.py` |  |  |
| Schema evolution demo | `pipelines/lakehouse/demo_schema_evolution.py` |  |  |
| Baseline report | `pipelines/lakehouse/perf_baseline.py` |  |  |

## 2. Student Commands

只写已经在项目仓库真实可执行的命令。

```bash
docker compose --profile tools --env-file infra/env/.env.local -f infra/docker-compose.yml run --rm devbox \
  python -m pipelines.lakehouse.catalog --smoke
```

```bash
docker compose --profile tools --env-file infra/env/.env.local -f infra/docker-compose.yml run --rm devbox \
  python -m pipelines.lakehouse.materialize --all-core --report-json reports/week04/materialization_report.json
```

## 3. Known Limits

- Dagster 当前是 thin wrapper，不是 Week04 主验收路径。
- Week04 不引入 Spark、Trino、Hive、Nessie、REST catalog、dbt 或 RAG serving。
- sparse document fields 在 parse/normalize 周之前是可解释限制。
