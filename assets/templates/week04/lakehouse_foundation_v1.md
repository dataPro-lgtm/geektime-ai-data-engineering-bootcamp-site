# Lakehouse Foundation v1

> 用途：说明为什么 Week04 要从“能查表”升级到“有记忆、可回看、可演进、可验证”的表状态系统。

## 1. 本周目标

- 当前来源：
- 目标表格式：
- Catalog：
- Warehouse：
- 本周最小可验收闭环：
- 明确不覆盖范围：

## 2. 为什么需要表状态

| 问题 | 没有表状态时 | Iceberg 状态能力 |
|---|---|---|
| 回到旧版本 |  | snapshot / history / time travel |
| 解释数据来自哪里 |  | metadata log / manifest / files |
| 表结构变化 |  | schema evolution |
| 下游可复现 |  | stable snapshot + report |
| 性能退化定位 |  | files / snapshots / planning baseline |

## 3. 最小架构

```text
Week03 baseline
  -> PyIceberg materialization
  -> PostgreSQL SQL catalog
  -> MinIO warehouse
  -> Bronze / Silver Iceberg tables
  -> snapshots / history / files report
```

## 4. 验收标准

- [ ] Catalog smoke 可以通过。
- [ ] 至少一组 Bronze / Silver 表可以 materialize。
- [ ] 可以查看 snapshots / history / files。
- [ ] 可以生成 time travel demo report。
- [ ] 可以生成 schema evolution demo report。
- [ ] 可以生成 Iceberg baseline report。
