import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table, Modal, Button, Form, Input, InputNumber, Switch } from "antd";
import { Navbar } from "../components/Navbar";

import {
  getPasseios,
  postPasseio,
  updatePasseio,
  deletePasseio,
} from "../store/actions/passeio";

import { PasseioForm } from "../pages/PasseioForm";

export const Passeio = () => {
  const [form] = Form.useForm();
  const userState = useSelector((state) => state.user);
  const passeioState = useSelector((state) => state.passeio);

  const { token } = userState;
  const { passeios } = passeioState;

  const dispatch = useDispatch();
  const [openHistorico, setopenHistorico] = useState(false);
  const [openAdicionar, setOpenAdicionar] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [currentPasseio, setCurrentPasseio] = useState({});

  useEffect(() => {
    onLoad();
  }, []);

  const adicionarPasseio = () => {
    setOpenAdicionar(true);
  };

  const onLoad = () => {
    dispatch(getPasseios(token));
  };

  const callback = (key) => {
    onLoad();
    form.resetFields();
    setOpenAdicionar(false);
    setOpenEditar(false);
    setopenHistorico(false);
  };

  const onAdicionar = () => {
    const values = form.getFieldsValue();
    dispatch(postPasseio(values, token, callback));
  };

  const onEditar = (record) => {
    const values = form.getFieldsValue();
    values.key = currentPasseio.key;

    dispatch(updatePasseio(values, token, callback));
  };

  const onHistorico = (record) => {};

  const onExcluir = (record) => {
    dispatch(deletePasseio(record, token, callback));
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
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
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
    },
    {
      title: "Valor",
      dataIndex: "valor",
      key: "valor",
    },
    {
      title: "Quantidade Máxima de Pessoas",
      dataIndex: "quantidadeMaximaPessoas",
      key: "quantidadeMaximaPessoas",
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
              setCurrentPasseio(record);
            }}
          >
            Editar
          </Button>
          <Button
            size="small"
            onClick={() => {
              onHistorico(record);
              setCurrentPasseio(record);
            }}
          >
            Histórico
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

  const data = passeios.map((passeio) => {
    return {
      key: passeio.id,
      nome: passeio.nome,
      origem: passeio.origem,
      destino: passeio.destino,
      ativo: passeio.ativo,
      valor: passeio.valor,
      quantidadeMaximaPessoas: passeio.quantidadeMaximaPessoas,
      descricao: passeio.descricao,
    };
  });

  return (
    <Navbar
      children={
        <div style={{ display: "grid", gap: "20px" }}>
          <h1>Gerenciar Passeios</h1>

          <div className="header">
            <Button
              onClick={() => {
                adicionarPasseio();
              }}
            >
              Adicionar Passeio
            </Button>
          </div>

          <Table columns={columns} dataSource={data} pagination={false} />

          <Modal
            open={openEditar}
            title="Editar Passseio"
            onCancel={() => {
              setOpenEditar(false);
              setCurrentPasseio({});
            }}
            width={700}
            onOk={() => {
              onEditar();
            }}
          >
            <Form
              form={form}
              name="Editar"
              initialValues={
                currentPasseio
                  ? {
                      nome: currentPasseio.nome,
                      origem: currentPasseio.origem,
                      destino: currentPasseio.destino,
                      descricao: currentPasseio.descricao,
                      valor: currentPasseio.valor,
                      quantidadeMaximaPessoas:
                        currentPasseio.quantidadeMaximaPessoas,
                      ativo: currentPasseio.ativo,
                    }
                  : {}
              }
            >
              <PasseioForm />
            </Form>
          </Modal>

          <Modal
            open={openHistorico}
            title="Histórico"
            width={700}
            footer={[
              <Button
                onClick={() => {
                  setopenHistorico(false);
                }}
              >
                Fechar
              </Button>,
            ]}
          >
            <></>
          </Modal>

          <Modal
            open={openAdicionar}
            title="Adicionar Passseio"
            onCancel={() => {
              setOpenAdicionar(false);
            }}
            onOk={() => {
              onAdicionar();
            }}
            width={700}
          >
            <Form
              form={form}
              name="Register"
              initialValues={{
                quantidadeMaximaPessoas: 1,
                ativo: true,
              }}
            >
              <PasseioForm />
            </Form>
          </Modal>
        </div>
      }
    />
  );
};
