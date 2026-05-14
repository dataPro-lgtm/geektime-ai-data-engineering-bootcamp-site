# ADR: Week07 Parser Adapter Route v1

## Status

Proposed / Accepted / Superseded

## Context

Week07 needs a parser route that preserves layout, hierarchy, tables, page, bbox and provenance while staying runnable in the Student Core environment.

## Decision

Use Docling-first as the default parser route. Allow Unstructured as optional fallback. Keep OCR / ASR / VLM routes disabled by default unless the runbook explicitly enables them.

## Decision Drivers

| Driver | Decision impact |
|---|---|
| Local reproducibility | Prefer local parser path |
| Provenance fidelity | Require page / bbox / span where available |
| Contractability | Normalize output into section / chunk / anchor schemas |
| Cost / credentials | Do not make cloud OCR a hard dependency |

## Fallback Rules

| Fallback | When allowed | Required warning |
|---|---|---|
| Unstructured | Docling cannot parse supported document | `fallback_parser_used` |
| Source directory | MinIO raw object unavailable | `raw_object_fallback_used` |
| OCR disabled | Scanned PDF detected | `ocr_disabled_in_student_core` |

## Consequences

- Parser capability report is mandatory.
- Fallback output must not be treated as equivalent to Docling-first output.
- Week8 gate must see parser warnings.
