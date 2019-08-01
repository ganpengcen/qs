<template>
    <div>
        <Header title="系统管理" text="词典管理"></Header>
        <div class="main">
            <div class="adbt">
                <el-button type="text">词典类型+</el-button>
            </div>
            <el-tabs tab-position="left" closable>
                <el-tab-pane v-for="(i,e) in select" :key="e" :label="i.title">
                    <el-table :data="i.table">
                        <el-table-column prop="name" label="名称"></el-table-column>
                        <el-table-column prop="Remarks" label="备注"></el-table-column>
                        <el-table-column label="操作">
                            <el-button type="text">修改</el-button>
                            <el-button type="text">删除</el-button>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import Header from "../assembly/Header";
export default {
  components: {
    Header
  },
    data(){
        return {
            select:[
                {title:'asdasas',table:[
                    {name:'asdtfc',Remarks:'as4656'}
                ]},
                {title:'asdasas',table:[
                    {name:'a1231fc',Remarks:'as4123'}
                ]},
                {title:'asdasas',table:[
                    {name:'asdtfc',Remarks:'as4656'}
                ]},
                {title:'asdasas',table:[
                    {name:'asdtfc',Remarks:'as4656'}
                ]},
                {title:'asdasas',table:[
                    {name:'asdtfc',Remarks:'as4656'}
                ]},
                {title:'asdasas',table:[
                    {name:'asdtfc',Remarks:'as4656'}
                ]},
            ]
        }
    }
}
</script>
<style scoped>
.main{
    margin-left:25px;
}
.el-tabs{
    width: 96%;
    margin:15px 0 0 25px;
}
</style>
