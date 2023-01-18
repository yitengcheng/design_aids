import user from "./user";
import scriptMenu from "./scriptMenu";
import projectManagement from "./projectManagement";

const apis = {
  ...user,
  ...scriptMenu,
  ...projectManagement,
};

export default apis;
