import { create, model, options } from 'linex'

test('Proxy is used without fallback option.', () => {
  const store = create({
    state: {
      count: 5
    }
  }, {
    fallback: false
  })

  expect(store.isProxy).toEqual(true)
})

test('Object-fallback used if fallback set to true.', () => {
  const store = create({
    state: {
      count: 5
    }
  }, {
    fallback: true
  })

  expect(store.isProxy).not.toEqual(true)
})

test('Object-fallback for models applied when set on root.', () => {
  const store = create({
    state: {
      count: 5,
      nested: model({
        state: {
          count: 6
        }
      })
    }
  }, {
    fallback: true
  })

  expect(store.isProxy).not.toEqual(true)
  expect(store.nested.isProxy).not.toEqual(true)
})
