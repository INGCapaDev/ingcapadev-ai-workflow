# TypeScript

- Model actual meaning and valid states: required fields are required, optionality represents real absence, and unions express states with different contracts. Keep named inputs, outputs, and operations clear, with transport details at their owning boundary.
- Use `interface` by default for named object contracts.
- Use `type` where an interface does not express the shape clearly: unions, intersections, tuples, primitives, mapped, conditional, utility, composition, or unavoidable external types.
- Use named `function` declarations by default for named module-level behavior.
- Use arrows for concise inline callbacks, local handlers, and callback parameters, or when a named function would reduce clarity.
- Do not use `any` to bypass a type problem. Use `unknown` for genuinely untrusted input.
- Validate unknown data once at the real trust boundary using the project's existing schema validator and error conventions. Pass the validated result to accurately typed internal functions.
- Use `typeof` for primitive narrowing. Use the project's schemas or appropriate type guards for arrays, objects, and structured boundary data.
- Check an optional property according to its intended absence semantics; the presence of its containing object does not prove that the property exists.
- When `0`, `false`, or an empty string is valid, do not use primitive truthiness as a presence check.
- Prefer early returns or independent conditionals when they avoid unnecessary `else` branches without duplicating work or reducing readability.
- Use `kebab-case` filenames unless the project or framework requires another convention.
- Preserve documented package or feature public entrypoints. Otherwise prefer direct imports within the ownership boundary, and do not create new barrel files unless explicitly requested.
- Chained array operations may add traversals and allocations. Keep the clearest semantics for small or bounded collections; consolidate only when realistic frequency, cardinality, allocation, or hot-path evidence makes the cost material.
- **Model seams accurately:** Trust established internal contracts while preserving genuine narrowing and absence checks. Resolve type problems through accurate modeling rather than `any`, casts, or non-null assertions that conceal a wrong contract. Localize justified assertions where a real invariant or integration constraint is established but TypeScript cannot express it.
