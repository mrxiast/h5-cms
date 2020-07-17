<template>
  <div>
    <el-card>产品列表</el-card>
    <el-card>
      <div>
        <el-button @click="showAddModal" type="primary">添加商品</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%;margin-top:10px;">
        <el-table-column type="index" width="50" align="center"></el-table-column>
        <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
        <el-table-column label="商品图片" align="center">
          <template slot-scope="scope">
            <div class="img-box demo-image__preview">
              <el-image
                class="table-img"
                :src="scope.row.picture_url"
                :preview-src-list="scope.row.pictureList"
              ></el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="商品简介" align="center"></el-table-column>
        <el-table-column prop="price" label="商品原价" align="center"></el-table-column>
        <el-table-column prop="new_price" label="商品现价" align="center"></el-table-column>
        <el-table-column prop="type" label="商品类型" align="center" :formatter="filterType"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="small">编辑</el-button>
            <el-button @click="deleItem(scope.row)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="添加商品" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form
          :model="addForm"
          :rules="rules"
          ref="addForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="商品类型" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品图片" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品原价" prop="inPice">
            <el-input v-model="addForm.price"></el-input>
          </el-form-item>
          <el-form-item label="商品现价" prop="salePice">
            <el-input v-model="addForm.new_price"></el-input>
          </el-form-item>
          <el-form-item label="商品类型" prop="type">
            <el-input v-model="addForm.type"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitAdd">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog :visible.sync="showDel" width="30%" :before-close="handleClose">
        <span>确定删除此条内容</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showDel = false">取 消</el-button>
          <el-button type="primary" @click="isDel">确 定</el-button>
        </span>
      </el-dialog>
      <div style="display:flex;justify-content:flex-end;margin-top:15px;">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getListApi } from "./api";
export default {
  data() {
    return {
      delId: "",
      showDel: false,
      addForm: {
        name: "",
        new_price: "",
        price: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" }
        ],
        inPice: [
          { required: true, message: "请输入商品进价", trigger: "change" }
        ],
        salePice: [
          { required: true, message: "请输入商品卖价", trigger: "change" }
        ],
        type: [{ required: true, message: "请输入商品类型", trigger: "change" }]
      },
      dialogVisible: false,
      tableData: [],
      searchInfo: {
        pageSize: 10,
        pageNum: 1,
        type: 0
      },

      total: 0,
      type: 1 //1是添加2是编辑
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getList();
    },
    //获取默认列表
    getList() {
      getListApi(this.searchInfo).then(res => {
        if (res.code === 200) {
          this.tableData = res.result.list;
          for (let i = 0; i < this.tableData.length; i++) {
            let pictureList = [];
            pictureList.push(this.tableData[i].picture_url);
            this.$set(this.tableData[i], "pictureList", pictureList);
          }
          this.total = res.result.total;
        }
      });
    },
    //显示类型
    filterType(row, column) {
      let typeValue = "";
      switch (row.type) {
        case 1:
          typeValue = "电子产品";
          break;
        case 2:
          typeValue = "时尚衣装";
          break;
        case 3:
          typeValue = "精美包包";
          break;
        case 4:
          typeValue = "轻松跑鞋";
          break;
        case 5:
          typeValue = "奢侈饰品";
          break;
        case 6:
          typeValue = "廉价文具";
          break;
        default:
          typeValue = "未知";
          break;
      }
      return typeValue;
    },
    showAddModal() {
      this.type = 1;
      this.dialogVisible = true;
      this.addForm = {};
      // this.$refs["addForm"].resetFields();
    },
    handleClick(row) {
      this.type = 2;
      this.addForm = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.dialogVisible = false;
    },
    isDel() {
      del({ _id: this.delId }).then(res => {
        if (res.code === 200) {
          this.$message.success("删除成功");
          this.showDel = false;
          this.init();
        }
      });
    },
    deleItem(e) {
      this.delId = e._id;
      this.showDel = true;
    },
    submitAdd() {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          if (this.type === 1) {
            add(this.addForm).then(res => {
              if (res.code === 200) {
                this.$message.success(res.message);
                this.dialogVisible = false;
                this.addForm = {};
                this.$refs["addForm"].resetFields();
                this.init();
              }
            });
          } else {
            changeItem(this.addForm).then(res => {});
          }
        } else {
          return false;
        }
      });
    },
    handleCurrentChange(e) {
      this.searchInfo.pageNum = e;
      this.getList();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
