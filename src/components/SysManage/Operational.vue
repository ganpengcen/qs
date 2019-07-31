<template>
    <div>
     <Header title="系统管理" text="操作日志"></Header>
    <div class="main">
        <div class="top">
            <form action="">
                <p class="datepick">开始日期</p><el-date-picker v-model="date1" size="medium" placeholder="选择日期"></el-date-picker>
                <p class="datepick">结束日期</p><el-date-picker v-model="date2" size="medium" placeholder="选择日期"></el-date-picker>
                <div class="kwrd">
                    <p class="impt">关键词</p>
                    <el-input size="medium" placeholder="请输入关键词" v-model="kwd"></el-input>
                    <el-dropdown trigger="click" split-button type="primary" size="medium">
                        查询
                        <el-dropdown-menu>
                            <el-dropdown-item>删除指定时间</el-dropdown-item>
                            <el-dropdown-item>删除指定用户</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>                    
            </form>
        </div>
        <div class="subject">
            <el-table :data="tableData" border :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
                <el-table-column label="日期" prop="date"></el-table-column>
                <el-table-column label="操作人" prop='Operator'></el-table-column>
                <el-table-column label="操作结果" prop='Structure'></el-table-column>
                <el-table-column label="日志内容" prop="log">
                    <el-button type="text" @click="dialogVisible=true">查看</el-button>
                    <el-dialog :visible.sync="dialogVisible" :append-to-body='true'></el-dialog>
                </el-table-column>
                <el-table-column label='操作' prop="operation"><el-button type="text" @click="open()">删除</el-button></el-table-column>
            </el-table>
            <div class="page">
                <el-pagination layout="prev,pager,next" :total="tableData.length" page-size.sync="5"></el-pagination>
            </div>
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
    data(){
        return {
            tableData:[
               {date:'2019-07-30',Operator:'',Structure:'成功',log:'1111111',operation:''},
               {date:'2019-07-30',Operator:'',Structure:'成功',log:'1111111',operation:''},
               {date:'2019-07-30',Operator:'',Structure:'成功',log:'1111111',operation:''},
               {date:'2019-07-30',Operator:'',Structure:'成功',log:'1111111',operation:''},
               {date:'2019-07-30',Operator:'',Structure:'成功',log:'1111111',operation:''},
            ],
            dialogVisible:false,
            date1:'',
            date2:'',
            kwd:''
        }
    },
    methods:{
        open(){
            this.$confirm('确定要删除该条记录吗？','提示',{confirmButtonText:'确定',cancelButtonText:'取消',type:'warning'})
            .then(()=>{
                this.$message({
                    type:'success',
                    message:'删除成功'
                })
            }).catch(()=>{
                this.$message({
                    type:'info',
                    message:'已取消删除'
                })
            })
        }
    }
}
</script>
<style scoped>
.el-pagination{
    text-align: center;
    margin-top: 15px;
}
.main{
    background-color: #fff;
    margin: 26px;
    width: 90%
}
.top{
    text-align: left;
    padding: 10px 20px;
    border-top: 2px solid #409eff;
    border-radius:0.5rem 0.5rem 0 0;
}
.datepick{
    display: inline-block;
    padding: 0 10px 0 10px;
}
.kwrd{
    float: right;
}
.datepick,.kwrd{
    font-size: 14px;
}
.impt,.el-input{
    padding-right: 8px;
}
.impt,.el-input{
    display: inline-block
}
.el-input{
    width: 150px;
}
.subject{
    margin-top: 20px;
}
</style>
