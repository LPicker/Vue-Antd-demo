<template>
  <div>
    <a-table :columns="columns" :data-source="data" bordered> </a-table>
  </div>
</template>

<script>
const data = [];
for (let i = 0; i < 100; i++) {
  const row = {
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  };
  if (i === 0) {
    row.children = [
      {
        key: `child_${i.toString()}`,
        name: `扩展001`,
        age: 32,
        address: `扩展001`,
      },
    ];
  }
  data.push(row);
}
export default {
  data() {
    this.cacheData = data.map((item) => ({ ...item }));
    const href = "baidu.com";
    return {
      data,
      columns: [
        {
          title: "name",
          dataIndex: "name",
          width: "25%",
          customRender: (text, record, index) => {
            let cellText = text;
            if (record.key.indexOf("child") > -1) {
              // 扩展行
              // cellText = <a href="href">{cellText}</a>;
              // cellText = this.$createElement("a", {
              //   attrs: { href: "/" + record.projectType }
              // }, text);
              cellText = this.$createElement(
                "router-link",
                {
                  props: {
                    to: {
                      path: "/" + record.projectType,
                      query: { id: "123" },
                    },
                  },
                },
                text
              );
            }
            return cellText;
          },
        },
        {
          title: "age",
          dataIndex: "age",
          width: "15%",
        },
        {
          title: "address",
          dataIndex: "address",
          width: "40%",
        },
      ],
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
