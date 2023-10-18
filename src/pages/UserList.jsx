import React from "react";

import { Table } from "antd";

export const UserList = () => {
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
    {
      title: "Ações",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      email: "teste@hotmail.com",
      phone: "999999999",
      actions: "Editar",
    },
    {
      key: "2",
      name: "Jim Green",
      email: "asd",
      phone: "999999999",
      actions: "Editar",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 50 }}
      scroll={{ y: 240 }}
    />
  );
};
