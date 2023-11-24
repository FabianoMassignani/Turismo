import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, List, Rate, Skeleton } from "antd";
import { Table, Modal, Descriptions, Button } from "antd";
import { Navbar } from "../components/Navbar";

import { getPasseios } from "../store/actions/passeio";

export const Passeio = () => {
  const userState = useSelector((state) => state.user);
  const passeioState = useSelector((state) => state.passeio);

  const { token } = userState;
  const { passeios } = passeioState;

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  useEffect(() => {
    dispatch(getPasseios(token));
  }, []);

  const columns = [
    {
      title: "destino",
      dataIndex: "destino",
      key: "destino",
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
  ];

  const data = passeios.map((passeio) => {
    return {
      key: passeio.id,
      destino: passeio.destino,
      ativo: passeio.ativo,
      valor: passeio.valor,
      quantidadeMaximaPessoas: passeio.quantidadeMaximaPessoas,
    };
  });

  return (
    <Navbar
      children={
        <>
          <h1>Gerenciar Passeios</h1>

          <Table columns={columns} dataSource={data} pagination={false} />

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
