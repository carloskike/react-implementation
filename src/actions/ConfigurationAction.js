import Reflux from 'reflux'

let ConfigurationAction = Reflux.createActions([
  'ListFunds',
  'ListDocumentsWithFund',
  'SaveDocumentsFund',
  'UsersWithValidators'
])

export default ConfigurationAction