# Incremental Ingest Strategy v1｜增量采集策略

> 用途：写清 cursor、watermark、checkpoint、late arrival 和去重边界，避免轻易承诺 exactly-once。

## 1. 增量来源

- source system：
- change signal：
- cursor type：timestamp / id / LSN / offset / custom
- ordering guarantee：
- known limitations：

## 2. 状态对象

| 状态 | 字段 | 说明 |
|---|---|---|
| cursor |  | 下一次从哪里继续读 |
| watermark |  | 当前批次承认到哪里 |
| checkpoint |  | 持久化恢复点 |
| dedupe key |  | 输入层判断是否同一业务事件 |
| idempotency key |  | 写入层保护 side effect |

## 3. 乱序、迟到与重复

| 场景 | 判断方式 | 处理动作 |
|---|---|---|
| late arrival |  | accept / quarantine / backfill |
| out-of-order |  | buffer / reorder / warn |
| duplicate event |  | dedupe / skip |
| source gap |  | alert / replay / backfill |

## 4. 不承诺什么

- 不承诺 exactly-once，除非 source、state store、sink 三端都能证明。
- 不把 retry 说成 replay。
- 不把当前状态当成历史真相。

## 5. 最小通过标准

- [ ] cursor 和 watermark 各自含义清楚
- [ ] checkpoint 可以恢复
- [ ] dedupe key 与 idempotency key 不混用
- [ ] late arrival 有处理策略
- [ ] 失败后知道该 retry、replay 还是 backfill
