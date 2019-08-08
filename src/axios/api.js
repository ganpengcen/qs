
const host = 'http://quickcq.com:8008/'
export default {
  userSignin: host + 'api/auth/userSignin',
  getEmployeePage: host + 'api/org/getEmployeePage',
  addOrg: host + 'api/org/addOrg',
  getEmployeeModel: host + 'api/org/getEmployeeModel/',
  Dict: {
    addDict: host + 'api/dict/addDict',
    addDictType: host + 'api/dict/addDictType',
    delDict: host + 'api/dict/delDict/',
    delDictType: host + 'api/dict/delDictType/',
    editDict: host + 'api/dict/editDict',
    getDictModel: host + 'api/dict/getDictModel/',
    getDictsPage: host + 'api/dict/getDictsPage',
    getDictTypeItems: host + 'api/dict/getDictTypeItems'
  }
}
