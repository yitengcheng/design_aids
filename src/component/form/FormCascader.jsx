import { Form, Cascader } from "antd";
import React from "react";

const FormCascader = (props) => {
  const { label, name, required = true, rule = [], placeholder, options = [] } = props;
  const place = placeholder ?? `请选择${label}`;
  return (
    <Form.Item label={label} name={name} rules={[{ required }, ...rule]}>
      <Cascader allowClear options={options} placeholder={place} />
    </Form.Item>
  );
};
export default FormCascader;
