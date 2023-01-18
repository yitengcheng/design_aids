import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import locale from "antd/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home";
import { RecoilRoot } from "recoil";
import "../src/assets/css/reset.css";
import { theme } from "./assets/theme/theme";
import reportWebVitals from "./reportWebVitals";
import ScriptMenu from "./pages/ScriptMenu";

dayjs.locale("zh-cn");

const validateMessages = {
  required: "${label} 是必选字段",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ConfigProvider locale={locale} form={{ validateMessages }} theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index path="/scriptMenu" element={<ScriptMenu />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
