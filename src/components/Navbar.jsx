import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { HomeOutlined, BarsOutlined } from "@ant-design/icons";

import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";

import { App } from "../App";

const { Header, Content, Footer, Sider } = Layout;

export const Navbar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Header, Content, Footer, Sider } = Layout;

  const items = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: "Home",
    },
    {
      key: "/users",
      icon: <TeamOutlined />,
      label: "Usuarios",
    },
    {
      key: "/users/new",
      icon: <UserOutlined />,
      label: "Novo Usuario",
    }
  ];

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          items={items}
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
