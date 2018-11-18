export default (method) => {
  // https://stackoverflow.com/questions/38508420/how-to-know-if-a-function-is-async
  // https://www.npmjs.com/package/is-async-function
  const immediateReturn = method()

  return immediateReturn instanceof Promise
}
