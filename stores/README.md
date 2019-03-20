# linex-stores

Stores for the `linex` state-management library encapsulating commonly used logic.

## Installation

```
npm i linex linex-stores
```

## Usage

```js
import { create } from 'linex'
import { count, toggle } from 'linex-stores'

const store = create({
  state: {
    counter: count(5),
    active: toggle(true)
  }
})

store.counter.value === 5
store.counter.increment()
store.counter.value === 6
store.active.value === true
store.active.toggle()
store.active.value === false
```

## Stores

This package includes a few stores essential for everyday web development. There are different ways to import them:

```js
import { set } from 'linex-stores'
const store = create({ state: { input: set(5) } })

import { set as setStore } from 'linex-stores'
const store = create({ state: { input: setStore(5) } })

import * as stores from 'linex-stores'
const store = create({ state: { input: stores.set(5) } })
```

### Set

```js
const store = set(initial: any)
```

| Interface     | Type     | Description  |
| ------------- |:---------|:------|
| store.value: any         | State    |Returns the current value. |
| store.set(value: any)    | Update   |Changes the value.|

### Toggle

```js
const store = toggle([initial = false]: boolean)
```

| Interface     | Type     | Description  |
| ------------- |:---------|:------|
| store.value: boolean | State    |Returns the state.|
| store.toggle([value]: boolean): boolean| Update   |Toggles the value, or sets it to the one passed.|

### Count

```js
const store = count([initial = 0]: number)
```

| Interface     | Type     | Description  |
| ------------- |:---------|:------|
| store.value: number         | State    |Returns the current count. |
| store.increment([value]: number): number    | Update   |Increments the count by value or by 1 if no value provided.|
| store.decrement([value]: number): number    | Update   |Decrements the count by value or by 1 if no value provided.|

### List

```js
const store = list([initial]: any | initial: [] | ...args: any)
```

| Interface     | Type     | Description  |
| ------------- |:---------|:------|
| store.value: []         | State    |Returns the list as an array. |
| store.add(value: any): []    | Update   |Add a single element to the list.|
| store.add(value: []): []| Update | Adds an array of elements to the list.|
| store.add(...args: any): []| Update | Adds all the args to the list.|
| store.remove(value: any): []    | Update   |Removes all occurences of value from the list.|
| store.removeIndex(index: number): []    | Update   |Removes the element at index from the list.|

### Validate

This store is useful for any kind of form elements, where an invalid value has effects outside the form element itself. For example the submit element of a form being disabled as long some elements contain errors or warnings.

```js
const store = validate(initial: T, valid: T => boolean, [warning]: T => boolean)
```

| Interface     | Type     | Description  |
| ------------- |:---------|:------|
| store.value: any| State    |Returns the current value. |
| store.valid: boolean| State    |Is the current value valid? |
| store.error: boolean| State    |Is the current value invalid? |
| store.warning: boolean| State    |Is the current value causing a warning? |
| store.set(value: any)    | Update   |Sets the current value and updates the validation states.|

### Sync

Used for values that are asynchronously stores elsewhere (Backend, Localstorage, AsyncStorage). Useful if value and sync-state should be displayed in different places.

```js
const store = sync(initial: any, sync: any => Promise)
```

`sync` should be a function returning a Promise resolving as soon as the value has been synchronized.

| Interface     | Type     | Description  |
| ------------- |:---------|:------|
| store.value: any| State    |Returns the current value. |
| store.synced: boolean| State    |True if the value has been successfully synced. |
| store.error: boolean| State    |Did an error happen during synchronization?|
| store.set(value: any)    | Update   |Changes the current value and starts synchronization.|

### Load (Suspense)

Asyncronously load a Component (or else) from anywhere and access it anywhere.

```js
const store = load(importFunc: () => Promise)
```

```js
const store = load(() => import('./src/Component.js'))
```

The import function will be called to load the component and should return a Promise eventually resolving with the Component.

| Interface     | Type     | Description  |
| ------------- |:---------|:------|
| store.Component: any| State    |The Component once loaded. |
| store.loading: boolean| State    |Is the Component currently being loaded?|
| store.loaded: boolean| State    |Has the Component been loaded?|
| store.error: boolean| State    |True if an error loading the Component has happened.|
| store.load(): void    | Update   |Triggers the store to load the Component.|
