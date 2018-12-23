import wretch from 'wretch'

export default {
  state: {
    isLoading: false,
    isError: false,
    data: null
  },
  methods: {
    load: (state, value, rootState, delay) => {
      state.isLoading = true

      // Load weather data for Zurich, Switzerland.
      wretch('https://www.metaweather.com/api/location/784794')
        .options({ mode: 'no-cors' })
        .get()
        .json(json => {
          delay((state, done, fail) => {
            console.log('in')
            if (json.consolidated_weather) {
              state.isLoading = false
              state.isError = true
              fail()
            } else {
              state.isLoading = false
              state.isError = false
              state.data = json.consolidated_weather[0].weather_state_name
              done(state.data)
            }
          })
        })
    }
  }
}
