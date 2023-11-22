import React from "react";
import { useDispatch } from "react-redux";
import { Button, Checkbox, Form, Input } from "antd";
import { Navbar } from "../components/Navbar";
import { onRegistrar, onLogar } from "../store/actions/user";
import { useState } from "react";

export const Login = () => {
  const dispatch = useDispatch();

  const [openCadastro, setOpenCadastro] = useState(false);

  const onLogar = (values) => {
    console.log("logar", values);

    dispatch(onRegistrar(values));
  };

  const onRegistrar = (values) => {
    console.log("registrar", values);

    dispatch(onLogar(values));
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
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                style={{
                  maxWidth: 600,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onLogar}
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

                <div style={{ display: "flex" }}>
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
                name="Login"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                style={{
                  maxWidth: 600,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onRegistrar}
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

                <div style={{ display: "flex" }}>
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
