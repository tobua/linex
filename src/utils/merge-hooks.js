const forEachHook = (hooks, handler) => {
  for (const key in hooks) {
    // Hooks are functions, call handler for each possible hook encountered.
    if (typeof hooks[key] === 'function') {
      handler(hooks[key], hooks)
    }

    if (typeof hooks[key] === 'object') {
      // Recursively travel subkeys.
      const subkeys = forEachHook(hooks[key], handler)
    }
  }
}

export default (hooks, state) => {
  forEachHook(hooks, (hook, position) => {
    console.log('handlr', hook)
    // const [count, setCount] = hook()
  })
}
