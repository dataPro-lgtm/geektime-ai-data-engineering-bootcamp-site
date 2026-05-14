# Bronze / Silver Table Design v1

> 用途：定义 Week04 最小 Iceberg 表设计，重点不是建很多表，而是让每张表有状态、能回看、能交接。

## 1. 表清单

| Layer | Table | Source | 消费方 | 当前状态 |
|---|---|---|---|---|
| Bronze | `bronze.raw_ticket_event` | ticket ingest | Week05 / Week06 | draft / ready |
| Silver | `silver.ticket_fact` | `bronze.raw_ticket_event` | Week05 semantic layer | draft / ready |
| Bronze | `bronze.raw_doc_asset` | document ingest | Week07 / Week08 | draft / ready |
| Silver | `silver.knowledge_doc` | `bronze.raw_doc_asset` | Week08 retrieval | draft / ready |

## 2. 字段设计

| Table | 必要字段 | 暂缓字段 | 暂缓原因 |
|---|---|---|---|
| `bronze.raw_ticket_event` |  |  |  |
| `silver.ticket_fact` |  |  |  |
| `bronze.raw_doc_asset` |  |  |  |
| `silver.knowledge_doc` |  |  |  |

## 3. 状态边界

- 每次 materialize 必须能定位到 snapshot。
- 每张表必须能解释 files、history 和 schema。
- Silver 不应隐藏 Bronze 的关键 lineage。
- 不用“能 select 出数据”替代表状态验收。

## 4. 验收

- [ ] 每张表有明确 source。
- [ ] 每张表有 owner / consumer。
- [ ] 每张表能被 `inspect_metadata` 观察。
- [ ] 表设计没有提前偷做 Week05 / Week07 / Week08 的职责。
