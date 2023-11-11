import React, { useEffect, useState } from "react";
import { Avatar, List, Rate, Skeleton } from "antd";
import { Table, Modal, Descriptions, Button } from "antd";
import { Navbar } from "../components/Navbar";

export const Passeio = () => {
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

  const data2 = [
    {
      key: "1",
      nome: "Pacote 1",
      ativo: true,
      valor: 100,
      origem: "São Paulo",
      destino: "Rio de Janeiro",
    },
    {
      key: "2",
      nome: "Pacote 2",
      ativo: true,
      valor: 200,
      origem: "São Paulo",
      destino: "Rio de Janeiro",
    },
    {
      key: "3",
      nome: "Pacote 3",
      ativo: true,
      valor: 300,
      origem: "São Paulo",
      destino: "Rio de Janeiro",
    },
  ];

  return (
    <Navbar
      children={
        <>
          <h1>Gerenciar Passeios</h1>

          <Table columns={columns} dataSource={data2} pagination={false} />

          <Modal
            open={open}
            title="Editar Pacote"
            width={700}
            footer={[
              <Button
                onClick={() => {
                  setOpen(false);
                }}
              >
                Fechar
              </Button>,
            ]}
          >
            <></>
          </Modal>

          <Modal
            open={open2}
            title="Histórico"
            width={700}
            footer={[
              <Button
                onClick={() => {
                  setOpen2(false);
                }}
              >
                Fechar
              </Button>,
            ]}
          >
            <></>
          </Modal>
        </>
      }
    />
  );
};
