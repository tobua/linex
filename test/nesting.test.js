import { create } from './..'

test('Methods on a nested store can be accessed.', () => {
  const productsStore = create({
    state: {
      items: [
        'Apple'
      ]
    },
    methods: {
      add: (state, value) => {
        state.items.push(value)
      }
    }
  })

  const store = create({
    state: {
      // Products has it's own substore.
      products: productsStore
    }
  })

  expect(store.products.items.length).toEqual(1)

  store.products.add('Banana')

  expect(store.products.items.length).toEqual(2)
})
