<template>
  <div class="hello">
    <el-tabs v-model="editableTabsValue" type="card" tab-position="left" closable>
  <el-tab-pane
    v-for="(item, index) in select"
    :key="index"
    :label="item.title"
    :name="item.name"
  >
    {{item.content}}
  </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data(){
    return {
      editableTabsValue: "1",
      tabIndex: 1,
      select: [
        { title: "1", name: "1", content: "1" },
        { title: "2", name: "2", content: "2" },
        { title: "3", name: "3", content: "3" },
        { title: "4", name: "4", content: "4" },
        { title: "5", name: "5", content: "5" },
        { title: "6", name: "6", content: "6" },
        { title: "7", name: "7", content: "7" },
        { title: "8", name: "8", content: "8" },
        { title: "9", name: "9", content: "9" },
        { title: "10", name: "10", content: "10" },
        { title: "11", name: "11", content: "11" },
        { title: "12", name: "12", content: "12" },
        { title: "13", name: "13", content: "13" },
        { title: "14", name: "14", content: "14" },
        { title: "15", name: "15", content: "15" },
        { title: "16", name: "16", content: "16" },
        { title: "17", name: "17", content: "17" },
        { title: "18", name: "18", content: "18" },
        { title: "19", name: "19", content: "19" },
        { title: "20", name: "20", content: "20" },
        { title: "21", name: "21", content: "21" },
        { title: "22", name: "22", content: "22" },
        { title: "23", name: "23", content: "23" },
        { title: "24", name: "24", content: "24" }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-tabs{
  height: 500px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
