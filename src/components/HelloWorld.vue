<template>
<div>
  <div>
    <el-button
      size="small"
      @click="addTab(editableTabsValue)"
    >
      add tab
    </el-button>
  </div>
  <el-tabs tab-position="left" v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
    <el-tab-pane
      v-for="(item, index) in editableTabs"
      :key="item.name"
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
  data() {
    return {
      editableTabsValue: '2',
        editableTabs: [
          {title: 'Tab 1',name: '1',content: 'Tab 1 content'},
          {title: 'Tab 2',name: '2',content: 'Tab 2 content'},
          {title: 'Tab 3',name: '3',content: 'Tab 3 content'},
          {title: 'Tab 4',name: '4',content: 'Tab 4 content'},
          {title: 'Tab 5',name: '5',content: 'Tab 5 content'},
          {title: 'Tab 6',name: '6',content: 'Tab 6 content'},
          {title: 'Tab 7',name: '7',content: 'Tab 7 content'},
          {title: 'Tab 8',name: '8',content: 'Tab 8 content'},
          {title: 'Tab 9',name: '9',content: 'Tab 9 content'},
          {title: 'Tab 10',name: '10',content: 'Tab 10 content'},
          {title: 'Tab 11',name: '11',content: 'Tab 11 content'},
          {title: 'Tab 12',name: '12',content: 'Tab 12 content'},
          {title: 'Tab 13',name: '13',content: 'Tab 13 content'},
          {title: 'Tab 14',name: '14',content: 'Tab 14 content'},
          {title: 'Tab 15',name: '15',content: 'Tab 15 content'},
          {title: 'Tab 16',name: '16',content: 'Tab 16 content'},
          {title: 'Tab 17',name: '17',content: 'Tab 17 content'},
          {title: 'Tab 18',name: '18',content: 'Tab 18 content'},
          {title: 'Tab 19',name: '19',content: 'Tab 19 content'},
          {title: 'Tab 20',name: '20',content: 'Tab 20 content'},
        ],
        tabIndex: 2
    };
  },
  methods: {
      addTab(targetName) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        this.editableTabsValue = newTabName;
      },
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
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-tabs {
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
