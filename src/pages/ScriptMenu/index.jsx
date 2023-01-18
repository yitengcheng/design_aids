import React, { useEffect } from "react";
import styles from "./index.module.css";
import useStateRef from "react-usestateref";
import ScriptMenuDetail from "../../component/popupComponent/ScriptMenuDetail";

const ScriptMenu = (props) => {
  return (
    <div className={["baseContainer", "baseBorder"].join(" ")}>
      <div className={styles.titleBox}>菜单设计器</div>
      <ScriptMenuDetail />
    </div>
  );
};

export default ScriptMenu;
