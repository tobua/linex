import fetch from 'node-fetch'
import { create } from './..'

test('Store with all kinds of features for documentation.', async () => {
  const store = create({
    // Define the initial state.
    state: {
      count: 0
    },
    // Methods are used to update the state.
    methods: {
      increment: (state, value) => {
        state.count++
      },
      asyncIncrement: (state, value, rootState, delay) => {
        setTimeout(() => {
          delay((state, done, fail) => {
            state.count = state.count + 5
            done(state.count)
          })
        }, 1000)
      }
    },
    // Define selectors to get values derived from the state
    selectors: {
      double: [
        state => state.count,
        count => count * 2
      ]
    }
  })

  // State
  expect(store.count).toEqual(0)
  // Method
  store.increment()
  expect(store.count).toEqual(1)
  // Async Method
  const { value } = await store.asyncIncrement()
  expect(value).toEqual(6)
  expect(store.count).toEqual(6)
  // Selector
  expect(store.double()).toEqual(12)
})

test('Async methods example works as expected', async () => {
  const store = create({
    state: {
      isLoadingTemperature: false,
      isErrorTemperature: false,
      weather: null
    },
    methods: {
      loadWeather: (state, value, rootState, delay) => {
        state.isLoadingTemperature = true

        // Load weather data for Zurich, Switzerland.
        fetch('https://www.metaweather.com/api/location/784794')
          .then(res => res.json())
          .then(json => {
            delay((state, done, fail) => {
              if (!json.consolidated_weather) {
                state.isLoading = false
                state.isError = true
                fail()
              } else {
                state.isLoading = false
                state.isError = false
                state.weather = json.consolidated_weather[0].weather_state_name
                done(state.weather)
              }
            })
          })
      }
    }
  })

  await store.loadWeather()

  expect(typeof store.weather).toEqual('string')
})
