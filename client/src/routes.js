import NewTodo from "./component/modals/NewTodo";
import NewGroup from "./component/modals/NewGroup";
import Members from "./component/modals/Members";

const routes = [
  { path: "/newtodo", exact: true, name: "newtodo", component: NewTodo },
  { path: "/newgroup", exact: true, name: "newgroup", component: NewGroup },
  { path: "/members", exact: true, name: "üyeler", component: Members },
];

export default routes;
