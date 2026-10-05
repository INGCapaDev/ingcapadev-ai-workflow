# React

- Declare components as `function ComponentName({ ... }: ComponentProps)` and give prop interfaces descriptive, context-specific names, that identify the component or role they describe.
- Props describe a coherent component responsibility and accurately model related states. Loading, empty, error, and interaction states follow actual requirements.
- Do not use `React.FC`.
- Use arrows for concise local handlers and callbacks. Do not add function expressions in JSX merely to avoid arrows.
- Keep component logic together by default. Extract a component or custom hook when it owns a distinct responsibility, hides meaningful complexity, or materially clarifies orchestration; a useful one-use extraction is valid.
- Derive values from current props or state during render instead of mirroring them in state or synchronizing them with an effect.
- Compute ordinary derived values directly. `useMemo` caches calculation results; `useCallback` caches function identity. Introduce memoization for a concrete optimization benefit based on computation cost or consumer behavior, not callback-body length. Correctness remains independent of retaining the cache; account for React Compiler when the project uses it.
- Keep client rendering free of side effects. Place async work at the appropriate event, effect, server, or data boundary.
- Run async operations concurrently only when they are independent and concurrent failure, cancellation, rate-limit, ordering, and resource behavior are acceptable.
- Use effects to synchronize external systems and keep interaction-triggered logic in event handlers. Organize each effect around one synchronization lifecycle, declare its reactive dependencies, and pair setup with the cleanup its resources require. Combine subscriptions only when dependencies and cleanup are genuinely shared.
- Subscribe to the smallest state that preserves required UI behavior. Selector equality, imperative reads, and store or query-library behavior remain project-specific.
- Use `&&` for conditional rendering only with a boolean or explicit predicate on the left; use a ternary when both branches matter.
- Follow project-local UI, data, form, routing, styling, store, and query-library conventions and tools.
