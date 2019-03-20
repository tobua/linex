import { create } from 'linex'

export default (...args) => {
  let initial = []

  if (args.length === 1) {
    // Initializing with a single element, either an array or a single value.
    if (Array.isArray(args[0])) {
      initial = args[0]
    } else {
      initial.push(args[0])
    }
  } else {
    // Adding several elements as a list.
    initial = args
  }

  return create({
    state: {
      value: initial
    },
    update: {
      add: (...args) => {
        const state = args[0]
        const value = args[2]

        // Adding several elements.
        if (args.length > 3) {
          state.value = state.value.concat(args.slice(2, args.length))
          return state.value
        }

        // Adding a single element, either an array or a single value.
        if (Array.isArray(value)) {
          state.value = state.value.concat(value)
        } else {
          // With push it failed upon next read when adding objects.
          state.value = [...state.value, value]
        }
        return state.value
      },
      remove: (state, store, value) => {
        state.value = state.value.filter(item => item !== value)
        return state.value
      },
      removeFirst: (state, store, value) => {
        const index = state.value.indexOf(value)
        if (index > -1) {
          state.value.splice(index, 1)
        }
        return [...state.value]
      },
      removeIndex: (state, store, index) => {
        state.value = state.value.filter(
          (item, currentIndex) => currentIndex !== index
        )
        return [...state.value]
      }
    }
  })
}
