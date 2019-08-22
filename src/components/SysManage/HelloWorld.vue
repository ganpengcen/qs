<template>
  <div>
    <Header title="系统管理" text="词典管理"></Header>
    <div class="adbt">
      <el-button type="text" @click="dg1=true">词典类型+</el-button>
    </div>
    <el-tabs tab-position="left" v-model="editableTabsValue" closable @tab-remove="removeTab" @tab-click="GGG">
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="index"
        :label="item.DictName"
        :name="index"
      >
        <div
          style="height: 32px;background-color: white;margin-bottom: 15px;border-radius: 3px;padding: 10px 0px"
        >
          <el-button
            type="primary"
            @click="addPage=true"
            size="small"
            style="float: right;margin-right: 20px"
          >新增项</el-button>
        </div>
        <el-table :data="select" border>
          <el-table-column></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Header from "../assembly/Header";
export default {
  components: {
    Header
  },
  data() {
    return {
      editableTabsValue: "",
      select:[],
      editableTabs: [
        { DictName: "Tab 1", ID: "1", },
        { DictName: "Tab 2", ID: "2", },
        { DictName: "Tab 3", ID: "3", },
        { DictName: "Tab 4", ID: "4", },
        { DictName: "Tab 5", ID: "5", },
        { DictName: "Tab 6", ID: "6", },
        { DictName: "Tab 7", ID: "7", },
        { DictName: "Tab 8", ID: "8", },
        { DictName: "Tab 9", ID: "9", },
        { DictName: "Tab 10", ID: "10", },
        { DictName: "Tab 11", ID: "11", },
        { DictName: "Tab 12", ID: "12", },
        { DictName: "Tab 13", ID: "13", },
        { DictName: "Tab 14", ID: "14", },
        { DictName: "Tab 15", ID: "15", },
        { DictName: "Tab 16", ID: "16", },
        { DictName: "Tab 17", ID: "17", },
        { DictName: "Tab 18", ID: "18", },
        { DictName: "Tab 19", ID: "19", },
        { DictName: "Tab 20", ID: "20", }
      ],
      tabIndex: 2
    };
  },
  methods: {
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    GGG(){
      console.log(this.editableTabsValue)
    },
    getDict() {
      this.$get(this.api.Dict.getDictTypeItems).then(res => {
        if (res.data.State === 200) {
          console.log(res.data.Data)
           this.editableTabs = res.data.Data;
           this.editableTabsValue=res.data.Data[0].ID
           console.log(this.editableTabsValue)
          // try {
          //   this.parentID = res.data.Data[0].ID;
          //   this.getDictsPage();
          // } catch (err) {
          //   console.log(err);
          // }
        } else {
          this.$message("失败");
        }
      });
    }
  },
  created() {
    this.getDict();
  } //获取词典类型
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.info {
  background: #fff;
  padding: 15px;
}
.el-tabs {
  width: calc(100% - 50px);
  margin: 15px 0 0 25px;
  height: calc(100vh - 279px);
}
.el-input,
.el-textarea {
  width: 70%;
}
.el-table {
  margin-bottom: 15px;
}
.main {
  overflow: auto;
  margin-left: 25px;
  height: calc(100% - 125px);
}
.content {
  overflow: hidden;
  height: 100%;
}
.place {
  height: 1px;
  display: block;
}
.table-footer .el-pagination {
  text-align: right !important;
}
.table-footer {
  margin-top: 15px;
  height: 31px;
  line-height: 35px;
  background-color: white;
}
div >>> .el-tabs__header {
  background-color: #fff;
}
</style>
