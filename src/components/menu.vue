<template>
  <a-menu
    mode="inline"
    :open-keys="openKeys"
    :selected-keys="selectedKeys"
    style="width: 256px"
    @openChange="onOpenChange"
  >
    <a-sub-menu key="sub1" @titleClick="handleTitleClick">
      <span slot="title"
        ><a-icon type="mail" /><span>Navigation One</span></span
      >
      <a-menu-item key="1"> Option 1 </a-menu-item>
      <a-menu-item key="2"> Option 2 </a-menu-item>
      <a-menu-item key="3"> Option 3 </a-menu-item>
      <a-menu-item key="4"> Option 4 </a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub2">
      <span slot="title"
        ><a-icon type="appstore" /><span>Navigation Two</span></span
      >
      <a-menu-item key="5"> Option 5 </a-menu-item>
      <a-menu-item key="6"> Option 6 </a-menu-item>
      <a-sub-menu key="sub3" title="Submenu">
        <a-menu-item key="7"> Option 7 </a-menu-item>
        <a-menu-item key="8"> Option 8 </a-menu-item>
      </a-sub-menu>
    </a-sub-menu>
    <a-sub-menu key="sub4">
      <span slot="title"
        ><a-icon type="setting" /><span>Navigation Three</span></span
      >
      <a-menu-item key="9"> Option 9 </a-menu-item>
      <a-menu-item key="10"> Option 10 </a-menu-item>
      <a-menu-item key="11"> Option 11 </a-menu-item>
      <a-menu-item key="12"> Option 12 </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script>
export default {
  data() {
    return {
      rootSubmenuKeys: ["sub1", "sub2", "sub4"],
      openKeys: ["sub1"],
      selectedKeys: [],
    };
  },
  methods: {
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    handleTitleClick({ key, domEvent }) {
      this.selectedKeys = [key];
      debugger;
      domEvent.preventDefault();
      domEvent.stopPropagation();
    },
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
