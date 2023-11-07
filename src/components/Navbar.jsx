import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  TeamOutlined,
  HomeOutlined,
  CarOutlined,
  ShoppingCartOutlined,
  CalendarOutlined,
  IdcardOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

export const Navbar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const { Header, Content, Footer, Sider } = Layout;
  const { type } = props;

  const user = { permissions: ["home", "login", "perfil"] };
  const uerrLogado = { permissions: ["perfil", "reserva"] };
  const userAdmin = {
    permissions: ["perfil", "passeio", "pacote", "reserva"],
  };

  // useEffect(() => {
  //   if (user) {
  //     const { token } = user;
  //     if (token) {
  //       dispatch({ type: "LOAD_USER", payload: { token } });
  //     }
  //   }
  // });

  let items = [
    {
      key: "/",
      icon: <HomeOutlined style={{ fontSize: "16px" }} />,
      label: "Home",
      permission: "home",
    },
    {
      key: "/login",
      icon: <TeamOutlined style={{ fontSize: "16px" }} />,
      label: "Login",
      permission: "login",
    },
    {
      key: "/user",
      icon: <IdcardOutlined style={{ fontSize: "16px" }} />,
      label: "Pefil",
      permission: "perfil",
    },
    {
      key: "/reservation",
      icon: <UnorderedListOutlined style={{ fontSize: "16px" }} />,
      label: "Reservas",
      permission: "reserva",
    },
    {
      key: "/passeios",
      icon: <CarOutlined />,
      label: "Passeios",
      permission: "passeio",
    },
    {
      key: "/pacotes",
      icon: <ShoppingCartOutlined style={{ fontSize: "16px" }} />,
      label: "Pacotes",
      permission: "pacote",
    },
  ];

  items = items.map((item) => {
    if (item.permission) {
      if (user.permissions.includes(item.permission)) {
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
          theme="dark"
          mode="inline"
          items={items}
          defaultSelectedKeys={["/"]}
          onClick={(item) => {
            navigate(item.key, { replace: true });
          }}
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
