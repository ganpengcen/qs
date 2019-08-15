const host = 'http://quickcq.com:8008/'
const Host = 'http://quickcq.com:8008/'
export default {
  hostname: host, //把主机名公布出去
  // template:templates,

  userSignin: Host + 'api/auth/userSignin',//用户登录

  //日志
  LogsPage: Host + 'api/log/getLogsPage',//分页获取日志列表
  delLog: Host + 'api/log/delLogByLogin/',//删除指定操作日志
  delLogTime: Host + 'api/log/delLogByTime',//删除指定时间操作日志
  delLogId: Host + 'api/log/delLogById/',//删除指定id的操作日志

  //词典
  Dict: {
    addDict: Host + 'api/dict/addDict',	// 新建词典
    addDictType: Host + 'api/dict/addDictType',	// 新建词典类型
    delDict: Host + 'api/dict/delDict/',	// 删除词典
    delDictType: Host + 'api/dict/delDictType/',	// 删除词典类型
    editDict: Host + 'api/dict/editDict',	// 编辑词典
    getDictModel: Host + 'api/dict/getDictModel/',// 获取词典模型
    getDictsPage: Host + 'api/dict/getDictsPage',	// 根据词典类型分页获取词典列表
    getDictTypeItems: Host + 'api/dict/getDictTypeItems',	// 获取词典类型集合
  },
  //用户自定义数据
  UserDefined: {
    addUserDefined:Host + 'api/userDefined/addUserDefined',  //新建自定义项post
    delUsrDefine:Host + 'api/userDefined/delUserDefined/', //删除自定义项
    editUserDefined:Host + 'api/userDefined/editUserDefined', //修改自定义项
    getUserDefined: Host + ' api/userDefined/getUserDefined/', //获取用户自定义项
    getUserdefinedDataType: Host + 'api/userDefined/getUserdefinedDataType', //获取自定义项支持的数据类型
    getUserDefinedItems: Host + 'api/userDefined/getUserDefinedItems/', //根据自定义类型获取自定义项集合
    getUserDefinedList: Host + ' api/userDefined/getUserDefinedList',  //根据自定义类型获取表单的自定义项
    getUserDefiedType:Host + 'api/userDefined/getUserDefinedTypes', //获取自定义项类型集合
  },
  //组织架构
<<<<<<< HEAD
  Org:{
    getEmployeePage: host + 'api/org/getEmployeePage',
    addOrg: host + 'api/org/addOrg',
    getEmployeeModel: host + 'api/org/getEmployeeModel/',
    getOrgChildren:host + 'api/org/getOrgChildren/',
    getParentItems: host + 'api/org/getParentItems/',
    getChildrenItems: host + 'api/org/getChildrenItems/',
    getEmployeeList: host + 'api/org/getEmployeeList/',
    employeeQuit: host + 'api/org/employeeQuit',
    deleteEmployee: host + 'api/org/deleteEmployee/',
    editEmployee: host + 'api/org/editEmployee',
    addEmployee:  host + 'api/org/addEmployee',
    deleteOrg: host + 'api/org/deleteOrg/',
    editOrg: host + 'api/org/editOrg',
      },

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
=======
  Org: {
    addOrg: Host + 'api/org/addOrg',//新建组织架构
    editOrg: Host + 'api/org/editOrg',//修改组织架构
    deleteOrg: Host + 'api/org/deleteOrg/',//删除组织架构
    addEmployee: Host + 'api/org/addEmployee',//新建组织人员
    editEmployee: Host + 'api/org/editEmployee',//修改人员信息
    deleteEmployee: Host + 'api/org/deleteEmployee/',//删除人员
    employeeQuit: Host + 'api/org/employeeQuit',//员工离职
    getEmployeeModel: Host + 'api/org/getEmployeeModel/',//获取人员模型
    getEmployeePage: Host + 'api/org/getEmployeePage',//根据组织id分页获取人员列表
    getEmployeeList: Host + 'api/org/getEmployeeList/',//根据组织id获取人员集合
    getOrgChildren: Host + 'api/org/getOrgChildren/',//获取组织架构子集
    getChildrenItems: Host + 'api/org/getChildrenItems/',//获取组织架构子集id
    getParentItems: Host + 'api/org/getParentItems/',//获取组织架构父集
    getTree: Host + 'api/org/getTree/',//获取组织架构树
  },

  //自定义项
  addUserDefined: Host + 'api/userDefined/addUserDefined', //新建自定义项
  delUserDefined: Host + 'api/userDefined/delUserDefined/', //删除自定义项
  editUserDefined: Host + 'api/userDefined/editUserDefined', //修改自定义项
  getUserDefined: Host + 'api/userDefined/getUserDefined/',//获取自定义项
  getUserDefinedDataType: Host + 'api/userDefined/getUserdefinedDataType', //获取自定义项支持的数据类型
  getUserDefinedItems: Host + 'api/userDefined/getUserDefinedItems/', //根据自定义类型获取自定义项集合
  getUserDefinedList: Host + 'api/userDefined/getUserDefinedList', //根据自定义类型获取表单的自定义项
  getUserDefinedTypes: Host + 'api/userDefined/getUserDefinedTypes', //获取自定义项类型集合

  //岗位管理
  addPost: Host + 'api/post/addPost',//新建岗位
  addPostEmployee: Host + 'api/post/addPostEmployee',//新建岗位人员
  delPostEmployee: Host + 'api/post/delPostEmployee/',//删除岗位人员
  editPost: Host + 'api/post/editPost',//修改岗位信息
  getEmpByPostID: Host + 'api/post/getEmpByPostID/',//根据岗位ID获取人员选择器
  getPostModel: Host + 'api/post/getPostModel/',//获取岗位模型
  getPostsPage: Host + 'api/post/getPostsPage',//分页获取岗位列表
  getPostItems: Host + 'api/post/getPostItems',//获取岗位集合
  getEmployeesByPostID: Host + 'api/post/getEmployeesByPostID',//根据岗位ID分页获取人员列表
>>>>>>> 17888d97eed5d58c858d85a3b1ed76838b20f591
}
