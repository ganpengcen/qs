<template>
  <div  class="box" >
    <div class="back">
      <img class="imgback" src="../../../static/img/1.png" alt="background">
    </div>
    <div class="Login">

      <div class="leftInput1">
        <p>企业安全管理平台</p>
        <div>
          <el-input class="input" placeholder="请输入账套" v-model="Login1"></el-input>
        </div>

        <div>
          <el-input class="input" placeholder="请输入用户名用户名" v-model="Login2"> </el-input>
        </div>

        <div>
          <el-input class="input"  placeholder="请输入密码"  v-model="Login3" show-password></el-input>
        </div>

        <div style="margin:-5px 0 0 30px">
          <el-button @click="signin"  class="button1" type="primary" v-model="Pwd" style="width:180px">登录</el-button>
        </div>
      </div>


      <img  class="img1"   src="../../../static/img/2.png" alt="建筑">

    </div>

  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        Login1:'',
        Login2:'',
        Login3:'',
        Pwd:'',
      }
    },
    methods: {
      signin() {
        let that = this
        this.$post(this.api.userSignin,{
          "AccountCode": "1",
          "Login": "gpc",
          "Pwd": "123456"
        }).then((data)=>{
         if(data.status===200){
           console.log(data)
           sessionStorage.setItem('Token',data.data.Data.UserInfo.Token)
           sessionStorage.setItem('AccountID',data.data.Data.AccountID)
           that.$router.push({ path: '/Index' });
        };
        })

      }
    }
  }
</script>

<style scoped>
  .input{
    margin: 25px;
    width:256px;
    height:7px;
  }
  .img1{
    width: 256px;
    height: auto;
  }
  .button1{
    width: 256px;
    margin: 25px;
  }
  .leftInput1{
    float:left;
    margin: 0 40px 0 0;
  }
  .Login{
    margin: 175px 0 0 400px;
    background-color: white;
    float: left;
    width: 680px;
    height: 250px;
    padding: 50px 0px 40px 50px;
    border-radius: 10px;
    z-index: 1;
    position: relative;
  }
  .back{
    z-index: 0;
    position: absolute;
    width:100%;
    height:722px;
  }

  .box{
    background-color: #007fe3;
    width: 1520px;
    height: 721px;
  }
  .imgback{
    width: 1520px;
    height:719px

  }
  p{
    margin: 1px;
    font-size: 22px;
  }
</style>

