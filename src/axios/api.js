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

  getfiles:Host+'api/attachfile/getfiles/', //获取用户上传文件
  delFile: Host + 'api/attachFile/delFile/', //删除文件

    //设备
  addFacilitySort:Host + 'addFacilitySort',// 新建设备类型
  delFacilitySort:Host + 'delFacilitySort/', //删除设备类型
  addFacility:Host+ 'addFacility',// 新建设备设施
  editFacility:Host+'editFacility',//修改设备设施
  delFacility:Host+'delFacility/',//删除设备设施
  getFacilityModel:Host + 'getFacilityModel/', //获取设备设施模型
  getFacilitiesPage:Host+'getFacilitiesPage',//根据类别ID分页分页获取列表
  getFacilitySelector:Host+'getFacilitySelector',//获取所有设备设施
  getSortTree:Host+'getSortTree/', //获取设备类别树
  getFacilitiesSorts:Host+ 'getFacilitiesSorts/',//获取设备设类被树节点
  etSortParents:Host+'etSortParents/',//获取设备类别父级
  getSortChildrenIds:Host+'getSortChildrenIds/',//获取设备类别子集ID集合
//执行标准
  addSafetyStandard:Host+'api/safetyStandard/addSafetyStandard',//新建安全标准
  delSafetyStandard:Host+ 'api/safetyStandard/delSafetyStandard/',//删除安全标准
  editSafetyStandard:Host+'api/safetyStandard/editSafetyStandard',//修改安全标准
  getSafetyStandardModel:Host+'api/safetyStandard/getSafetyStandardModel/',//获取安全标准模型
  getSafetyStandardsPage:Host+'api/safetyStandard/getSafetyStandardsPage',//分页获取安全标准列表
  getSafetyStandardSelector:Host+'api/safetyStandard/getSafetyStandardSelector/',// 获取安全标准选择器

  //风控项
  addDanger:Host+'addDanger',//新建风控项
  addDangerSort:Host+'addDangerSort',//新建风控项类别
  delDanger:Host+'delDanger/',//删除风控项
  delDangerSort:Host+'delDangerSort/',//删除风控项类别
  editDanger:Host+'editDanger',//修改风控项
  getDangerModel:Host+'getDangerModel/',//获取风控项模型
  getDangerListL:Host+'getDangerList/',//根据风控项类别ID获取风控项列表
  getChildrenIdItems:Host+'getChildrenIdItems/',//获取子集ID集合
  getDangerSorts:Host+'getDangerSorts/',//获取风控项类别树节点,
  getDangerSortTree:Host+'getDangerSortTree/',//获取风控项类别树
  getParentsItems:Host+'getParentsItems/',//获取风控项父级集合,
  getDangerLevelSelector:Host+'getDangerLevelSelector',// 获取风险等级选择器
  getDangerSelector:Host+'getDangerSelector/',//根据风控项类别获取风控项选择器
  getSafetyStandardSelector:Host+'api/safetyStandard/getSafetyStandardSelector/',//根据风控项类别获取标准选择器
  getSafetyStandardItems:Host+'getSafetyStandardItems/',//根据风控项ID获取安全标准
  addDangerSafetyStandard:Host+'addDangerSafetyStandard',//风控项新添加安全标准
  delDangerSafetyStandard:Host+'delDangerSafetyStandard/',//删除安全标准

  //风险点管理
  addDangerPoint:Host+'api/dangerPoint/addDangerPoint',//新建风险点
  addDangerPointRelation:Host+'api/dangerPoint/addDangerPointRelation',//新建风险点配置关系
  delDangerPoint:Host+'api/dangerPoint/delDangerPoint/',//删除风险点
  delDangerPointRelation:Host+'api/dangerPoint/delDangerPointRelation/',//删除风险点配置关系
  editDangerPoint:Host+'api/dangerPoint/editDangerPoint',//修改风险点信息
  getDangerPointModel:Host+'api/dangerPoint/getDangerPointModel/',//获取风险点模型
  getDangerPointsPage:Host+'api/dangerPoint/getDangerPointsPage',//分页获取风险点列表
  getDangerPointRelationsPage:Host+'api/dangerPoint/getDangerPointRelationsPage',//根据风险点Id枫叶获取配置关系
  getDangerPointSelector:Host+'api/dangerPoint/getDangerPointSelector',//获取风险点选择器
  getSubjectSelector:Host+'api/dangerPoint/getSubjectSelector',//根据风险点ID和主体类型获取主体选择器

  addDangerRelation:Host + 'api/dangerSet/addDangerRelation',//新建风控项配置关系
  delDangerRelation:Host+'api/dangerSet/delDangerRelation/',//删除风控项配置关系
  getDangerRelationsPage:Host+'api/dangerSet/getDangerRelationsPage',//根据主题ID分页获取风控项配置列表

  //安全会议
  addDocMeeting:Host+'addDocMeeting',//新建安全会议
  getDocMeetingsQuery:Host+'getDocMeetingsQuery',//分页获取安全会议
  delDocMeeting:Host+'delDocMeeting/',//删除安全会议
  editDocMeeting:Host+'editDocMeeting',//修改安全会议
  getDocMeetingModel:Host+'getDocMeetingModel/',//获取安全会议模型

//资质管理
  addDocCertificate:Host+'api/certificate/addDocCertificate',//新建资质
  delDocCertificate:Host+'api/certificate/delDocCertificate/',//删除资质
  getDocCertificateModel:Host+'api/certificate/getDocCertificateModel/',//获取资质模型
  getDocCertificatePage:Host+'api/certificate/getDocCertificatePage',//分页获取资质名称
  DocCertificate:Host+'api/DocCertificate',//修改资质模型


  //培训管理
  addDocTraining:Host+'api/training/addDocTraining',//新建培训
  delTraining:Host+'api/training/delTraining/',//删除培训
  editTraining:Host+'api/training/editTraining',//删除培训
  getTrainingModel:Host+'api/training/getTrainingModel/',//获取培训模型
  getTrainingsPage:Host+'api/training/getTrainingsPage',//分页获取培训列表
  getTrainingEmpsPage:Host+'api/training/getTrainingEmpsPage',//根据培训ID分页获取培训人员列表


}
