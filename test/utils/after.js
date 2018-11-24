/**
 * Returns a promise that will execute the method after the number of seconds
 * has passed.
 **/
export default (seconds, method) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(method()), seconds * 1000)
  })
}
