# Parser Adapter Decision v1

## Decision

Use Docling-first for Student Core. Keep Unstructured as optional fallback. Keep Azure Document Intelligence, OCR, ASR, video, and VLM caption as Instructor Scale.

## Why Docling-first

- Supports document hierarchy.
- Preserves page / bbox / provenance when available.
- Fits local Docker + devbox teaching path.
- Can produce structured parsed document artifacts.

## Decision Table

| Adapter | Role | Default | Notes |
|---|---|---|---|
| Docling | Student Core | yes | no OCR by default |
| Unstructured | fallback | no | optional comparison route |
| Azure DI | Instructor Scale | no | requires cloud credentials |
| OCR / ASR / video | Instructor Scale | no | not required for course core |

## Runtime Rules

- Lazy import parser libraries.
- Do not import Docling or Unstructured at Dagster code-location load time.
- If parser dependency is missing, fail with a clear installation message.
- Do not silently create fake parsed output.
