# React

- Declare components as `function ComponentName({ ... }: Props)` and use `interface Props` for component props.
- Do not use `React.FC`.
- Use arrows for concise local handlers and callbacks. Do not use function expressions in JSX merely to avoid arrows.
- Extract a custom hook only when related state or effects materially obscure a component's orchestration.
- Keep UI, routing, styling, and query-library rules project-local.
