# React

- Declare components as `function ComponentName({ ... }: Props)` and use `interface Props` for component props.
- Do not use `React.FC`.
- Use arrows for concise local handlers and callbacks. Do not use function expressions in JSX merely to avoid arrows.
- When a component contains states, hooks, functions inline for diferrent responsabilities create a custom hook, utility or required files, split to separate concerns and consume the custom hook or utility on the main component.
- Extract a custom hook only when related state or effects materially obscure a component's orchestration.
- Keep UI, routing, styling, and query-library rules project-local.
- Defer async await to the top level into branches where actually needed, do not use async await in the middle of a component.
- Use Promise.all for independent async calls.
- Deduplicate global event listeners and subscriptions by using a single `useEffect` or `useLayoutEffect` with a single cleanup function, rather than multiple effects with separate cleanup functions.
- If a value can be computed from current props or state, do not store it in state or updated it in a effect. Derive it during render to avoid extra state management and re-renders.
- Don't subscribe to dynamic state if you only read it inside a function/callback, instead reads on demand inside the function.
- When an expression is simple (few logical or arithmetical operators) and has a primitive result type (boolean, number, string), do not wrap it in useMemo.
- Put interaction logic in event handlers, not in effects. Effects should be used for side effects, not for handling user interactions.
- Split combined hooks computations into separate hooks when they have different dependencies.
- Subscribe to derived boolean state instead of continuous values to reduce re-render frequency.
- Use explicit ternary operators (? :) instead of && for conditional rendering when the condition can be 0, NaN, or other falsy values that render. 
