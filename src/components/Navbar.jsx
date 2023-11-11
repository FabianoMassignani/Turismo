import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { setNavigate } from "../store/actions/ui";

import { useDispatch, useSelector } from "react-redux";

import {
  TeamOutlined,
  HomeOutlined,
  CarOutlined,
  ShoppingCartOutlined,
  CalendarOutlined,
  IdcardOutlined,
  UnorderedListOutlined,
  BarsOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

export const Navbar = (props) => {
  const ui = useSelector((state) => state.ui);
  const optionNavigate = ui.navigate;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const { Header, Content, Footer, Sider } = Layout;

  const user = { permissions: ["home", "login", "perfil"] };
  const uerrLogado = { permissions: ["perfil", "reserva"] };
  const userAdmin = {
    permissions: ["perfil", "passeio", "pacote", "reserva"],
  };

  useEffect(() => {
    if (user) {
      const { token } = user;

      if (token) {
        dispatch({ type: "LOAD_USER", payload: { token } });
      }
    }
  });

  useEffect(() => {
    navigate(optionNavigate, { replace: true });
  }, [dispatch, optionNavigate]);

  let items = [
    { label: "Inicio", key: "/", icon: <HomeOutlined />, permission: "home" },
    {
      label: "Perfil",
      key: "/perfil",
      icon: <IdcardOutlined />,
      permission: "perfil",
    },
    {
      label: "Login",
      key: "/login",
      icon: <LogoutOutlined />,
      permission: "login",
    },
    {
      label: "Passeios",
      key: "/passeio",
      icon: <ShoppingCartOutlined />,
      permission: "pacote",
    },
  ];

  items = items.map((item) => {
    if (item.permission) {
      if (userAdmin.permissions.includes(item.permission)) {
        return item;
      }
    }
  });

  return (
    <Layout hasSider>
      <Sider
        collapsible
        collapsed={collapsed}
        width={170}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="nav" />
        <Menu
          selectedKeys={[optionNavigate]}
          onClick={(item) => {
            navigate(item.key, { replace: true });
            dispatch(setNavigate(item.key));
          }}
          items={items}
          theme="dark"
        />
      </Sider>

      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        <Content>
          <div className="container">{props.children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};
