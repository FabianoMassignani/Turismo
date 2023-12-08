import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, List, Rate, Skeleton } from "antd";
import { Table, Modal, Descriptions, Button } from "antd";
import { Navbar } from "../components/Navbar";

import { getUsers, updateUser, deleteUser } from "../store/actions/user";

export const Users = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const { users = [], loadingU, token } = userState;

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const columns = [
    { title: "Id", dataIndex: "key", key: "key" },
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Identificacao",
      dataIndex: "identificacao",
      key: "identificacao",
    },
    {
      render: (text, record) => (
        <Button
          onClick={() => {
            dispatch(deleteUser(record.key, token));
          }}
          loading={loadingU}
        >
          Excluir
        </Button>
      ),
    },
  ];

  const data = users.map((user) => {
    return {
      key: user.id,
      nome: user.nome,
      email: user.email,
      identificacao: user.identificacao,
    };
  });

  return (
    <Navbar
      children={
        <>
          <h1>Usuarios</h1>

          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            loading={loadingU}
          />
        </>
      }
    />
  );
};
