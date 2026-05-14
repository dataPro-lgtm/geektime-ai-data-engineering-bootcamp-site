# Chunking Strategy v1

## Strategy Name

`section_aware_v1`

## Principle

Respect document structure first. Fit token budget second.

## Rules

1. Group parsed elements by `section_path`.
2. Merge short adjacent paragraphs inside the same section.
3. Preserve tables by default.
4. If a table is too long, split with header retained.
5. Split overlong sections by token budget.
6. Apply overlap only inside the same section.
7. Record `overlap_prev` and `overlap_next`.
8. Never cross section boundaries just to satisfy chunk size.

## Stable ID

```text
chunk_id = sha256(
  doc_id
  + source_fingerprint
  + doc_version
  + chunk_strategy_version
  + section_id
  + chunk_index
  + content_hash
)[:32]
```

## Regression Checks

- Same input produces same chunk IDs.
- Changing `chunk_strategy_version` changes chunk IDs.
- Changing only `parse_run_id` does not change chunk IDs.
