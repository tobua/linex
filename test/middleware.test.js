import { create } from './..'

test('Middleware isn\'t accessible on the store.', () => {
  const spy = jest.spyOn(global.console, 'warn')
  const store = create({
    state: {},
    middleware: {
      log: (method) => {
        console.log(`Method ${method} was called.`)
      }
    }
  })

  expect(store.log).toBeUndefined()

  // A warning on the console should be thrown that the method doesn't exist.
  expect(spy).toHaveBeenCalled()
  spy.mockRestore()
})

test('Middleware is called when a method is triggered.', () => {
  const mockMiddleware = jest.fn(() => {})
  const store = create({
    state: {},
    methods: {
      increment: () => {}
    },
    middleware: {
      log: mockMiddleware
    }
  })

  expect(mockMiddleware.mock.calls.length).toEqual(0)
  store.increment()
  expect(mockMiddleware.mock.calls.length).toEqual(1)
})
