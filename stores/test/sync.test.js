import * as stores from 'linex-stores'
import run from './utils/run'

run('sync(initial, sync) store works as expected', async (fallback, create) => {
  const sync = async value => {
    // Mock to sync value after 0.1 second.
    await new Promise(done => setTimeout(done, 10))
  }
  const store = create({
    state: {
      persisted: stores.sync('hello', sync)
    }
  })

  expect(store.persisted.value).toEqual('hello')
  expect(store.persisted.synced).toEqual(false)

  await new Promise(done => setTimeout(() => {
    expect(store.persisted.value).toEqual('hello')
    expect(store.persisted.synced).toEqual(true)
    done()
  }, 20))

  store.persisted.set('world')

  expect(store.persisted.value).toEqual('world')
  expect(store.persisted.synced).toEqual(false)

  await new Promise(done => setTimeout(() => {
    expect(store.persisted.value).toEqual('world')
    expect(store.persisted.synced).toEqual(true)
    done()
  }, 20))
})
