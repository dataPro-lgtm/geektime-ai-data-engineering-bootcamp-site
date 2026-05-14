# Catalog Runtime Plan v1

> 用途：把 Week04 本地运行时的 catalog、warehouse、table location、devbox CLI 和限制写清楚。

## 1. Runtime 组件

| 组件 | 当前选择 | 作用 | 验证方式 |
|---|---|---|---|
| Catalog | PostgreSQL-backed SQL catalog | 管理 namespace、table、metadata pointer | `python -m pipelines.lakehouse.catalog --smoke` |
| Warehouse | MinIO bucket / object storage | 保存 metadata 和 Parquet data files | `inspect_metadata --view files` |
| Client | PyIceberg in devbox | 操作 catalog、table 和 metadata | `settings --check` |
| Orchestrator | Dagster thin wrapper / optional | 后续编排入口 | 不作为 Week04 主验收路径 |

## 2. 必要命令

```bash
docker compose --profile tools --env-file infra/env/.env.local -f infra/docker-compose.yml run --rm devbox \
  python -m pipelines.lakehouse.settings --check
```

```bash
docker compose --profile tools --env-file infra/env/.env.local -f infra/docker-compose.yml run --rm devbox \
  python -m pipelines.lakehouse.catalog --smoke
```

## 3. 边界声明

- 不引入 Spark、Trino、Hive、Nessie、REST catalog。
- 不把 catalog、warehouse 和 table location 混成一个概念。
- 不用 UI 截图替代 CLI / report 证据。
- 不把 Dagster wrapper 当作 PyIceberg 实现已经完成的证据。
