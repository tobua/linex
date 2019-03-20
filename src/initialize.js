import read from './read'
import setOptions from './utils/options'

export default app => {
  // Memoize reads.
  read(app)
  // Set global options, last call to create sets options.
  setOptions(app.options)

  return app
}
