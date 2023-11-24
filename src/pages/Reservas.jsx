import React, { useEffect, useState } from "react";
import { Avatar, List, Rate, Skeleton } from "antd";
import { Table, Modal, Descriptions, Button } from "antd";
import { Navbar } from "../components/Navbar";

export const Reservas = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Ativo",
      dataIndex: "ativo",
      key: "ativo",
      render: (text) => (text ? "Sim" : "Não"),
    },
    {
      title: "Valor",
      dataIndex: "valor",
      key: "valor",
    },
    {
      title: "Origem",
      dataIndex: "origem",
      key: "origem",
    },
    {
      title: "Destino",
      dataIndex: "destino",
      key: "destino",
    },
    {
      title: "Ações",
      key: "acoes",
      render: (text, record) => (
        <div style={{ display: "flex", gap: 10 }}>
          <Button
            type="primary"
            onClick={() => {
              setOpen(true);
            }}
          >
            Editar
          </Button>

          <Button
            type="primary"
            onClick={() => {
              setOpen2(true);
            }}
          >
            Histórico
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Navbar
      children={
        <>
          <h1>Reservas</h1>
          <Table columns={columns} dataSource={[]} pagination={false} />
        </>
      }
    />
  );
};
