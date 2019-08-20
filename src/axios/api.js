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
    dict: Host + 'api/Dict/', //获取自定义项词典
    addUserDefined:Host + 'api/userDefined/addUserDefined',  //新建自定义项post
    delUsrDefine:Host + 'api/userDefined/delUserDefined/', //删除自定义项
    editUserDefined:Host + 'api/userDefined/editUserDefined', //修改自定义项
    getUserDefined:Host + 'api/userDefined/getUserDefined/', //获取用户自定义项
    getUserdefinedDataType:Host + 'api/userDefined/getUserdefinedDataType', //获取自定义项支持的数据类型
    getUserDefinedItems:Host + 'api/userDefined/getUserDefinedItems/', //根据自定义类型获取自定义项集合
    getUserDefinedList:Host + 'api/userDefined/getUserDefinedList',  //根据自定义类型获取表单的自定义项
    getUserDefiedType:Host + 'api/userDefined/getUserDefinedTypes', //获取自定义项类型集合
  },
  //组织架构
  Org:{
    getEmployeePage: host + 'api/org/getEmployeePage',
    getEmployeeSelector:Host+ 'api/org/getEmployeeSelector/',
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
    editOrg: Host + 'api/org/editOrg',
    getTree: Host + 'api/org/getTree/'
      },
  //作业流程
  TextFlow:{
    addOpreation: Host + 'api/opreation/addOpreation',  //新建作业流程
    delOpreation: Host + 'api/opreation/delOpreation/',  //删除作业流程
    editOpreation:  Host + 'api/opreation/editOpreation',  //修改作业流程
    addOpreationFlow: Host + 'api/opreation/addOpreationFlow',  //新建操作流程
    delOpreationFlow: Host + 'api/opreation/delOpreationFlow/',  //删除操作流程
    getOpreationModel: Host + 'api/opreation/getOpreationModel/',  //获取作业模型
    getOpreationsPage: Host + 'api/opreation/getOpreationsPage',  //分页获取作业列表
    getOpreationFlowList: Host + 'api/opreation/getOpreationFlowList/',  //根据作业id获取作业流程节点列表
    getOpreationItems: Host + 'api/opreation/getOpreationItems',  //获取作业集合
  },

  getRoleSelector:Host + 'api/auth/getRoleSelector',
  Dict: {
    addDict: host + 'api/dict/addDict',
    addDictType: host + 'api/dict/addDictType',
    delDict: host + 'api/dict/delDict/',
    delDictType: host + 'api/dict/delDictType/',
    editDict: host + 'api/dict/editDict',
    getDictModel: host + 'api/dict/getDictModel/',
    getDictsPage: host + 'api/dict/getDictsPage',
    getDictTypeItems: host + 'api/dict/getDictTypeItems'
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
  delPost:Host+'api/post/delPost/',
  addPost: Host + 'api/post/addPost',//新建岗位
  addPostEmployee: Host + 'api/post/addPostEmployee',//新建岗位人员
  delPostEmployee: Host + 'api/post/delPostEmployee/',//删除岗位人员
  editPost: Host + 'api/post/editPost',//修改岗位信息
  getEmpByPostID: Host + 'api/post/getEmpByPostID/',//根据岗位ID获取人员选择器
  getPostModel: Host + 'api/post/getPostModel/',//获取岗位模型
  getPostsPage: Host + 'api/post/getPostsPage',//分页获取岗位列表
  getPostItems: Host + 'api/post/getPostItems',//获取岗位集合
  getPostSelector: Host + 'api/post/getPostSelector',//获取岗位集合
  getEmployeesByPostID: Host + 'api/post/getEmployeesByPostID',//根据岗位ID分页获取人员列表

  getfiles:Host+'api/attachfile/getfiles/' //获取用户上传文件
}
