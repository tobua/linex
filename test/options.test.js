import { create } from './../src'

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
