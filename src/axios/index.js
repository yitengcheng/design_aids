import { message } from "antd";
import axios from "axios";
import { getStorage } from "../localStorage";

export const post = async (url, params) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${getStorage("token")}`;
  return new Promise((resolve, reject) => {
    axios
      .post(`/designerApi${url}`, params)
      .then((res) => {
        const { data } = res;
        if (data.code === 200) {
          data?.msg && message.success(data.msg);
          resolve(data.data);
          return;
        } else if (data.code === 401) {
          // window.location.href = "/";
          message.error(data.msg);
          return;
        } else {
          message.error(data?.msg);
          return;
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
