import { Promise as PromisePoly } from 'es6-promise'

export default () => {
  if (typeof Promise !== 'undefined') {
    return Promise
  }

  return PromisePoly
}
