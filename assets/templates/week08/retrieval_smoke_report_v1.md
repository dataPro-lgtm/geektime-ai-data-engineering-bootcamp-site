# Week8 Retrieval Smoke Report

## Release

- index_release_id:
- data_release_id:
- chunk_strategy_version:

## Cases

| case | query | filters | expected | result | notes |
|---|---|---|---|---|---|
| vector-only |  |  | semantic hit |  |  |
| FTS-only |  |  | keyword hit |  |  |
| hybrid RRF |  |  | fused result |  |  |
| product filter |  |  | filtered result |  |  |
| rerank fallback |  |  | API still works |  |  |

## Score Notes

- vector_score:
- fts_score:
- rrf_score:
- rerank_score:
- final_score:
