import fancy from 'fancy-proxy'
import properties from './properties'
import update from './handlers/update'
import read from './handlers/read'
import { getOptions } from './utils/options'

// Creates a deep access proxy that will call the handler for every getter.
export default app =>  {
  const plugin = (...args) => {
    Object.keys(app.plugin).forEach(
      pluginKey => app.plugin[pluginKey](...args)
    )
  }

  return fancy(app.state, {
    fallback: getOptions().fallback,
    ambiguous: true,
    middleware: plugin,
    handles: [
      update(app),
      read(app)
    ],
    // Add general top-level properties to store.
    immutable: properties(app)
  })
}
