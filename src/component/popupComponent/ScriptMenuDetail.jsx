import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Row, Space } from "antd";
import React, { useEffect } from "react";
import useStateRef from "react-usestateref";
import apis from "../../apis";
import { post } from "../../axios";
import { ENGINE_KERNEL } from "../../constant";
import FormInput from "../form/FormInput";
import FormSelect from "../form/FormSelect";
import lodash from "lodash";

const ScriptMenuDetail = (props) => {
  const { closeModal, detail, project } = props;
  const [detailForm] = Form.useForm();

  useEffect(() => {
    detail && detailForm.setFieldsValue({ name: detail?.name, remark: detail?.remark });
  }, [detail, detailForm]);
  useEffect(() => {
    async function fetchData() {
      project && (await initMenu());
    }
    fetchData();
  }, [project]);

  const handle = () => {
    detailForm.validateFields().then((values) => {
      let data = [];
      lodash.map(values.menus, (item) => {
        data.push({ name: item?.name, action: item?.action, icon: item?.icon });
      });
      post(apis.generateMenu, { engineKernel: values?.engineKernel, menus: data, project: project?._id }).then(
        (res) => {
          detailForm.resetFields();
          closeModal && closeModal();
          Modal.confirm({
            title: "提示",
            content: "是否前往进行预览",
            okText: "预览",
            cancelText: "不了，谢谢",
            onOk: () => {
              window.open(res?.url, "_blank");
            },
          });
        }
      );
    });
  };
  const initMenu = async () => {
    const menuScript = await post(apis.scriptMenuByProject, { project: project?._id });
    detailForm.setFieldsValue({ engineKernel: menuScript?.engineKernel, menus: menuScript?.menus });
  };

  return (
    <Form form={detailForm}>
      <FormSelect label="引擎内核" options={ENGINE_KERNEL} name="engineKernel" />
      <Form.List name="menus">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => {
              return (
                <Row key={field.key}>
                  <Space align="baseline" size="large">
                    <FormInput label="菜单名" name={[field.name, "name"]} />
                    <FormInput label="流程名" name={[field.name, "action"]} />
                    <FormInput required={false} label="图标" name={[field.name, "icon"]} />
                    <Form.Item>
                      <MinusCircleOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    </Form.Item>
                  </Space>
                </Row>
              );
            })}
            <Form.Item>
              <Button type="dashed" onClick={add} icon={<PlusOutlined />}>
                添加菜单选项
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Button type="primary" onClick={() => handle()}>
        提交
      </Button>
    </Form>
  );
};

export default ScriptMenuDetail;
