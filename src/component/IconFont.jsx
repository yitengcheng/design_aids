import React from "react";
import { createFromIconfontCN } from "/srcant-design/icons";
import { API_URL } from "../constant";

const IconFont = ({ type, onClick, size = 24 }) => {
  const IconFont = createFromIconfontCN({
    scriptUrl: `${API_URL}/js/iconfont.js`,
  });
  return onClick ? (
    <div
      onClick={() => {
        onClick && onClick();
      }}
    >
      <IconFont style={{ fontSize: size }} type={type} />
    </div>
  ) : (
    <IconFont style={{ fontSize: size }} type={type} />
  );
};

export default IconFont;
