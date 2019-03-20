import '@babel/polyfill/dist/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { create } from 'linex'
import { toggle, count, set, validate, load } from 'linex-stores'
import Toggle from './Toggle'
import Count from './Count'
import Set from './Set'
import Validate from './Validate'
import Load from './Load'
import prepareDocument from './document'

const isAdult = age => (age >= 18 && age <= 122)

create({
  state: {
    set: set(5),
    toggle: toggle(),
    count: count(),
    age: validate(18, isAdult),
    load: load(() => import('./LoadedComponent'))
  }
})

const App = () => (
  <div>
    <h1>Linex Example React App</h1>
    <h2>set(5)</h2>
    <Set
      mapStore={store => ({
        value: store.set.value,
        set: store.set.set
      })}
    />
    <h2>toggle()</h2>
    <Toggle
      mapStore={store => ({
        active: store.toggle.value,
        toggle: store.toggle.toggle
      })}
    />
    <h2>count()</h2>
    <Count
      mapStore={store => ({
        value: store.count.value,
        increment: store.count.increment,
        decrement: store.count.decrement
      })}
    />
    <h2>validate(18, isAdult)</h2>
    <Validate
      mapStore={store => ({
        value: store.age.value,
        error: store.age.error,
        set: store.age.set
      })}
    />
    <h2>load(() => import('./Component'))</h2>
    <Load
      mapStore={store => ({
        Component: store.load.Component,
        loading: store.load.loading,
        loaded: store.load.loaded,
        load: store.load.load
      })}
    />
  </div>
)

App.displayName = 'App'

prepareDocument()

render(<App />, document.querySelector('#root'))
