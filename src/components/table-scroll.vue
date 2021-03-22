<template>
  <div>
    <a-button-group>
      <a-button @click="toggleData">{{ btn1Text }}</a-button>
      <a-button @click="toggleScroll">{{ btn2Text }}</a-button>
    </a-button-group>
    <a-table bordered :columns="columns" :data-source="data" :scroll="scroll">
      <a slot="action" slot-scope="text">action</a>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: "Full Name",
    width: 100,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  { title: "Age", width: 100, dataIndex: "age", key: "age", fixed: "left" },
  { title: "Column 1", dataIndex: "address", key: "1", width: 150 },
  { title: "Column 2", dataIndex: "address", key: "2", width: 150 },
  { title: "Column 3", dataIndex: "address", key: "3", width: 150 },
  { title: "Column 4", dataIndex: "address", key: "4", width: 150 },
  { title: "Column 5", dataIndex: "address", key: "5", width: 150 },
  { title: "Column 6", dataIndex: "address", key: "6", width: 150 },
  { title: "Column 7", dataIndex: "address", key: "7", width: 150 },
  { title: "Column 8", dataIndex: "address", key: "8", width: 150 },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    scopedSlots: { customRender: "action" },
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

export default {
  data() {
    return {
      data,
      columns,
      scroll: { x: 1500, y: 300 },
    };
  },
  computed: {
    btn1Text() {
      const { data } = this;
      return data.length > 10 ? "减少数据" : "增加数据";
    },
    btn2Text() {
      const { y } = this.scroll;
      return y === 300 ? "移除垂直向滚动条" : "增加垂直向滚动条";
    },
  },
  methods: {
    toggleData() {
      if (this.data.length > 10) {
        this.data = data.slice(0, 4);
      } else {
        this.data = data;
      }
    },
    toggleScroll() {
      const { y } = this.scroll;
      if (y === 300) {
        this.scroll = { x: 1500 };
      } else {
        this.scroll = { x: 1500, y: 300 };
      }
    },
  },
};
</script>