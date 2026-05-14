# Evidence Anchor Contract v1

## Purpose

Evidence anchors are the only allowed source for Week8 citations. LLMs may consume anchors, but must not invent citations.

## Required Fields

| Field | Required |
|---|---|
| `evidence_anchor_id` | yes |
| `chunk_id` | yes |
| `anchor_type` | yes |
| `doc_id` | yes |
| `source_uri` | yes |
| `raw_object_uri` | yes |
| `parsed_object_uri` | preferred |
| `doc_version` | yes |
| `source_fingerprint` | yes |
| `page_no` | PDF yes |
| `bbox` | preferred |
| `bbox_missing_reason` | required when bbox is null for paged docs |
| `section_path` | yes |
| `license_tag` | yes |
| `quality_flags` | yes |

## Stable ID

```text
evidence_anchor_id = sha256(
  chunk_id
  + anchor_type
  + source_fingerprint
  + doc_version
  + page_no
  + bbox
  + section_path
)[:32]
```
