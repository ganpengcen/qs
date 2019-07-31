<template>
<div class='a22'> 
   <Header title="Dashboard" text="监控台"></Header>
    <div  class='a222'>
     
          <div class="left" >
              </div>
              <div class="left1" >
              </div>
    </div>
</div>
   
</template>

<script>
import Header from '../assembly/Header'
export default {
  components:{
    Header
  },
  mounted(){
     this.$init({ name: "Page", currentPath: this.$route.path, type: '', active: true });
  }
    
}
</script>

<style scoped>
.a22{
    height: 100%;
    background-color:white;
    overflow:hidden;
}
.a222{
    background-color:white;
    overflow-y:auto ;
    height: 80%;
}
.left{
  margin: 0 auto;
  text-align: center;
  width: 80%;
  height: 520px;
  background-color: aqua;
  background-size:100%;
  /* background-image: url("../../../static/img/10000.png") ; */
}
.left1{
  margin: 0 auto;
  text-align: center;
  width: 80%;
  height: 520px;
  background-color:red;
  background-size:100%;
  /* background-image: url("../../../static/img/10000.png") ; */
}
</style>

