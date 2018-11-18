import { createSelector } from 'reselect'
import invariant from 'invariant'

export default (selectors, state) => {
  const result = {}

  Object.keys(selectors).forEach(selectorKey => {
    const selector = selectors[selectorKey]

    invariant(selector instanceof Array, 'A selector must be an array.')
    invariant(selector.length > 1, 'A selector needs at least one parameter and a selector function.' + selectorKey)

    const calculation = selector[selector.length - 1]

    invariant(typeof calculation === 'function', 'Last property of a selector must be a function.')

    const args = selector.splice(0, selector.length - 1)

    result[selectorKey] = createSelector(...args, calculation)
  })

  return result
}
