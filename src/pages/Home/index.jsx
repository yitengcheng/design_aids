import React, { useEffect } from "react";
import useStateRef from "react-usestateref";
import styles from "./index.module.css";
import { Layout, Menu, Spin, Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { menus } from "../../routers";
import { useRecoilState } from "recoil";
import { isLoading } from "../../recoil/atom";
import { DEFAULT_APPNAME } from "../../constant";
import { removeStorage } from "../../localStorage";

const HomeIndex = () => {
  const { Header, Content } = Layout;
  const [loading] = useRecoilState(isLoading);
  const [currentKey, setCurrentKey, currentKeyRef] = useStateRef("item-1");
  const navigator = useNavigate();

  const logout = () => {
    removeStorage("token");
    removeStorage("userInfo");
    navigator("/");
  };
  const clickMenu = ({ item, key }) => {
    setCurrentKey(key);
    navigator(item?.props?.path);
  };

  return (
    <Spin spinning={loading} tip="加载中。。。">
      <Layout style={{ height: "100vh" }}>
        <Header className={styles.site_layout_header} style={{ backgroundColor: "#fff" }}>
          <div className={styles["logo_box"]}>
            <div>{DEFAULT_APPNAME}</div>
          </div>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["0"]}
            selectedKeys={[currentKeyRef.current]}
            onClick={clickMenu}
            style={{ width: "55vw" }}
            items={menus}
          />
        </Header>
        <Content className={styles.container}>
          <Outlet />
        </Content>
      </Layout>
    </Spin>
  );
};

export default HomeIndex;
