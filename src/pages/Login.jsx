import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, DatePicker, Checkbox, Form, Select, Input } from "antd";

import { Navbar } from "../components/Navbar";
import { onRegistrar, onLogar } from "../store/actions/user";
import { useState } from "react";

export const Login = () => {
  const dispatch = useDispatch();
  const [openCadastro, setOpenCadastro] = useState(false);
  const userState = useSelector((state) => state.user);
  const { Option } = Select;

  const onLogin = async (values) => {
    dispatch(onLogar(values));
  };

  const onRegister = (values) => {
    dispatch(onRegistrar(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Navbar
      children={
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
              height: "100vh",
              alignItems: "center",
            }}
          >
            {!openCadastro ? (
              <Form
                name="Login"
                initialValues={{
                  remember: true,
                }}
                onFinish={onLogin}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Checkbox>Lembrar</Checkbox>
                </Form.Item>

                <div style={{ display: "flex", gap: "15px" }}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Login
                    </Button>
                  </Form.Item>

                  <Form.Item>
                    <Button onClick={() => setOpenCadastro(true)}>
                      Cadastrar
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            ) : (
              <Form
                name="Register"
                onFinish={onRegister}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                initialValues={{
                  remember: false,
                }}
              >
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
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="Data de Nascimento"
                  name="dataNascimento"
                  rules={[
                    {
                      required: false,
                      message: "Please input your Data de Nascimento!",
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>

                <Form.Item
                  label="Telefone"
                  name="telefone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your telefone!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Tipo"
                  name="identificacao"
                  defaultValue="cliente"
                  rules={[
                    {
                      required: true,
                      message: "Please input your tipo!",
                    },
                  ]}
                >
                  <Select>
                    <Option value="cliente">cliente</Option>
                    <Option value="admin">admin</Option>
                  </Select>
                </Form.Item>

                <div style={{ display: "flex", gap: "15px" }}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Registrar
                    </Button>
                  </Form.Item>

                  <Form.Item>
                    <Button onClick={() => setOpenCadastro(false)}>
                      Voltar
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            )}
          </div>
        </>
      }
    />
  );
};
