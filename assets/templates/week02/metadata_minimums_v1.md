# Metadata Minimums v1｜最小 Metadata 模板

> 用途：定义进入系统的输入资产至少要带哪些上下文，避免后续检索、引用、权限和追溯全靠猜。

## 1. 资产基本信息

| 字段 | 是否必填 | 示例 | 说明 |
|---|---|---|---|
| `asset_id` | 是 | `ticket_20260425_001` | 系统内稳定 ID |
| `source_system` | 是 | `helpdesk_db` | 来源系统 |
| `source_uri` | 是 | `s3://raw/tickets/...` | 原始资源位置 |
| `asset_type` | 是 | `ticket` / `document` / `audio` / `video` | 模态类型 |
| `owner` | 是 | `support_ops` | 业务 owner |
| `created_at` | 是 | `2026-04-25T10:00:00Z` | 源数据创建时间 |
| `ingested_at` | 是 | `2026-04-25T10:05:00Z` | 系统接入时间 |

## 2. 语义与业务上下文

| 字段 | 是否必填 | 示例 | 说明 |
|---|---|---|---|
| `business_domain` | 是 | `support` | 业务域 |
| `primary_entity` | 是 | `ticket` | 主要对象 |
| `language` | 否 | `zh-CN` | 文本或转写语言 |
| `topic` | 否 | `refund_policy` | 主题或分类 |
| `priority` | 否 | `P1` | 优先级 |

## 3. 权限、PII 与策略

| 字段 | 是否必填 | 示例 | 说明 |
|---|---|---|---|
| `pii_level` | 是 | `low` / `medium` / `high` | PII 分级 |
| `allowed_roles` | 是 | `support_agent, supervisor` | 可访问角色 |
| `blocked_actions` | 否 | `auto_execute` | 禁止动作 |
| `retention_policy` | 否 | `180d` | 保留周期 |

## 4. 质量与可追溯

| 字段 | 是否必填 | 示例 | 说明 |
|---|---|---|---|
| `schema_version` | 是 | `ticket_event_v1` | 对应 contract 版本 |
| `manifest_id` | 是 | `seed_manifest_20260425` | 本次接入声明 |
| `checksum` | 否 | `sha256:...` | 原始内容校验 |
| `quality_status` | 是 | `accepted` / `quarantine` / `rejected` | 准入结果 |
| `evidence_ref` | 否 | `reports/week02/gate_report.md` | 校验证据 |

## 5. 最小通过标准

- [ ] 每个 input asset 都能追到 source system 和 source URI
- [ ] 每个 input asset 都有 owner、PII level 和 allowed roles
- [ ] 每个 input asset 都绑定 schema / contract version
- [ ] 每个 input asset 都能说明 manifest 和 gate decision
- [ ] 下游检索、引用、工具调用不需要再猜这些上下文
