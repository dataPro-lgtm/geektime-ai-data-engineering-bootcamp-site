# Partition / Backfill Strategy v1｜分区与补数策略

> 用途：说明哪些历史范围可以补、怎么补、补完如何对账，避免把 backfill 变成全量重跑。

## 1. 分区策略

| Asset | Partition Key | Partition Granularity | Why |
|---|---|---|---|
|  |  | daily / hourly / custom |  |
|  |  | daily / hourly / custom |  |

## 2. Backfill 触发场景

| 场景 | 判断信号 | Backfill 范围 |
|---|---|---|
| 历史缺口 |  |  |
| 迟到数据 |  |  |
| 口径修复 |  |  |
| 上游补发 |  |  |

## 3. 执行计划

- backfill command：
- target partitions：
- expected input count：
- expected output count：
- dry-run result：
- approval：

## 4. 对账规则

| 检查 | 规则 | 证据 |
|---|---|---|
| 输入数量 |  |  |
| 输出数量 |  |  |
| 重复保护 |  |  |
| 下游影响 |  |  |

## 5. 最小通过标准

- [ ] backfill 范围明确，不是直接全量重跑
- [ ] partition key 与业务恢复边界一致
- [ ] 补数前后都有 record count 证据
- [ ] 影响下游对象已列出
- [ ] 结果写入 runbook 或 recovery report
