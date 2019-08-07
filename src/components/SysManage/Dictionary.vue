<template>
  <div class="content">
    <Header title="系统管理" text="词典管理"></Header>
    <div class="adbt">
      <el-button type="text" @click="dg1=true">词典类型+</el-button>
      <el-dialog title="新建类型" :visible.sync="dg1">
        <el-form>
          <el-form-item label="名称">
            <el-input v-model="tyname"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dg1= false">取 消</el-button>
          <el-button type="primary" @click="dg1 = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="main">
      <div class="tbs">
        <el-tabs tab-position="left" closable>
          <el-tab-pane v-for="(i,e) in select" :key="e" :label="i.title">
            <el-table :data="i.table" height="calc(100vh - 300px)">
              <el-table-column prop="name" label="名称"></el-table-column>
              <el-table-column prop="Remarks" label="备注"></el-table-column>
              <el-table-column label="操作">
                <el-button type="text" @click="dg2=true">修改</el-button>
                <el-dialog width="30%" title="修改词典项" :visible.sync="dg2" :append-to-body="true">
                  <el-form>
                    <el-form-item label="名称">
                      <el-input v-model="wname"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                      <el-input v-model="txra" type="textarea" :rows="3"></el-input>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dg2= false">取 消</el-button>
                    <el-button type="primary" @click="dg2 = false">确 定</el-button>
                  </span>
                </el-dialog>
                <el-button type="text">删除</el-button>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="place"></div>
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
      dg1: false,
      dg2: false,
      tyname: "",
      wname:'',
      txra:'',
      select: [
        {
          title: "asdasas",
          table: [
            { name: "asdtfc", Remarks: "as4656" },
            { name: "asdtfc", Remarks: "as4656" },
            { name: "asdtfc", Remarks: "as4656" },
            { name: "asdtfc", Remarks: "as4656" },
            { name: "asdtfc", Remarks: "as4656" },
            { name: "asdtfc", Remarks: "as4656" },
            { name: "asdtfc", Remarks: "as4656" },
            { name: "asdtfc", Remarks: "as4656" },
            { name: "asdtfc", Remarks: "as4656" },
            { name: "asdtfc", Remarks: "as4656" },
            { name: "asdtfc", Remarks: "as4656" },
            { name: "asdtfc", Remarks: "as4656" },
          ]
        },
        { title: "asdasas", table: [{ name: "a1231fc", Remarks: "as4123" }] },
        { title: "asdasas", table: [{ name: "asdtfc", Remarks: "as4656" }] },
        { title: "asdasas", table: [{ name: "asdtfc", Remarks: "as4656" }] },
        { title: "asdasas", table: [{ name: "asdtfc", Remarks: "as4656" }] },
        { title: "asdasas", table: [{ name: "asdtfc", Remarks: "as4656" }] },
        { title: "asdasas", table: [{ name: "asdtfc", Remarks: "as4656" }] },
        { title: "asdasas", table: [{ name: "asdtfc", Remarks: "as4656" }] },
        { title: "asdasas", table: [{ name: "asdtfc", Remarks: "as4656" }] },
        { title: "asdasas", table: [{ name: "asdtfc", Remarks: "as4656" }] },
        { title: "asdasas", table: [{ name: "asdtfc", Remarks: "as4656" }] },
        { title: "asdasas", table: [{ name: "asdtfc", Remarks: "as4656" }] },
        { title: "asdasas", table: [{ name: "asdtfc", Remarks: "as4656" }] },
        { title: "asdasas", table: [{ name: "asdtfc", Remarks: "as4656" }] },
        { title: "asdasas", table: [{ name: "asdtfc", Remarks: "as4656" }] },
        { title: "asdasas", table: [{ name: "asdtfc", Remarks: "as4656" }] },
        { title: "asdasas", table: [{ name: "asdtfc", Remarks: "as4656" }] },
        { title: "asdasas", table: [{ name: "asdtfc", Remarks: "as4656" }] },
        { title: "asdasas", table: [{ name: "asdtfc", Remarks: "as4656" }] },
        { title: "asdasas", table: [{ name: "asdtfc", Remarks: "as4656" }] },
        { title: "asdasas", table: [{ name: "asdtfc", Remarks: "as4656" }] },
        { title: "asdasas", table: [{ name: "asdtfc", Remarks: "as4656" }] },
        { title: "asdasas", table: [{ name: "asdtfc", Remarks: "as4656" }] },
        { title: "asdasas", table: [{ name: "asdtfc", Remarks: "as4656" }] },
      ]
    };
  }
};
</script>
<style scoped>
.el-tabs {
  width: 96%;
  margin: 15px 0 0 25px;
  height: calc(100vh - 300px)
}
.el-input,.el-textarea{
  width: 70%
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
</style>
