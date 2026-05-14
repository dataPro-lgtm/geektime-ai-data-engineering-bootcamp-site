# Ingestion Runbook v1｜采集恢复 Runbook

> 用途：把 Week03 的恢复动作整理成团队能照着执行的操作手册。

## 1. 适用范围

- 适用系统：
- 适用数据源：
- 适用任务：
- 不适用场景：
- Owner：

## 2. 快速判断

| 问题 | 判断方式 | 下一步 |
|---|---|---|
| manifest 可读吗 |  |  |
| contract gate 通过吗 |  |  |
| checkpoint 可信吗 |  |  |
| source 是否缺口 |  |  |
| sink 是否重复写入 |  |  |

## 3. 常用命令

```bash
# dry-run
python -m pipelines.ingestion.seed_loader --manifest data/seed_manifests/example.json --dry-run

# contract tests
pytest tests/contract -v

# inspect checkpoint
python -m pipelines.ingestion.inspect_state --job ticket_ingest
```

## 4. 恢复动作

| 动作 | 执行前检查 | 执行命令 | 执行后检查 |
|---|---|---|---|
| retry |  |  |  |
| rerun |  |  |  |
| replay |  |  |  |
| restore |  |  |  |
| backfill |  |  |  |

## 5. 升级条件

- 数据状态不可信：
- PII / 权限风险：
- 下游已消费错误数据：
- 重复失败超过阈值：
- 需要业务确认：

## 6. 结束条件

- [ ] 恢复动作完成
- [ ] record count 对账通过
- [ ] checkpoint 更新合理
- [ ] 下游影响已记录
- [ ] recovery report 已写入
