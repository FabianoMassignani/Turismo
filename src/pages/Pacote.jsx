import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table, Form, Modal, Button } from "antd";
import { Navbar } from "../components/Navbar";

import {
  postPacote,
  getPacotes,
  updatePacote,
  deletePacote,
} from "../store/actions/pacote";
import { getPasseios } from "../store/actions/passeio";
import { PacoteForm } from "./PacoteForm";

export const Pacote = () => {
  const [form] = Form.useForm();
  const userState = useSelector((state) => state.user);
  const pacoteState = useSelector((state) => state.pacote);
  const passeioState = useSelector((state) => state.passeio);

  const { token } = userState;
  const { pacotes, loadingP } = pacoteState;
  const { passeios } = passeioState;

  const dispatch = useDispatch();

  const [openAdicionar, setOpenAdicionar] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [currentPacote, setCurrentPacote] = useState({});

  useEffect(() => {
    onLoad();
  }, []);

  const adicionarPacote = () => {
    setOpenAdicionar(true);
  };

  const onLoad = () => {
    dispatch(getPacotes(token));
    dispatch(getPasseios(token));
  };

  const callback = (key) => {
    onLoad();
    form.resetFields();
    setOpenAdicionar(false);
    setOpenEditar(false);
  };

  const onAdicionar = () => {
    const values = form.getFieldsValue();

    values.passeios = values.passeios.map((item) => {
      item = passeios.find((passeio) => passeio.id === item);

      return item;
    });

    dispatch(postPacote(values, token, callback));

    form.resetFields();
    setOpenAdicionar(false);
    onLoad();
  };

  const onEditar = (record) => {
    const values = form.getFieldsValue();
    values.key = currentPacote.key;

    dispatch(updatePacote(values, token, callback));
  };

  const onExcluir = (record) => {
    dispatch(deletePacote(record, token, callback));
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Preço",
      dataIndex: "preco",
      key: "preco",
    },
    {
      title: "Passeios",
      dataIndex: "passeios",
      key: "passeios",
    },
    {
      title: "Ativo",
      dataIndex: "ativo",
      key: "ativo",
      render: (text) => (text ? "Sim" : "Não"),
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
          <Button
            size="small"
            onClick={() => {
              setOpenEditar(true);
              setCurrentPacote(record);
            }}
          >
            Editar
          </Button>
          <Button
            size="small"
            onClick={() => {
              onExcluir(record);
            }}
          >
            Excluir
          </Button>
        </div>
      ),
    },
  ];

  const data = pacotes.map((item) => {
    const passeios = item.passeios.map((passeio) => {
      return passeio.nome;
    });

    return {
      key: item.id,
      nome: item.nome,
      ativo: item.ativo,
      preco: item.preco,
      passeios: passeios.join(", "),
    };
  });

  return (
    <Navbar
      children={
        <div style={{ display: "grid", gap: "20px" }}>
          <h1>Gerenciar Pacotes</h1>

          <div className="header">
            <Button
              onClick={() => {
                adicionarPacote();
              }}
            >
              Adicionar Pacote
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            loading={loadingP}
          />

          <Modal
            open={openEditar}
            title="Editar Pacote"
            width={700}
            onOk={() => {
              onEditar();
            }}
            onCancel={() => {
              form.resetFields();
              setOpenEditar(false);
            }}
          >
            <Form
              form={form}
              name="Editar"
              initialValues={{
                nome: currentPacote.nome,
                preco: currentPacote.preco,
                passeios: currentPacote.passeios,
                ativo: currentPacote.ativo,
              }}
            >
              <PacoteForm passeios={passeios} />
            </Form>
          </Modal>

          <Modal
            open={openAdicionar}
            title="Adicionar Pacote"
            onCancel={() => {
              form.resetFields();
              setOpenAdicionar(false);
            }}
            width={700}
            onOk={() => {
              onAdicionar();
            }}
          >
            <Form
              name="Register"
              form={form}
              initialValues={{
                ativo: true,
              }}
            >
              <PacoteForm passeios={passeios} />
            </Form>
          </Modal>
        </div>
      }
    />
  );
};
