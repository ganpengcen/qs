<template>
    <div>
        <Header title="系统管理" text="自定义项管理"></Header>
        <div class="main">
            <el-row>
                <el-col :span="4">
                    <div>
                        <p>自定义类型:</p>
                    </div>  
                    <div v-for="(i,e) in modifs" :key="e" >
                        <b @click="send(e)">{{i.title}}</b>
                        <el-button type="text">+</el-button>
                    </div>  
                </el-col>
                <el-col :span="18">
                    <el-table :data="shs" border :cell-style="{'text-align':'center'}" :header-cell-style="{'text-align':'center'}">
                        <el-table-column prop="tle" label="标题"></el-table-column>
                        <el-table-column prop="datype" label='数据类型'></el-table-column>
                        <el-table-column prop="dir" label='词典'></el-table-column>
                        <el-table-column label='是否多选'>
                            <template slot-scope="scope">
                                <el-checkbox disabled v-model="scope.row.mut"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column label="是否为空">
                            <template slot-scope="scope">
                                <el-checkbox disabled v-model="scope.row.ull"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <el-button type="text">修改</el-button>
                            <el-button type="text">删除</el-button>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>  
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
            modifs:[
                {title:'1',info:[{tle:'123',datype:'字符',dir:'',mut:true,ull:true,ord:'1',}]},
                {title:'2',info:[{tle:'124',datype:'字符',dir:'',mut:true,ull:false,ord:'1',}]},
                {title:'3',info:[{tle:'125',datype:'字符',dir:'',mut:false,ull:true,ord:'3',}]},
                {title:'4',info:[{tle:'1256',datype:'字符',dir:'',mut:true,ull:true,ord:'7',}]},
                {title:'5',info:[{tle:'129',datype:'字符',dir:'',mut:true,ull:true,ord:'5',}]},
            ],
            shs:[]
        }
    },
    methods:{
        send(e){
            this.shs=this.modifs[e].info
        }
    }
}
</script>
<style scoped>
.main{
    margin-left: 25px;
}
.el-col-4{
    background-color: #fff;
    text-align: center
}
.el-col-4 p,.el-col-5 b{
    font-size: 16px;
    font-weight: 500;
}
.el-col-4 b:hover{
    cursor: pointer;
}
.el-col-4 p{
    margin:5px 0 0 5px;
    text-align: left
}
.el-col-18{
    margin-left: 25px;
    width: 79.3%
}
</style>
