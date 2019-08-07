const Host='http://quickcq.com:8008/'
export default {
  hostname: Host, //把主机名公布出去
  // template:templates,

  userSignin:Host+'api/auth/userSignin',//用户登录

  LogsPage:Host+'api/log/getLogsPage',//分页获取日志列表
}
