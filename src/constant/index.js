export const DEFAULT_APPNAME = "智慧员工设计器";

const dev_url = "http://localhost:3000";
const build_url = "";

export const API_URL = process.env.NODE_ENV == "development" ? dev_url : build_url;

export const ENGINE_KERNEL = [
  { label: "火狐内核", value: 1 },
  { label: "谷歌内核", value: 2 },
];
