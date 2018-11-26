import createSelectors from './utils/create-selectors'
import referenceRootStore from './utils/reference-root-store'

export default (args) => {
  args.selectors = createSelectors(args.selectors, args.state)

  // args.state = referenceRootStore(args.state, args)

  return args
}
