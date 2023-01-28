import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Row, Space } from "antd";
import React, { useEffect } from "react";
import useStateRef from "react-usestateref";
import apis from "../../apis";
import { post } from "../../axios";
import { ENGINE_KERNEL, ENGINE_KERNEL_MENU } from "../../constant";
import FormInput from "../form/FormInput";
import FormSelect from "../form/FormSelect";
import lodash from "lodash";
import _ from "lodash";

const ScriptMenuDetail = (props) => {
  const { detail } = props;
  const [detailForm] = Form.useForm();

  useEffect(() => {
    detail && detailForm.setFieldsValue({ name: detail?.name, remark: detail?.remark });
    initForm();
  }, [detail, detailForm]);

  const handle = () => {
    detailForm.validateFields().then((values) => {
      let data = [];
      lodash.map(values.menus, (item) => {
        data.push({ name: item?.name, action: item?.action, icon: item?.icon });
      });
      const file = window.node.join("/public/project");
      if (!window.node.existsSync(`${file}/config`)) {
        window.node.mkdirSync(`${file}/config`);
      }
      if (!window.node.existsSync(`${file}/config/auto_flow`)) {
        window.node.mkdirSync(`${file}/config/auto_flow`);
      }
      if (!window.node.existsSync(`${file}/config/view`)) {
        window.node.mkdirSync(`${file}/config/view`);
      }
      if (!window.node.existsSync(`${file}/script`)) {
        window.node.mkdirSync(`${file}/script`);
      }
      let tmp = [];
      for (const menu of values?.menus) {
        tmp.push({ name: menu?.name, action: menu?.action, icon: menu?.icon ?? "working.png" });
        window.node.writeFileSync(`${file}/config/auto_flow/${menu?.action}.json`, "");
      }
      let menusJson = [
        {
          name: "启动引擎",
          action: ENGINE_KERNEL_MENU[values?.engineKernel - 1],
          icons: "working.png",
        },
        ...tmp,
      ];
      window.node.writeFileSync(`${file}/config/menus.json`, JSON.stringify(menusJson, null, "\t"));
    });
  };
  const initForm = () => {
    const file = window.node.join("/public/project");
    if (window.node.existsSync(`${file}/config`)) {
      const menuData = JSON.parse(window.node.readFileSync(`${file}/config/menus.json`));
      const engineActionIndex = lodash.findIndex(ENGINE_KERNEL_MENU, menuData?.[0]?.action);
      let menuTemp = { engineKernel: engineActionIndex === -1 ? "" : engineActionIndex + 1, menus: [] };
      let menus = [];
      menuData.map((menu, index) => {
        if (index !== 0) {
          menus.push(menu);
        }
      });
      menuTemp.menus = menus;
      detailForm.setFieldsValue(menuTemp);
    }
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
