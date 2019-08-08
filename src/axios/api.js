// const Host='http://192.168.0.225:8088/'
// export default {
//   hostname: Host, //把主机名公布出去

// }
const host = 'http://quickcq.com:8008'
export default {
    userSignin: host + '/api/auth/userSignin',
    getEmployeePage:host + '/api/org/getEmployeePage',
    addOrg:host + '/api/org/addOrg',
    getEmployeeModel:host+ '/api/org/getEmployeeModel/'
}
