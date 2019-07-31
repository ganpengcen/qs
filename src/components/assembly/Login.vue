<template>
  <div class="box">
    <el-row class="menu">
      <el-col :span="12">
        <div class="left" >
          <el-button @click="signin"> login</el-button>
          <div style="height:200px; width:310px; filter: alpha(opacity=45); opacity:0.45; position:absolute; left:553px; top:88px;background-color:red">
             <!-- <input placeholder="用户名" class="input3" v-model="Login"></input> -->
          </div>



   
        <!-- <div class="leftInput">
          <input placeholder="用户名" class="input3" v-model="Login"></input>
        </div>
        <div class="leftInput">
          <input show-password  type="password" placeholder="请输入密码"  class="input3"  v-model="Pwd"></input>
        </div>
          <div class="leftInput1">
            <el-switch
              v-model="value2"
              width="40"
              active-color="#9B9B9B"
              inactive-color="#F5BD1C">
            </el-switch>
            <span class="p20" style="margin-left: 10px;">记住密码</span>
          </div>
        <div class="leftInput">
          <el-button type="primary" @click='signin()' :loading="loading" class="el-button button3"><span class="p18" style="color: black">登录</span></el-button>
        </div> -->
        </div> 
        <!-- <div class="dragon2">
          <img src="../../../static/img/hand.png" alt="">
        </div>
        <div class="dragon3">
          <img src="../../../static/img/tail.png" alt="">
        </div> -->
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        loading: false,
        AccountCode: "",
        Login: "",
        Pwd: "",
        state: 0,
        MenuList: [],
        value2:''
      }

    },
    mounted() {
      let me = this;
      document.onkeydown = function(event) {
        var e = event || window.event;
        if(e && e.keyCode == 13) { //回车键的键值为13
          me.signin()
        }
      };//  xf  xf123456
    },
    methods: {
      signin() {
        // sessionStorage.header = 'application/json;charset=UTF-8';
        // if (this.Login == "" || this.Pwd == "") {
        //   this.$message({
        //     message: "参数不能为空",
        //     type: "warning"
        //   });
        //   return false;
        // }
        this.$router.push({ path: '/Page' });
       
        this.loading = true;
      }
    }
  }
</script>

<style scoped>
.left{
  margin: 0 auto;
  text-align: center;
  position: relative;
  width: 930px;
  height: 520px;
  background-color: aqua;
  background-size:100%;
  /* background-image: url("../../../static/img/10000.png") ; */
}
/* .box{
  position: absolute;
  min-width: 1140px;
  width: 100%;
  height: 100%;
  background-color: #F5BD1C;
  background-size: cover;
}
.menu{
  position: relative;
  z-index: 99;
  width: 427px;
  height: 523px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 10px 0 rgba(0, 44, 95, 0.3);
  margin: 165px auto 0;

}

.img{
  margin-bottom: 42px;
}
.leftInput{
   font-size: 12px;
   width: 277px;
   height: 55px;
   margin-bottom: 20px;
   color: rgba(0, 0, 0, 0.65);
   vertical-align: top;
 }
.leftInput1{
  font-size: 12px;
  width: 277px;
  height: 55px;
  color: rgba(0, 0, 0, 0.65);
  vertical-align: top;
}
.leftButton{
  font-size: 18px;
  width: 256px;

}
  .right{
    float: right;
    width: 256px;
    margin: 33px 40px 0 0;
  }
  .right img{
    width: 256px;
  }
  .header{
    font-size: 18px;
    width: 256px;
    color: #515666;
    font-weight: 400;
  }

.dragon img{
  background-size:contain;
  position: absolute;
  height: auto;
  left: 24%;
  top:18%;
}
.dragon2{
  z-index: 99;
}
.dragon2 img{
  background-size:contain;
  position: absolute;
  height: auto;
  left: 281px;
  top:10px;
}
.dragon3 img{
  background-size:contain;
  position: absolute;
  height: auto;
  right: 427px;
  top:150px;
} */
</style>
