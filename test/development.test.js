import run from './utils/run'
import { counter } from './stores'

beforeEach(() => {
  process.env = Object.assign(process.env, { NODE_ENV: 'development' })
})

afterEach(() => {
  process.env = Object.assign(process.env, { NODE_ENV: 'production' })
})

run('Warning for ambiguous keys in development', (fallback, create) => {
  global.console.warn = jest.fn()

  const store = create({
    state: {
      amibiguous: 0
    },
    update: {
      amibiguous: state => state
    },
    read: {
      amibiguous: state => state
    }
  })

  expect(global.console.warn).toHaveBeenCalled()
  expect(global.console.warn.mock.calls.length).toEqual(3)
  expect(global.console.warn.mock.calls[0][0]).toContain('amibiguous')
  expect(global.console.warn.mock.calls[0][0]).toContain('read')
  expect(global.console.warn.mock.calls[1][0]).toContain('amibiguous')
  expect(global.console.warn.mock.calls[1][0]).toContain('state')
  expect(global.console.warn.mock.calls[2][0]).toContain('amibiguous')
  expect(global.console.warn.mock.calls[2][0]).toContain('state')
})

run('Warning for ambiguous keys between update and read', (fallback, create) => {
  global.console.warn = jest.fn()

  const store = create({
    state: {
      unique: 0
    },
    update: {
      other: state => state,
      amibiguous: state => state
    },
    read: {
      amibiguous: state => state
    }
  })

  expect(global.console.warn).toHaveBeenCalled()
  expect(global.console.warn.mock.calls.length).toEqual(1)
  expect(global.console.warn.mock.calls[0][0]).toContain('amibiguous')
  expect(global.console.warn.mock.calls[0][0]).toContain('read')
})

run('Warning for ambiguous keys between update and read', (fallback, create) => {
  global.console.warn = jest.fn()

  const store = create({
    state: {
      unique: 0,
      amibiguousUpdate: 1,
      amibiguousRead: 2
    },
    update: {
      other: state => state,
      amibiguousUpdate: state => state
    },
    read: {
      amibiguousRead: state => state,
      another: state => state,
    }
  })

  expect(global.console.warn).toHaveBeenCalled()
  expect(global.console.warn.mock.calls.length).toEqual(2)
  expect(global.console.warn.mock.calls[0][0]).toContain('amibiguousUpdate')
  expect(global.console.warn.mock.calls[0][0]).toContain('read')
  expect(global.console.warn.mock.calls[1][0]).toContain('amibiguousRead')
  expect(global.console.warn.mock.calls[1][0]).toContain('read')
})
