import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Table,
  Tag,
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
  Switch,
} from "antd";
import { Navbar } from "../components/Navbar";

import { getReserva, deleteReserva } from "../store/actions/reserva";

export const Reserva = () => {
  const [form] = Form.useForm();
  const userState = useSelector((state) => state.user);
  const pacoteState = useSelector((state) => state.pacote);
  const reservaState = useSelector((state) => state.reserva);

  const { token, users, user } = userState;
  const { pacotes } = pacoteState;
  const { reservas, loading } = reservaState;
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
    { title: "Pacote", dataIndex: "reservaPacote", key: "reservaPacote" },
    { title: "Cliente", dataIndex: "reservaUser", key: "reservaUser" },
    { title: "Data", dataIndex: "data", key: "data" },
    {
      title: "Reserva Aceita",
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
          {identificacao === "admin" && (
            <Button type="primary" loading={loading} onClick={() => {}}>
              Aceitar Reserva
            </Button>
          )}

          {identificacao === "cliente" && (
            <Button
              type="primary"
              danger
              loading={loading}
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
    let reservaPacote = pacotes.find(
      (pacote) => pacote.key === reserva.pacoteId
    );
    let reservaUser = users.find((user) => user.key === reserva.userId);

    reserva.data = reserva.data.split("T")[0];

    if (identificacao === "admin")
      return {
        key: reserva.id,
        data: reserva.data,
        quantidadePessoas: reserva.quantidadePessoas,
        reservaPacote: reservaPacote.nome,
        reservaUser: reservaUser.nome,
        reservaAceita: reserva.reservaAceita,
      };

    if (identificacao === "cliente" && reserva.key === user.id)
      return {
        key: reserva.id,
        data: reserva.data,
        quantidadePessoas: reserva.quantidadePessoas,
        reservaPacote: reservaPacote.nome,
        reservaUser: reservaUser.nome,
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

          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      }
    />
  );
};
