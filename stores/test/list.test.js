import * as stores from 'linex-stores'
import run from './utils/run'

beforeEach(() => {
  // Hide warnings.
  console.warn = () => {}
})

run('list() store works as expected', (fallback, create) => {
  const store = create({
    state: {
      list: stores.list()
    }
  })

  expect(store.list.value).toEqual([])
  expect(store.list.add(1)).toEqual([1])
  expect(store.list.value).toEqual([1])
  expect(store.list.add(2)).toEqual([1, 2])
  expect(store.list.add([3, 4])).toEqual([1, 2, 3, 4])
  expect(store.list.value).toEqual([1, 2, 3, 4])
  expect(store.list.remove(2)).toEqual([1, 3, 4])
  expect(store.list.value).toEqual([1, 3, 4])
  expect(store.list.removeIndex(1)).toEqual([1, 4])
  expect(store.list.value).toEqual([1, 4])
})

run('list(initial: any) store works as expected', (fallback, create) => {
  const store = create({
    state: {
      list: stores.list('hello')
    }
  })

  expect(store.list.value).toEqual(['hello'])
  expect(store.list.add(1)).toEqual(['hello', 1])
  expect(store.list.value).toEqual(['hello', 1])
  expect(store.list.remove('hello')).toEqual([1])
  expect(store.list.value).toEqual([1])
})

run('list(initial: []) store works as expected', (fallback, create) => {
  const store = create({
    state: {
      list: stores.list(['hello', 'world'])
    }
  })

  expect(store.list.value).toEqual(['hello', 'world'])
  expect(store.list.add(1)).toEqual(['hello', 'world', 1])
  expect(store.list.value).toEqual(['hello', 'world', 1])
  expect(store.list.remove('hello')).toEqual(['world', 1])
  expect(store.list.value).toEqual(['world', 1])
})

run('list(...args: any) store works as expected', (fallback, create) => {
  const store = create({
    state: {
      list: stores.list('hello', 'world')
    }
  })

  expect(store.list.value).toEqual(['hello', 'world'])
  expect(store.list.add('foo')).toEqual(['hello', 'world', 'foo'])
  expect(store.list.value).toEqual(['hello', 'world', 'foo'])
  expect(store.list.remove('hello')).toEqual(['world', 'foo'])
  expect(store.list.value).toEqual(['world', 'foo'])
})

run('Updates work as expected', (fallback, create) => {
  const store = create({
    state: {
      list: stores.list()
    }
  })

  expect(store.list.value).toEqual([])
  expect(store.list.add(1)).toEqual([1])
  expect(store.list.value).toEqual([1])
  expect(store.list.add({ hello: 'world' })).toEqual([1, { hello: 'world' }])
  expect(store.list.value).toEqual([1, { hello: 'world' }])
  expect(store.list.remove(1)).toEqual([{ hello: 'world' }])
  expect(store.list.value).toEqual([{ hello: 'world' }])
  // Won't remove, as only references are checked.
  expect(store.list.remove({ hello: 'world' })).toEqual([{ hello: 'world' }])
  expect(store.list.value).toEqual([{ hello: 'world' }])
  expect(store.list.removeIndex(0)).toEqual([])
  expect(store.list.value).toEqual([])
  expect(store.list.add(1, 2)).toEqual([1, 2])
  expect(store.list.value).toEqual([1, 2])
  expect(store.list.add([3, 4])).toEqual([1, 2, 3, 4])
  expect(store.list.value).toEqual([1, 2, 3, 4])
  expect(store.list.removeIndex(2)).toEqual([1, 2, 4])
  expect(store.list.value).toEqual([1, 2, 4])
})

run('remove, removeFirst and removeIndex', (fallback, create) => {
  const store = create({
    state: {
      list: stores.list(1, 0, 2, 2, 3, 1, 1, 3, 3)
    }
  })

  expect(store.list.value).toEqual([1, 0, 2, 2, 3, 1, 1, 3, 3])
  expect(store.list.remove(2)).toEqual([1, 0, 3, 1, 1, 3, 3])
  expect(store.list.value).toEqual([1, 0, 3, 1, 1, 3, 3])
  expect(store.list.removeFirst(3)).toEqual([1, 0, 1, 1, 3, 3])
  expect(store.list.value).toEqual([1, 0, 1, 1, 3, 3])
  expect(store.list.removeIndex(1)).toEqual([1, 1, 1, 3, 3])
  expect(store.list.value).toEqual([1, 1, 1, 3, 3])
  expect(store.list.remove(1)).toEqual([3, 3])
  expect(store.list.value).toEqual([3, 3])
  expect(store.list.removeFirst(3)).toEqual([3])
  expect(store.list.value).toEqual([3])
  expect(store.list.removeFirst(3)).toEqual([])
  expect(store.list.value).toEqual([])
})
