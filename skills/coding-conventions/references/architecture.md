# Architecture

Load this reference only for changes that add or alter a module, component, interface, ownership boundary, or other structural boundary.

- **Own responsibilities:** Put behavior beside the state, decision, or domain concept it owns. A module or component should have a distinct responsibility and a clear reason to exist.
- **Choose depth deliberately:** Add a module or layer only when it introduces distinct ownership, a meaningful contract, or a real boundary. Do not add pass-through layers or shallow wrappers merely to move code.
- **Use useful seams:** Add a seam when it creates a meaningful contract or ownership boundary for a current integration, substitution, or test need. Do not create speculative seams that only expose implementation details.
- **Hide information:** Interfaces expose the stable contract consumers need and hide storage, framework, algorithm, and other implementation choices. An interface that mirrors one implementation without a boundary is not a useful abstraction.
- **Preserve locality:** Keep related behavior and data together, minimize navigation and cross-module coordination cost, and keep shared code truly cross-cutting rather than a generic dumping ground.
- **Keep structure proportional:** Prefer feature or module grouping, vertical slices, and screaming architecture when they improve domain ownership and discoverability; choose structure proportional to the project and current boundary.
- Adopt DDD, Clean Architecture, or a Result pattern only when the project explicitly does so.
