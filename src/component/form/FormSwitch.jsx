import { Form, Switch } from "antd";
import React from "react";

const FormSwitch = (props) => {
  const { label, name, required = true, rule = [], options = ["", ""] } = props;
  return (
    <Form.Item label={label} name={name} rules={[{ required }, ...rule]} valuePropName="checked">
      <Switch checkedChildren={options[0]} unCheckedChildren={options[1]} />
    </Form.Item>
  );
};

export default FormSwitch;
