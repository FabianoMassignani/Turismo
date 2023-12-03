import React from "react";
import { Form, Input, Modal, InputNumber, Switch } from "antd";

export const PasseioForm = () => {
  return (
    <div>
      <Form.Item
        label="Nome"
        name="nome"
        rules={[
          {
            required: true,
            message: "Please input your nome!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Origem"
        name="origem"
        rules={[
          {
            required: true,
            message: "Please input your origem!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Destino"
        name="destino"
        rules={[
          {
            required: true,
            message: "Please input your destino!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Descrição"
        name="descricao"
        rules={[
          {
            required: false,
            message: "Please input your descricao!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Valor"
        name="valor"
        rules={[
          {
            required: true,
            message: "Please input your valor!",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item label="Ativo" name="ativo">
        <Switch />
      </Form.Item>
    </div>
  );
};
