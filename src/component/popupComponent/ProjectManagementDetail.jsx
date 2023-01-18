import { Button, Form, Space } from "antd";
import React, { useEffect } from "react";
import useStateRef from "react-usestateref";
import apis from "../../apis";
import { post } from "../../axios";
import FormInput from "../form/FormInput";
import FormTextArea from "../form/FormTextArea";

const ProjectManagementDetail = (props) => {
  const { closeModal, refresh, detail } = props;
  const [detailForm] = Form.useForm();

  useEffect(() => {
    detail && detailForm.setFieldsValue({ name: detail?.name, remark: detail?.remark });
  }, [detail]);

  const handlePm = async () => {
    detailForm.validateFields().then((values) => {
      post(apis.handleProjectManagement, { id: detail?._id, ...values }).then(() => {
        detailForm.resetFields();
        refresh && refresh();
        closeModal && closeModal();
      });
    });
  };

  return (
    <Form form={detailForm}>
      <FormInput label="项目名称" name="name" />
      <FormTextArea label="备注" name="remark" required={false} />
      <Space>
        <Button
          type="primary"
          onClick={() => {
            handlePm();
          }}
        >
          确认
        </Button>
        <Button
          danger
          onClick={() => {
            detailForm.resetFields();
          }}
        >
          重置
        </Button>
      </Space>
    </Form>
  );
};

export default ProjectManagementDetail;
