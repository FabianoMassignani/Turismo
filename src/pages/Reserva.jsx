import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table, Tag, Modal, Button, Form } from "antd";
import { Navbar } from "../components/Navbar";

import {
  getReserva,
  deleteReserva,
  updateReserva,
} from "../store/actions/reserva";

export const Reserva = () => {
  const [form] = Form.useForm();
  const userState = useSelector((state) => state.user);
  const pacoteState = useSelector((state) => state.pacote);
  const reservaState = useSelector((state) => state.reserva);

  const { token, users, user } = userState;
  const { pacotes } = pacoteState;
  const { reservas, loadingR } = reservaState;
  const { identificacao = "publico" } = user;

  const dispatch = useDispatch();
  const [currentReserva, setCurrentReserva] = useState({});

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    dispatch(getReserva(token));
  };

  const callback = (key) => {
    onLoad();
  };

  const deleteReserv = (record) => {
    dispatch(deleteReserva(record, token, callback));
  };

  const columns = [
    { title: "Pacote", dataIndex: "nomePacote", key: "nomePacote" },
    { title: "Cliente", dataIndex: "nomeCliente", key: "nomeCliente" },
    { title: "Preço", dataIndex: "preco", key: "preco" },
    { title: "Data", dataIndex: "data", key: "data" },
    {
      title: "Aceita",
      dataIndex: "reservaAceita",
      key: "reservaAceita",
      render: (text, record) => (
        <div>
          {!record.reservaAceita ? (
            <Tag color={"volcano"}>{"Não"}</Tag>
          ) : (
            <Tag color={"green"}>{"Sim"}</Tag>
          )}
        </div>
      ),
    },
    {
      dataIndex: "acoes",
      key: "acoes",
      render: (text, record) => (
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          {identificacao === "admin" && record.reservaAceita === false && (
            <Button
              type="primary"
              loading={loadingR}
              onClick={() => {
                record.reservaAceita = true;
                dispatch(updateReserva(record, token, callback));
              }}
            >
              Aceitar Reserva
            </Button>
          )}

          {identificacao === "admin" && record.reservaAceita === true && (
            <Button
              type="primary"
              loading={loadingR}
              danger
              onClick={() => {
                record.reservaAceita = false;
                dispatch(updateReserva(record, token, callback));
              }}
            >
              Cancelar Reserva
            </Button>
          )}

          {identificacao === "cliente" && (
            <Button
              type="primary"
              danger
              disabled={record.reservaAceita === true}
              loading={loadingR}
              onClick={() => {
                deleteReserv(record);
              }}
            >
              Cancelar Reserva
            </Button>
          )}
        </div>
      ),
    },
  ];

  let data = reservas.map((reserva) => {
    reserva.data = reserva.data.split("T")[0];

    if (identificacao === "admin")
      return {
        ...reserva,
        key: reserva.id,
        data: reserva.data,
        nomePacote: reserva?.pacote?.nome,
        preco: reserva?.pacote?.preco,
        nomeCliente: reserva?.pessoa?.nome,
        reservaAceita: reserva.reservaAceita === true ? true : false,
      };

    if (identificacao === "cliente" && reserva?.pessoa?.id === user.id)
      return {
        ...reserva,
        key: reserva.id,
        data: reserva.data,
        preco: reserva?.pacote?.preco,
        nomePacote: reserva?.pacote?.nome,
        nomeCliente: reserva?.pessoa?.nome,
        reservaAceita: reserva.reservaAceita,
      };

    return undefined;
  });

  data = data.filter((item) => item !== undefined);

  return (
    <Navbar
      children={
        <div style={{ display: "grid", gap: "20px" }}>
          <h1>Reservas</h1>

          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            loading={loadingR}
          />
        </div>
      }
    />
  );
};
