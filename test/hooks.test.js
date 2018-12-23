import { create, set } from './..'

test('SetState hook returns the correct initial state.', () => {
  const store = create({
    hooks: {
      type: set('apple')
    }
  })

  expect(store.type.value).toEqual('apple')

  console.log('set', store.type.set);

  store.type.set('banana')

  // expect(store.type.value).toEqual('banana')
})
