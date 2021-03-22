<template>
  <div class="container">
    <a-form class="upload-exca-container" ref="form" :model="form">
      <a-form-item>
        <a-upload-dragger
          class="upload-demo"
          action=""
          multiple
          accept=".xls,.xlsx"
          :auto-upload="false"
          @change="handleChange"
          :show-file-list="false"
        >
          <p class="ant-upload-drag-icon">
            <a-icon type="inbox" />
          </p>
          <p class="ant-upload-text">将文件拖到此处，或<em>点击上传</em></p>
          <p class="ant-upload-hint">
            只能上传xlsx/xls文件，且不超过 {{ fileMaxSize }}MB
          </p>
        </a-upload-dragger>
      </a-form-item>
      <a-form-item>
        <a :href="templateHref" :download="templateName"> 下载模板 </a>
      </a-form-item>
      <a-form-item>
        <a-table
          :columns="notesCols"
          :dataSource="tableData"
          :cell-class-name="cellClassName"
        >
        </a-table>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import XLSX from "xlsx";

/**
 * 读取本地EXCEL文件
 * @param {File} file
 * @return {Promise}
 */
const readWorkbookFromLocalFile = (file) => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, { type: "binary" });
      resolve(workbook);
    };
    reader.readAsBinaryString(file);
  });
};

const keywordValidator = (cellValue, row) => {
  const validResult = { valid: true };
  if (!cellValue) {
    return validResult;
  }
  const { question, answer } = cellValue;
  if (!question && answer) {
    return { valid: false, msg: "没有问题的异常答案！" };
  }
  if (question && question.length > 25) {
    return { valid: false, msg: "问题不能超过25个字！" };
  }
  if (answer && answer.length > 25) {
    return { valid: false, msg: "答案不能超过25个字！" };
  }
  return validResult;
};
const notesCols = [
  {
    dataIndex: "author",
    title: "笔记作者",
    required: true,
  },
  {
    dataIndex: "version",
    title: "笔记版本号",
    required: true,
  },
  {
    dataIndex: "sequence",
    title: "笔记序号",
    dataType: Number,
    invalidMsg: "序号应该是个数字！",
  },
  {
    dataIndex: "title",
    title: "笔记问题",
    required: true,
  },
  {
    dataIndex: "explanation",
    title: "笔记正文",
    required: true,
  },
  {
    dataIndex: "needImage",
    title: "正文是否需要照片",
    required: true,
    valueMap: {
      是: true,
      否: false,
    },
  },
  {
    dataIndex: "lvOne",
    title: "来源1",
    required: true,
  },
  {
    dataIndex: "lvSec",
    title: "来源2",
    required: true,
  },
  {
    dataIndex: "lvThi",
    title: "来源3",
  },
  {
    dataIndex: "lvFou",
    title: "来源4",
  },
  {
    dataIndex: "labels",
    title: "笔记标签",
  },
];
const keywordCols = Array(15)
  .fill("-")
  .map((char, i) => ({
    dataIndex: "keyword" + (i + 1),
    title: `问答${i + 1}`,
    width: 200,
    validator: keywordValidator,
  }));
export default {
  data() {
    const templateName = "笔记上传样例.xlsx";
    return {
      form: {},
      // 限制文件大小 MB
      fileMaxSize: 5,
      templateName,
      templateHref: `templates/${templateName}`,
      tableData: [],
    };
  },
  computed: {
    notesCols() {
      const { tableData } = this;
      if (tableData.length === 0) {
        return [...notesCols];
      } else {
        // arr中存放每一行关键词的数量
        const arr = tableData.map((row) => {
          const keywords = Object.keys(row).filter((cell) =>
            cell.startsWith("keyword")
          );
          return keywords.length;
        });
        return [
          ...notesCols,
          ...keywordCols.slice(0, Math.max.apply(null, arr)),
        ];
      }
    },
    disableSubumit() {
      if (this.tableData.length === 0) {
        return true;
      }
      const invalid = this.tableData.some(
        (row) => Object.keys(row.invalidMsg).length > 0
      );
      return invalid;
    },
  },
  methods: {
    cellClassName({ row, column, rowIndex, columnIndex }) {
      const hasErrorMsg = row.invalidMsg[column.property];
      return hasErrorMsg ? "error-msg-cell" : "";
    },
    handleChange({ file, fileList }) {
      const isXls = file.name.endsWith(".xls") || file.name.endsWith(".xlsx");
      const isLt = file.size / 1024 / 1024 < this.fileMaxSize;
      if (!isXls || !isLt) {
        this.$message({
          message: "请选择Excel文件！",
          type: "error",
        });
        return;
      }
      readWorkbookFromLocalFile(file.originFileObj).then((workbook) => {
        const sheetNames = workbook.SheetNames; // 工作表名称集合
        const worksheet = workbook.Sheets[sheetNames[0]]; // 这里我们只读取第一张sheet
        const tableData = [];
        debugger;
        // todu：
        // 解析 EXCEL 工作表数据 worksheet；
        // 组装成所需的 tableData

        this.tableData = tableData;
      });
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}

/* 导入数据时，表格中有错误的单元格 */
.error-msg-cell {
  background-color: #fef0f0 !important;
  border-color: #fde2e2 !important;
  color: #f56c6c !important;
}
.empty-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.empty-wrapper::after {
  content: "empty";
  display: block;
  width: 100%;
  color: transparent;
}
</style>

