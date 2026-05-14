# Materialization Report Notes v1

> 用途：解释 `reports/week04/materialization_report.json`，让 materialization 不只是“命令跑完了”。

## 1. 运行信息

- 执行时间：
- 执行命令：
- Git commit：
- 环境：
- 输入基线：

## 2. 表级结果

| Table | Layer | Status | Row count | Snapshot | Files | 说明 |
|---|---|---|---:|---|---:|---|
| `bronze.raw_ticket_event` | Bronze |  |  |  |  |  |
| `silver.ticket_fact` | Silver |  |  |  |  |  |
| `bronze.raw_doc_asset` | Bronze |  |  |  |  |  |
| `silver.knowledge_doc` | Silver |  |  |  |  |  |

## 3. 需要解释的现象

| 现象 | 是否正常 | 原因 | 下一步 |
|---|---|---|---|
| sparse document fields | yes / no |  |  |
| row count mismatch | yes / no |  |  |
| file count 增长 | yes / no |  |  |

## 4. 最小结论

- 本次 materialization 是否可作为 Week04 baseline：
- 哪些表可以进入 Week05 / Week06：
- 哪些表只能作为观察对象：
- 遗留风险：
