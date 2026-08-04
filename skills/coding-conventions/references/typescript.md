# TypeScript

- Use `interface` by default for named object contracts.
- Use `type` where an interface does not express the shape clearly: unions, intersections, tuples, primitives, mapped, conditional, utility, composition, or unavoidable external types.
- Use named `function` declarations by default for named module-level behavior.
- Use arrows for concise inline callbacks, local handlers, and callback parameters, or when a named function would reduce clarity.
- Do not use `any` to bypass a type problem. Use `unknown` for genuinely untrusted input.
- Validate unknown data once at the nearest boundary using the project's existing schema validator and conventions, such as Zod when available. Pass the validated result to typed functions and trust TypeScript internally.
- Use `typeof` for primitive narrowing. Use the project's schemas or appropriate type guards for arrays, objects, and structured boundary data.
- Check an optional property according to its intended absence semantics; the presence of its containing object does not prove that the property exists.
- Trust values guaranteed by TypeScript or already validated by the project's boundary schema; do not repeat runtime validation internally.
- When `0`, `false`, or an empty string is valid, do not use primitive truthiness as a presence check.
- Prefer early returns or independent conditionals when they avoid unnecessary `else` branches without duplicating work or reducing readability.
- Use `kebab-case` filenames unless the project or framework requires another convention.
- Preserve documented package or feature public entrypoints. Otherwise prefer direct imports within the ownership boundary, and do not create new barrel files unless explicitly requested.
- Chained array operations may add traversals and allocations. Keep the clearest semantics for small or bounded collections; consolidate only when realistic frequency, cardinality, allocation, or hot-path evidence makes the cost material.
