# TypeScript

- Use `interface` by default for named object contracts.
- Use `type` where an interface does not express the shape clearly: unions, intersections, tuples, primitives, mapped, conditional, utility, composition, or unavoidable external types.
- Use named `function` declarations by default for named module-level behavior.
- Use arrows for concise inline callbacks, local handlers, callback parameters, or when extracting a named function reduces clarity.
- Do not use `any` to bypass a type problem. Use `unknown` for genuinely untrusted input, validate or narrow it at the boundary, then trust the result.
- Trust values guaranteed by TypeScript or already validated by the project's boundary schema; do not revalidate primitive types internally.
- For typed optional values, check the presence of the containing value or object rather than revalidating a primitive property type.
- When `0`, `false`, or an empty string is valid, do not use primitive truthiness as a presence check.
- Use runtime `typeof` checks for `unknown` or genuinely untrusted boundary input, not already typed internal values.
- Prefer early returns or independent conditionals when they avoid unnecessary `else` branches without duplicating work or reducing readability.
- Use `kebab-case` filenames unless the project or framework requires another convention.
