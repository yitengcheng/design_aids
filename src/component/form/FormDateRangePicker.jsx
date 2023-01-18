import React from "react";
import { Form, DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import "dayjs/locale/zh-cn";
const { RangePicker } = DatePicker;

const FormDateRangePicker = (props) => {
  const { label, name, required = true, rule = [] } = props;
  return (
    <Form.Item label={label} name={name} rules={[{ required }, ...rule]}>
      <RangePicker locale={locale} allowClear />
    </Form.Item>
  );
};
export default FormDateRangePicker;
