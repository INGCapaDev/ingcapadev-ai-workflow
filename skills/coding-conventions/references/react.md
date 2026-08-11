# React

- Declare components as `function ComponentName({ ... }: ComponentProps)` and give prop interfaces descriptive, context-specific names, that identify the component or role they describe.
- Do not use `React.FC`.
- Use arrows for concise local handlers and callbacks. Do not add function expressions in JSX merely to avoid arrows.
- Keep component logic together by default. Extract a component or custom hook when it creates a distinct responsibility, hides a meaningful contract, or materially clarifies orchestration.
- Derive values from current props or state during render instead of mirroring them in state or synchronizing them with an effect.
- Memoize only when current computation cost or required referential stability justifies it; When an expression is simple/cheap (few logical or arithmetical operators) and has a primitive result type, avoid `useMemo` or `useCallback`.
- Keep client rendering free of side effects. Place async work at the appropriate event, effect, server, or data boundary.
- Run async operations concurrently only when they are independent and concurrent failure, cancellation, rate-limit, ordering, and resource behavior are acceptable.
- Use effects to synchronize external systems and keep interaction-triggered logic in event handlers. Organize each effect around one synchronization lifecycle; combine subscriptions only when dependencies and cleanup are genuinely shared.
- Subscribe to the smallest state that preserves required UI behavior. Selector equality, imperative reads, and store or query-library behavior remain project-specific.
- Use `&&` for conditional rendering only with a boolean or explicit predicate on the left; use a ternary when both branches matter.
- Keep UI, routing, styling, store, and query-library rules project-local.
