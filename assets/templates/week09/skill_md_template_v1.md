---
name: example-skill-name
description: Describe the exact OmniSupport workflow this skill handles, including when to use it and when not to use it.
---

# Example Skill Name

Use this skill when the user asks to validate or operate a stable OmniSupport workflow that matches the description.

## Inputs

- `path/to/input`

## Outputs

- `reports/week09/example_report.json`

## Procedure

1. Read the target inputs.
2. Run the deterministic dry-run script.
3. Write a structured report.
4. Summarize findings without hiding missing inputs.

## Boundaries

- Do not execute production writes by default.
- Do not invent missing evidence.
- Use `not_available` when an expected upstream artifact is absent.
