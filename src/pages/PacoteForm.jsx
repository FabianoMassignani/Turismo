import React from "react";
import { Form, Input, InputNumber, Select, Switch, Space } from "antd";

export const PacoteForm = (props) => {
  const options = props.passeios.map((item) => {
    return {
      label: item.nome,
      value: item.id,
    };
  });

  return (
    <div>
      <Form.Item
        label="Nome"
        name="nome"
        rules={[
          {
            required: false,
            message: "Please input your nome!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Preço"
        name="preco"
        rules={[
          {
            required: false,
            message: "Please input your username!",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item label="Passseios" name="passeios">
        <Select
          mode="multiple"
          style={{
            width: "100%",
          }}
          placeholder="Selecione os passeios"
          optionLabelProp="label"
          options={options}
          optionRender={(option) => (
            <Space>
              <div>{option.label}</div>
            </Space>
          )}
        />
      </Form.Item>

      <Form.Item label="Ativo" name={"checked"} valuePropName="checked">
        <Switch />
      </Form.Item>
    </div>
  );
};
