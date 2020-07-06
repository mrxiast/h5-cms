<template>
  <div>
    <!-- <Upload name="file" accept=".xls, .xlsx" showUploadList="{false}" customRequest="{upload}">
      <span class="{cns(style.btn," style.import)}>
        <img src="{importPNG}" />
        <span>导入数据</span>
      </span>
    </Upload>-->
    <el-upload
      name="file"
      accept=".xls, .xlsx"
      action="https://jsonplaceholder.typicode.com/posts/"
      :before-upload="upload"
    >
      <el-button size="small" type="primary">导入数据</el-button>
    </el-upload>
  </div>
</template>

<script>
import XLSX from "xlsx";
export default {
  data() {
    return {};
  },
  methods: {
    upload(e) {
      console.log(e, "ee");
      const f = e;
      //   console.log(f, "fff");
      const reader = new FileReader(); // 使用 FileReader 读取数据
      reader.onload = function(e) {
        // 数据读取完成后的回调函数
        let wordObj = {};

        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" }); // workbook 是 xlsx 解析 excel 后返回的对象

        const firstSheetName = workbook.SheetNames[0]; // 获取第一个 sheet 的名字
        const worksheet = workbook.Sheets[firstSheetName]; // 获取第一个 sheet 的内容
        const res = XLSX.utils.sheet_to_json(worksheet); // 使用 utils 里的方法转换内容为便于使用的数组
        // 下面就是自己对数组进行操作就行了
        console.log(res, "ressssssss");
        const list = res.map(item => {
          return {
            keyword: item.keyword,
            weight: item.weight
          };
        });
        console.log(list, "list");

        wordObj.setKeys([...wordObj.keys, ...list]);
        console.log(wordObj, "wordObjwordObj");
      };
      reader.readAsArrayBuffer(f); // 读取数据
    }
  }
};
</script>
