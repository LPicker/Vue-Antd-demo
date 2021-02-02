<template>
  <a-table :columns="columns" :data-source="data" bordered>
    <template slot="name" slot-scope="text">
      <a>{{ text }}</a>
    </template>
  </a-table>
</template>

<script>
const data = [
  {
    key: "1",
    name: "John Brown",
    rowSpan: 3,
    age: 32,
    tel: "0571-22098909",
    phone: 18889898989,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "John Brown",
    rowSpan: 0,
    tel: "0571-22098333",
    phone: 18889898888,
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "John Brown",
    rowSpan: 0,
    age: 32,
    tel: "0575-22098909",
    phone: 18900010002,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 18,
    tel: "0575-22098909",
    phone: 18900010002,
    address: "London No. 2 Lake Park",
  },
  {
    key: "5",
    name: "Jake White",
    age: 18,
    tel: "0575-22098909",
    phone: 18900010002,
    address: "Dublin No. 2 Lake Park",
  },
];
export default {
  data() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        customRender: (text, row, index) => {
          return {
            children: text,
            attrs: {
              rowSpan: row.rowSpan,
            },
          };
        },
      },
      {
        title: "Age",
        dataIndex: "age",
      },
      {
        title: "Home phone",
        dataIndex: "tel",
      },
      {
        title: "Phone",
        dataIndex: "phone",
      },
      {
        title: "Address",
        dataIndex: "address",
      },
    ];
    return {
      data,
      columns,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
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
