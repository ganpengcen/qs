<template>
  <div class="box">
    <!-- <div class="back">
      <img class="imgback" src="" alt="background" />
    </div>-->
    <div class="Login">
      <div class="leftInput1">
        <p>企业安全管理平台</p>
        <div>
          <el-input class="input" placeholder="请输入账套" v-model="Login1"></el-input>
        </div>

        <div>
          <el-input class="input" placeholder="请输入用户名用户名" v-model="Login2"></el-input>
        </div>

        <div>
          <el-input class="input" placeholder="请输入密码" v-model="Login3" show-password></el-input>
        </div>

        <div style="margin:-5px 0 0 30px">
          <el-button
            @click="signin"
            class="button1"
            type="primary"
            v-model="Pwd"
            style="width:180px"
          >登录</el-button>
        </div>
      </div>
      <img class="img1" src="../../../static/img/2.png" alt="建筑" />
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
  import api from "../../axios/api";
  export default {
    name: "Login",
    data() {
      return {
        Login1: "",
        Login2: "",
        Login3: "",
        Pwd: ""
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
=======
import api from "../../axios/api";
export default {
  name: "Login",
  data() {
    return {
      Login1: "",
      Login2: "",
      Login3: "",
      Pwd: ""
    };
  },
>>>>>>> 17888d97eed5d58c858d85a3b1ed76838b20f591

  methods: {
    signin() {
      let that = this;
      this.$post(this.api.userSignin, {
        AccountCode: "1",
        Login: "xt",
        Pwd: "123456"
      }).then(res => {
        if (res.data.State === 200) {
          sessionStorage.setItem("Token", res.data.Data.UserInfo.Token);
          sessionStorage.setItem("AccountID", res.data.Data.AccountID);
          that.$router.push({ path: "/Index" });
        } else {
          this.$message.error(res.data.Msg);
        }
      });
      // if (this.Login == "" || this.Pwd == "") {
      //   this.$message({
      //     message: "参数不能为空",
      //     type: "warning"
      //   });
      //   return false;
      // }
      //

      // this.loading = true;
    }
  }
};
</script>

<style scoped>
.input {
  margin: 25px;
  width: 256px;
  height: 7px;
}
.img1 {
  width: 256px;
  height: auto;
}
.button1 {
  width: 256px;
  margin: 25px;
}
.leftInput1 {
  float: left;
  margin: 0 40px 0 0;
}
.Login {
  background-color: white;
  width: 680px;
  height: 250px;
  padding: 50px 0px 40px 50px;
  border-radius: 10px;
  z-index: 1;
  position: relative;
  top: calc(50% - 180px);
  left: calc(50% - 340px);
}
.back {
  z-index: 0;
  position: absolute;
  width: 100%;
  height: 722px;
}

.box {
  width: 100%;
  height: 100%;
  background: url("../../../static/img/1.png");
  background-size: cover;
  min-width: 1366px;
  min-height: 768px;
  position: absolute;
}
.imgback {
  width: 100%;
  position: absolute;
  height: 100%;
}
p {
  margin: 1px;
  font-size: 22px;
}
</style>

