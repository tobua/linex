import { topLevel, lowerLevel } from './handler'

export default app => ({
  get: (target, name) => {
    if (name === 'isProxy') {
      return true
    }

    return topLevel(app, name, target)
  },
  set: (target, name, value) => {
    console.warn('Please use methods to update the state.')
    return true
  }
})
