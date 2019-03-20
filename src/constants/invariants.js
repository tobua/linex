export default {
  oneArgumentMinimum: 'At least one argument needs to be passed.',
  firstObject: 'An object needs to be passed as the first argument.',
  stateRequired: 'A state property is required on the first argument.',
  stateObject: 'state needs to be an object.',
  updateObject: 'update needs to be an object.',
  readObject: 'read needs to be an object.',
  pluginObject: 'plugin needs to be an object.',
  fallbackBoolean: 'fallback options must be a boolean value.',
  laterCallback: 'later(method) expects a function as the first argument.',
  updateOnRead: key => `Linex Warning: The update key '${key}' is found on read as well. Make sure keys are unique.`,
  keyOnState: key => `Linex Warning: The update/read key '${key}' is found on the state as well. Make sure keys are unique.`
}
