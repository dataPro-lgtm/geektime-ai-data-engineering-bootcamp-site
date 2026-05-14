# Source to Iceberg Mapping v1

> 用途：把 Week03 的 ingest baseline、PostgreSQL / MinIO 输入和 Week04 Iceberg 表之间的映射写清楚。

## 1. 输入来源

| Source | Week03 证据 | 输入形态 | Owner | 当前状态 |
|---|---|---|---|---|
| ticket ingest |  | PostgreSQL / baseline report |  | draft / ready |
| document ingest |  | MinIO / raw files |  | draft / ready |

## 2. 表映射

| Source | Bronze table | Silver table | 主键 / 业务键 | 说明 |
|---|---|---|---|---|
| ticket ingest | `bronze.raw_ticket_event` | `silver.ticket_fact` |  |  |
| document ingest | `bronze.raw_doc_asset` | `silver.knowledge_doc` |  |  |

## 3. 字段处理原则

- Bronze 保留原始输入含义，不急于做复杂业务口径。
- Silver 只承载本周必要的稳定消费字段。
- 不补造 Week05 transform、Week07 parse 或 Week08 retrieval 字段。
- sparse document 字段允许存在，但必须写清为什么现在为空。

## 4. 验收证据

| 证据 | 路径 | 结论 |
|---|---|---|
| materialization report | `reports/week04/materialization_report.json` |  |
| table snapshots | `python -m pipelines.lakehouse.inspect_metadata --table <table> --view snapshots` |  |
| table files | `python -m pipelines.lakehouse.inspect_metadata --table <table> --view files` |  |
