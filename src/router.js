import Vue from "vue";
import Router from "vue-router";

import Hello from "@/components/HelloWorld";
import Select from "@/components/select";
import Menu from "@/components/menu";
import TablePagination from "@/components/table-pagination";
import TableRowSpan from "@/components/table-rowspan";

Vue.use(Router);

export const routes = [
  {
    path: "/",
    name: "欢迎",
    component: Hello
  },
  {
    path: "/select",
    name: "Select",
    component: Select
  },
  {
    path: "/menu",
    name: "Menu",
    component: Menu
  },
  {
    path: "/table-pagination",
    name: "分页表格",
    component: TablePagination
  },
  {
    path: "/table-rowspan",
    name: "表格行合并",
    component: TableRowSpan
  }
];

const router = new Router({
  routes
});

export default router;
