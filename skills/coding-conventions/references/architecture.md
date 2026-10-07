# Architecture

Load this reference only for changes that add or alter a module, component, interface, ownership boundary, or other structural boundary.

- **Own responsibilities:** Put behavior beside the state, decision, or domain concept it owns. A module or component should have a distinct responsibility and a clear reason to exist.
- **Choose depth deliberately:** A module or layer earns its place through distinct ownership, hidden complexity, a concentrated invariant, or a meaningful boundary that reduces caller knowledge. A single consumer is enough when that value is real; keep straightforward logic local instead of adding pass-through structure.
- **Use useful seams:** Add a seam when it creates a meaningful contract or ownership boundary for a current integration, substitution, or test need. Do not create speculative seams that only expose implementation details.
- **Hide information:** Interfaces expose the stable contract consumers need, including invariants, effects, errors, and ordering requirements, while hiding storage, framework, algorithm, and other implementation choices. An interface that mirrors one implementation without a boundary is not a useful abstraction.
- **Preserve locality:** Keep related behavior and data together, minimize navigation and cross-module coordination cost, and keep shared code truly cross-cutting rather than a generic dumping ground.
- **Keep structure proportional:** Prefer feature or module grouping, vertical slices, and screaming architecture when they improve domain ownership and discoverability; choose structure proportional to the project and current boundary.
- **Discuss meaningful structure:** Follow established organization when it fits; discuss new ownership, dependency boundaries, or materially different organization with the human before implementation. Use the shared code-quality contract-design guidance for that discussion.
- Adopt DDD, Clean Architecture, dependency injection, or a Result pattern deliberately for actual needs within agreed project conventions and design.
