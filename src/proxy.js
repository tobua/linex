import traps from './traps'

// Creates a deep access proxy that will call the handler for every getter.
export default app =>  {
  return new Proxy({}, traps(app))
}
