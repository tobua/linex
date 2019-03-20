import React from 'react'
import wretch from 'wretch'
import { create, Component } from 'linex'

// Store to load and get quote from.
export const store = create({
  state: {
    isLoading: false,
    isError: false,
    data: null
  },
  update: {
    load: (state, store) => {
      state.isLoading = true
      store.later((done, fail) => {
        // Load random design quote.
        wretch('http://quotesondesign.com/wp-json/posts')
        .options({ mode: 'cors' })
        .get()
        .json(json => {
          store.receive(json)
          done()
        })
      })
    },
    receive: (state, store, json) => {
      if (!json.length) {
        state.isLoading = false
        state.isError = true
      } else {
        state.isLoading = false
        state.isError = false
        state.data = {
          quote: json[0].content,
          author: json[0].title
        }
      }
    }
  }
})

// Removes HTML tags from string
const sanitize = content => content.replace(/<[^>]*>/g, '')

// Displays the current state of the quote.
export const Quote = class Quote extends Component {
  render() {
    const { quote } = this.state
    const { isLoading, isError, load, data } = quote

    if (isLoading) {
      return 'Loading quote...'
    }

    if (isError) {
      return 'Error when loading quote.'
    }

    if (!isLoading && !isError && !data) {
      return <button onClick={load}>Load Random Quote</button>
    }

    return <p>"{sanitize(data.quote)}" by {data.author}</p>
  }
}
