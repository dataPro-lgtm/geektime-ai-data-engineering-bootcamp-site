# Week04 Runbook v1

> 用途：把 Week04 Lakehouse / Iceberg baseline 的执行步骤写成团队可以复跑的操作入口。

## 1. 环境准备

```bash
cp infra/env/.env.example infra/env/.env.local
docker compose --env-file infra/env/.env.local -f infra/docker-compose.yml up -d --build postgres minio minio_init
```

## 2. Runtime 检查

```bash
docker compose --profile tools --env-file infra/env/.env.local -f infra/docker-compose.yml run --rm devbox \
  python -m pipelines.lakehouse.settings --check
```

```bash
docker compose --profile tools --env-file infra/env/.env.local -f infra/docker-compose.yml run --rm devbox \
  python -m pipelines.lakehouse.catalog --smoke
```

## 3. Materialize

```bash
docker compose --profile tools --env-file infra/env/.env.local -f infra/docker-compose.yml run --rm devbox \
  python -m pipelines.lakehouse.materialize --all-core --report-json reports/week04/materialization_report.json
```

## 4. Metadata / Demo / Baseline

| 任务 | 命令 | 输出 |
|---|---|---|
| snapshots | `python -m pipelines.lakehouse.inspect_metadata --table silver.ticket_fact --view snapshots` |  |
| time travel | `python -m pipelines.lakehouse.demo_time_travel --table silver.ticket_fact --out reports/week04/time_travel_demo_report.md` |  |
| schema evolution | `python -m pipelines.lakehouse.demo_schema_evolution --table bronze.raw_doc_asset --add-column source_checksum_algo --out reports/week04/schema_evolution_demo_report.md` |  |
| perf baseline | `python -m pipelines.lakehouse.perf_baseline --all-core --out reports/week04/iceberg_baseline_report.md` |  |

## 5. 交接结论

- 当前可复跑命令：
- 当前生成报告：
- 需要人工解释的风险：
- 下一周 consumer：
