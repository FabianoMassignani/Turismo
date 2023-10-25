import { Table } from "antd";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../components/Navbar";

export const Users = () => {
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Telefone",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  const data = [];

  return (
    <Navbar
      children={
        <>
          <h1>Usuários</h1>
          <Table columns={columns} dataSource={data} />
        </>
      }
    />
  );
};
