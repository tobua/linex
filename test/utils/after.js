/**
 * Returns a promise that will execute the method after the number of seconds
 * has passed.
 **/
export default (miliseconds, method) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(method()), miliseconds)
  })
}
