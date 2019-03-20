import { link } from 'linex'
import run from './utils/run'

run('Accessor returns the correct result', (fallback, create) => {
  const store = create({
    state: {
      first: 1,
      second: 2,
      third: 3
    },
    read: {
      total: (state) => state.first + state.second + state.third,
      totalMemo: [
        state => ([state.first, state.second, state.third]),
        (first, second, third) => (first + second + third)
      ]
    }
  })

  expect(store.total()).toEqual(6)
  expect(store.totalMemo()).toEqual(6)
})

run('Memoized selectors can be used to aggregate array values', (fallback, create) => {
  const store = create({
    state: {
      products: [
        {
          name: 'Apple',
          price: 5
        },
        {
          name: 'Banana',
          price: 6
        },
        {
          name: 'Citrus',
          price: 7
        }
      ]
    },
    read: {
      totalPrice: [
        state => [state.products],
        products => {
          return products.reduce((total, products) => total + products.price, 0)
        }
      ]
    }
  })

  expect(store.totalPrice()).toEqual(18)
})

run('Memoized reads are only recalculated when arguments change', (fallback, create) => {
  const mockTotal = jest.fn((first, second) => (first + second))
  const store = create({
    state: {
      first: 1,
      second: 2
    },
    read: {
      total: [
        state => [state.first, state.second],
        mockTotal
      ]
    },
    update: {
      incrementFirst: state => state.first++
    }
  })

  expect(store.total()).toEqual(3)
  expect(store.total()).toEqual(3)
  expect(mockTotal.mock.calls.length).toEqual(1)
  expect(store.incrementFirst()).toEqual(1)
  expect(store.total()).toEqual(4)
  expect(mockTotal.mock.calls.length).toEqual(2)
  expect(store.total()).toEqual(4)
  expect(mockTotal.mock.calls.length).toEqual(2)
})

run('Memoized reads can receive arguments', (fallback, create) => {
  const mockTotal = jest.fn((value, first, second) => (value + first + second))
  const store = create({
    state: {
      first: 1,
      second: 2
    },
    read: {
      total: [
        state => [state.first, state.second],
        mockTotal
      ]
    }
  })

  expect(store.total(3)).toEqual(6)
  expect(store.total(2)).toEqual(5)
})

run('linked subscribers receive reads', (fallback, create) => {
  const mapStore = store => ({
    first: store.first,
    second: store.second,
    third: store.third,
    total: store.total(),
    totalMemo: store.totalMemo()
  })
  const store = create({
    state: {
      first: 1,
      second: 2,
      third: 3
    },
    update: {
      incrementFirst: state => {
        state.first++
      }
    },
    read: {
      total: (state) => state.first + state.second + state.third,
      totalMemo: [
        state => ([state.first, state.second, state.third]),
        (first, second, third) => (first + second + third)
      ]
    }
  })

  const mockChange = jest.fn()

  const { state } = link(mapStore, mockChange)

  expect(state.first).toEqual(1)
  expect(state.total).toEqual(6)
  expect(state.totalMemo).toEqual(6)

  expect(mockChange.mock.calls.length).toEqual(0)

  store.incrementFirst()

  expect(mockChange.mock.calls.length).toEqual(1)

  expect(mockChange.mock.calls[0][0].total).toEqual(7)
  expect(mockChange.mock.calls[0][0].totalMemo).toEqual(7)
})
