# Week07 Document Asset Boundary v1

## 1. Scope

- Source family:
- Raw document location:
- Data release id:
- Owner:
- Consumer:

## 2. What This Asset Is

| Object | Included | Notes |
|---|---|---|
| Raw document bytes | yes / no |  |
| Parsed document | yes / no |  |
| Knowledge sections | yes / no |  |
| Document chunks | yes / no |  |
| Evidence anchors | yes / no |  |
| Quality gate | yes / no |  |

## 3. Non-goals

- No embedding build in Week07.
- No pgvector or hybrid retrieval in Week07.
- No RAG API contract implementation in Week07.
- No LLM-generated citations.

## 4. Required Metadata

| Field | Required | Missing reason allowed | Owner |
|---|---|---|---|
| source_fingerprint | yes | no |  |
| doc_version | yes | no |  |
| section_path | yes | yes |  |
| page_no | PDF: yes | content-type dependent |  |
| bbox | PDF: preferred | yes |  |
| bbox_missing_reason | conditional | yes |  |
| parse_strategy_version | yes | no |  |
| chunk_strategy_version | yes | no |  |

## 5. Week8 Handoff Rule

Only chunks with `allowed_for_indexing=true`, valid evidence anchors, required source metadata, and no quarantine flags may be consumed by Week08.
