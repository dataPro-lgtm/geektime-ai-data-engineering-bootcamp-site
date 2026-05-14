# Ingestion Baseline v1｜采集最小基线

> 用途：定义一条 ingest 链路最少需要具备哪些能力，才配成为后续 lakehouse、transform、RAG 和 Agent 工具的上游。

## 1. 链路目标

- 数据源：
- 输入对象：
- 目标落点：
- 消费方：
- 本次 baseline 覆盖范围：
- 明确不覆盖范围：

## 2. 最小能力清单

| 能力 | 当前设计 | 证据 |
|---|---|---|
| manifest 驱动输入 |  |  |
| contract gate |  |  |
| batch ingest |  |  |
| state / checkpoint |  |  |
| dedupe / idempotency |  |  |
| integrity check |  |  |
| run log / report |  |  |
| replay / backfill 入口 |  |  |

## 3. 验收边界

- [ ] 同一批输入可以重复执行
- [ ] 重复执行不会产生重复 side effect
- [ ] 失败后能定位到 checkpoint
- [ ] 缺口、迟到、重复有明确处理方式
- [ ] 结果能写入 smoke / delivery summary

## 4. 当前风险

| 风险 | 影响 | 处理计划 |
|---|---|---|
|  |  |  |
|  |  |  |
