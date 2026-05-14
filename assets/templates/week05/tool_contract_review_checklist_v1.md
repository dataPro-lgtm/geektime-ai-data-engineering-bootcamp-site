# Tool Contract Review Checklist v1

- [ ] Tool input schema has `required` fields.
- [ ] Unknown properties are rejected.
- [ ] Metrics are checked against registry.
- [ ] Dimensions are checked against allowed dimensions.
- [ ] Filters are checked against allowed filters.
- [ ] Time window guard is enforced.
- [ ] Role filter is enforced.
- [ ] SQL is parameterized.
- [ ] Runtime reads only safe view.
- [ ] Output includes `allowed`, `rows`, `denial_code`, `message`, `audit`.
- [ ] Positive examples pass.
- [ ] Negative examples return expected denial codes.
