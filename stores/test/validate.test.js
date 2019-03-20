import * as stores from 'linex-stores'
import run from './utils/run'

run('validate(initial, valid) store works as expected', (fallback, create) => {
  const isAdult = age => (age >= 18 && age <= 122)
  const store = create({
    state: {
      adultAge: stores.validate(40, isAdult),
    }
  })

  expect(store.adultAge.value).toEqual(40)
  expect(store.adultAge.valid).toEqual(true)
  expect(store.adultAge.error).toEqual(false)
  expect(store.adultAge.set(16)).toEqual(16)
  expect(store.adultAge.valid).toEqual(false)
  expect(store.adultAge.error).toEqual(true)
  expect(store.adultAge.set(200)).toEqual(200)
  expect(store.adultAge.valid).toEqual(false)
  expect(store.adultAge.error).toEqual(true)
  expect(store.adultAge.set(18)).toEqual(18)
  expect(store.adultAge.valid).toEqual(true)
  expect(store.adultAge.error).toEqual(false)
})

run('validate(initial, valid, warning) store works as expected', (fallback, create) => {
  const isAdult = age => (age >= 18 && age <= 122)
  const isTeenager = age => (age >= 16 && age < 18)
  const store = create({
    state: {
      adultAge: stores.validate(40, isAdult, isTeenager),
    }
  })

  expect(store.adultAge.value).toEqual(40)
  expect(store.adultAge.valid).toEqual(true)
  expect(store.adultAge.error).toEqual(false)
  expect(store.adultAge.warning).toEqual(false)
  expect(store.adultAge.set(16)).toEqual(16)
  expect(store.adultAge.valid).toEqual(false)
  expect(store.adultAge.error).toEqual(true)
  expect(store.adultAge.warning).toEqual(true)
  expect(store.adultAge.set(200)).toEqual(200)
  expect(store.adultAge.valid).toEqual(false)
  expect(store.adultAge.error).toEqual(true)
  expect(store.adultAge.warning).toEqual(false)
  expect(store.adultAge.set(18)).toEqual(18)
  expect(store.adultAge.valid).toEqual(true)
  expect(store.adultAge.error).toEqual(false)
  expect(store.adultAge.warning).toEqual(false)
})
