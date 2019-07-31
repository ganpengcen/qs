<template>
  <div class="header">
    <p>{{ title }} <span class="el-icon-arrow-right"></span><span>{{ text }}</span></p>
    <div class="tabs header-tabs">
      <el-tag
        v-for="(tag, index) in this.$store.state.tags"
        :key="tag.name"
        closable
        @close="handleClose(tag, index)"
        :type="tag.type"
        @click.native="handleClick(tag.name, tag.currentPath)"
        :class="{ active: tag.active }">
        {{tag.name}}
      </el-tag>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'headerTitle',
    props: {
      title: String,
      text: String
    },
    data() {
      return {
        currentView: '1'
      }
    },
    mounted(){
          console.log("tag",this.$store.state.tags);
    },
    methods: {
      handleClick(name, path) {
        console.log("tag",this.$store.state.tags);
        this.$store.commit('changeCheckMenu', false);
        this.$router.push({ path: path })
      },
      handleClose(tag, index) {
        if(tag.currentPath == this.$route.path) {
          //删除当前页操作
        }
        this.$store.commit('deleteTag', index);
      }
    }
  }
</script>
<style scoped>
  .header {
    height: 60px;
    margin: 15px 25px 11px;
    padding: 0 20px;
    background: #fff;
    border: 1px solid #f1f1f1;
  }
  .header p {
    font-size: 22px;
    display: inline-block;
    color: #303133;
    margin-top: 18px;
    font-family: "FZLTXHK--GBK1";
    font-family:"微软雅黑"

  }
  .header p span {
    font-size: 18px;
  }
  div.tabs {
    display: inline-block;
  }
  .header-tabs .el-tag {
    cursor: pointer;
    background: none;
    margin: 0 5px;
  }
  .active {
    background: rgba(64,158,255,.1)!important;
  }
</style>
