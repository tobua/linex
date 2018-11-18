import createSelectors from './utils/create-selectors'

export default (args) => {
  args.selectors = createSelectors(args.selectors, args.state)

  return args
}
