import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../components/Navbar";

import {
  Table,
  Form,
  Modal,
  Button,
  Input,
  InputNumber,
  Select,
  Switch,
  Space,
  Descriptions,
  List,
  Avatar,
  Skeleton,
  Rate,
  TextArea,
} from "antd";

import {
  postPacote,
  getPacotes,
  updatePacote,
  deletePacote,
} from "../store/actions/pacote";

import {
  getPasseios,
  postComentario,
  getComentarios,
} from "../store/actions/passeio";
import { postReserva, getReserva } from "../store/actions/reserva";

export const Home = () => {
  const [form] = Form.useForm();
  const userState = useSelector((state) => state.user);
  const pacoteState = useSelector((state) => state.pacote);
  const passeioState = useSelector((state) => state.passeio);
  const reservaState = useSelector((state) => state.reserva);

  const { token, user = {}, users, loadingU } = userState;
  const { pacotes, loadingP } = pacoteState;
  const { passeios, loadingPas } = passeioState;
  const { reservas, loadingR } = reservaState;

  const { identificacao = "publico" } = user;

  const { TextArea } = Input;

  const dispatch = useDispatch();

  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [value, setValue] = useState(3);
  const [openComentarios, setOpenComentarios] = useState(false);
  const [newComentarios, setNewComentarios] = useState(false);
  const [currentPasseio, setCurrentPasseio] = useState({ passeiosIds: [] });

  const { comentarios = [], loadingA } = passeioState;

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    if (loadingPas || loadingP || loadingR || loadingU) return;

    dispatch(getPacotes());
    dispatch(getPasseios());
    dispatch(getReserva());
  };

  const callback = () => {
    setNewComentarios(false);
    setOpenComentarios(false);
    form.resetFields();
    onLoad();
    getComen();
  };

  const onComentario = () => {
    const values = form.getFieldsValue();

    const data = {
      ...values,
      classificacao: values.nota,
      idPasseio: currentPasseio.key,
      idUsuario: user.id,
      dataAvaliacao: new Date(),
    };

    dispatch(postComentario(data, callback));
  };

  const callbackgetComentarios = () => {};

  const getComen = (id) => {
    const data = {
      idPasseio: id || currentPasseio.key,
    };

    dispatch(getComentarios(data, callbackgetComentarios));
  };

  const onReservar = (record) => {
    const data = {
      pacote: { id: record.key },
      pessoa: { id: user.id },
      data: new Date(),
    };

    dispatch(postReserva(data, token, onLoad));
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
      title: "Ativo",
      dataIndex: "ativo",
      key: "ativo",
      render: (text) => (text ? "Sim" : "Não"),
    },

    {
      dataIndex: "acoes",
      key: "acoes",
      render: (text, record) =>
        record?.ativo &&
        identificacao === "cliente" && (
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setNewComentarios(true);
                setCurrentPasseio(record);
              }}
            >
              Adicionar Comentário
            </Button>

            <Button
              disabled={reservas.find(
                (item) => item?.pacote?.id === record.key
              )}
              type="primary"
              onClick={(e) => {
                e.stopPropagation();
                onReservar(record);
              }}
              loading={loadingR}
            >
              Reservar
            </Button>
          </div>
        ),
    },
  ];

  const data = pacotes.map((item) => {
    return {
      key: item.id,
      nome: item.nome,
      ativo: item?.ativo | false,
      preco: item.preco,
      passeiosIds: item.passeios,
    };
  });

  const itemsDescriptions = [
    {
      key: "1",
      label: "Nome",
      children: currentPasseio.nome,
    },
    {
      key: "2",
      label: "Preço",
      children: currentPasseio.preco,
    },
    {
      key: "3",
      label: "Ativo",
      children: currentPasseio?.ativo ? "Sim" : "Não",
    },
    {
      key: "4",
      label: "Passeios",
      // currentPasseio.passeiosIds.forEach((item) => {
      //   item = passeios.find((passeio) => passeio.id === item.id);

      //   return item.nome;
      // }),
      children: currentPasseio.passeiosIds.map((item) => item.nome).join(", "),
    },
  ];

  const comentarioData = comentarios.map((item) => {
    return {
      comentario: item.comentario,
      classificacao: item.classificacao,
    };
  });

  return (
    <Navbar
      children={
        <div style={{ display: "grid", gap: "20px" }}>
          <h1>Pacotes</h1>

          <Table
            columns={columns}
            dataSource={data}
            loading={loadingP}
            pagination={false}
            onRow={(record, rowIndex) => {
              return {
                onClick: (e) => {
                  e.stopPropagation();
                  setOpenComentarios(true);
                  setCurrentPasseio(record);
                  getComen(record.key);
                },
              };
            }}
          />

          <Modal
            open={openComentarios}
            width={700}
            onCancel={() => {
              setOpenComentarios(false);
            }}
            loading={loadingP}
            cancelText="Sair"
            okButtonProps={{ style: { display: "none" } }}
          >
            <>
              <Descriptions
                title="Detalhes"
                layout="vertical"
                items={itemsDescriptions}
              />

              <h3>Comentarios</h3>

              <List
                className="comment-list"
                itemLayout="horizontal"
                dataSource={comentarioData}
                loading={loadingA}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta description={item.comentario} />

                    <span>
                      <Rate
                        count={5}
                        tooltips={desc}
                        onChange={setValue}
                        value={item.classificacao}
                      />
                      {value ? <span className="ant-rate-text">{}</span> : ""}
                    </span>
                  </List.Item>
                )}
              />
            </>
          </Modal>

          <Modal
            open={newComentarios}
            width={600}
            loading={loadingA}
            confirmLoading={loadingA}
            onCancel={() => {
              setNewComentarios(false);
            }}
            cancelText="Sair"
            onOk={() => {
              onComentario();
            }}
            okText="Enviar"
          >
            <Form
              form={form}
              autoComplete="off"
              initialValues={{
                remember: false,
              }}
            >
              <div style={{ display: "grid", gap: "10px", paddingTop: "40px" }}>
                <Form.Item
                  label="Nota"
                  name="nota"
                  rules={[
                    {
                      required: true,
                      message: "Please input your nota!",
                    },
                  ]}
                >
                  <Rate tooltips={desc} count={5} />
                </Form.Item>

                <Form.Item
                  label="Comentario"
                  name="comentario"
                  rules={[
                    {
                      required: true,
                      message: "Please input your comentario!",
                    },
                  ]}
                >
                  <TextArea rows={4} />
                </Form.Item>
                <br />
                <br />
              </div>
            </Form>
          </Modal>
        </div>
      }
    />
  );
};
