import { model } from 'linex'
import run from './utils/run'

run('The root store can be accessed with get()', (fallback, create, get) => {
  const store = create({
    state: {
      count: 0,
      nested: model({
        state: {
          count: 1,
          furtherNested: create({
            state: {
              count: 2
            }
          })
        }
      })
    }
  })

  expect(get().count).toEqual(0)
  expect(store.count).toEqual(0)
  expect(store.nested.count).toEqual(1)
  expect(store.nested.furtherNested.count).toEqual(2)
})

run('Updates have read access to the rootStore', (fallback, create, get) => {
  const store = create({
    state: {
      count: 1,
      nested: model({
        state: {
          count: 2
        },
        update: {
          increment: (state, store, value) => {
            expect(state.count).toEqual(2)
            expect(store.count).toEqual(2)
            expect(get().count).toEqual(1)
            state.count++
          }
        }
      })
    }
  })

  store.nested.increment()

  expect(store.nested.count).toEqual(3)
})
//
// run('Setters to rootStore have no effect', (fallback, create) => {
//   const mockMethod = jest.fn()
//
//   const store = create({
//     state: {
//       count: 1,
//       nested: create({
//         state: {
//           count: 2
//         },
//         update: {
//           increment: (state, store) => {
//             state.count = 5
//           }
//         }
//       })
//     }
//   })
//
//   store.nested.increment()
//   expect(store.count).toEqual(1)
// })
//
// run('An existing store can be injected with set()', (fallback, create, get, set) => {
//   const mockMethod = jest.fn()
//
//   const store = create({
//     state: {
//       count: 1,
//       nested: create({
//         state: {
//           count: 2
//         },
//       })
//     }
//   })
//
//   expect(store.count).toEqual(1)
//   expect(store.nested.count).toEqual(2)
//   expect(get().count).toEqual(1)
//   expect(get().nested.count).toEqual(2)
//   // Reset.
//   set(undefined)
//   expect(get()).toBeUndefined()
//   // Inject.
//   set(store)
//   expect(get().count).toEqual(1)
//   expect(get().nested.count).toEqual(2)
// })
