import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";

import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";

export const UserForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Navbar
      children={
        <>
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
           
            size={'middle'}
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item label="Input">
              <Input />
            </Form.Item>
            <Form.Item label="Select">
              <Select>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
          
            <Form.Item label="Button">
              <Button>Button</Button>
            </Form.Item>
          </Form>
        </>
      }
    />
  );
};
