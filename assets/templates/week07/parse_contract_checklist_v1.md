# Parse Contract Checklist v1

## Required Fields

| Field | Required | Notes |
|---|---|---|
| `source_fingerprint` | yes | Recomputed from actual raw bytes |
| `doc_version` | yes | Used for replay and citation |
| `page_no` | PDF yes | Can be null for HTML / Markdown |
| `bbox` | PDF preferred | If missing, provide `bbox_missing_reason` |
| `section_path` | yes | Heading hierarchy or equivalent |
| `license_tag` | yes | Used by Week8 filters |
| `content_type` | yes | Drives quality gate |
| `parse_strategy_version` | yes | Example: `docling_v1_no_ocr` |
| `chunk_strategy_version` | yes | Example: `section_aware_v1` |
| `quality_flags` | yes | Empty list if clean |
| `pii_flag` | yes | heuristic only in Week7 |

## Hard Checks

- Raw bytes fingerprint matches `raw_doc_asset.source_fingerprint`.
- Every section has `section_id`, `doc_id`, `content_type`, `parse_strategy_version`.
- Every chunk has `chunk_id`, `section_id`, `chunk_strategy_version`.
- Every chunk has at least one evidence anchor.
