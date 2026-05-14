# Week07 Execution Blueprint v1

## 1. Scope

- Week title: Week 7：非结构化数据工程
- Goal: raw document -> parsed sections -> document chunks -> evidence anchors -> quality report -> Week8 ready gate
- Student Core: Docling-first, no OCR by default, no embedding, no RAG API

## 2. Inputs

| Input | Source | Required |
|---|---|---|
| raw_doc_asset | PostgreSQL / manifest report | yes |
| raw_object_uri | `s3://omni-raw-documents/...` | yes |
| source_fingerprint | Week3 ingest output | yes |
| doc_version | manifest / metadata | yes |
| license_tag | manifest / metadata | yes |

## 3. Outputs

| Output | Path |
|---|---|
| Parsed document JSON | `artifacts/week07/parsed_doc.json` |
| Sections | `artifacts/week07/sections.json` |
| Chunks | `artifacts/week07/chunks.json` |
| Evidence anchors | `artifacts/week07/evidence_anchors.json` |
| Quality report | `reports/week07/chunk_quality_report.md` |
| Week8 gate | `reports/week07/week8_ready_gate.json` |

## 4. Do Not Do

- Do not generate embeddings.
- Do not write pgvector.
- Do not implement hybrid retrieval, reranker, or RAG API.
- Do not require Azure DI, OCR, ASR, video, VLM caption, or FFmpeg in Student Core.

## 5. Acceptance

- Every chunk has a stable `chunk_id`.
- Every chunk has at least one evidence anchor.
- PDF chunks have `page_no`; missing bbox has `bbox_missing_reason`.
- Quality report explains hard failures, warnings, and sample shortfall.
- Week8 gate explains consumption rule.
