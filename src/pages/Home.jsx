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
} from "antd";

import {
  postPacote,
  getPacotes,
  updatePacote,
  deletePacote,
} from "../store/actions/pacote";

import { getPasseios } from "../store/actions/passeio";
import { postReserva } from "../store/actions/reserva";

export const Home = () => {
  const [form] = Form.useForm();
  const userState = useSelector((state) => state.user);
  const pacoteState = useSelector((state) => state.pacote);
  const passeioState = useSelector((state) => state.passeio);
  const reservaState = useSelector((state) => state.reserva);

  const { loading } = reservaState;
  const { token, user } = userState;
  const { pacotes } = pacoteState;
  const { passeios } = passeioState;
  const { identificacao = "publico" } = user;

  const dispatch = useDispatch();

  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [value, setValue] = useState(3);
  const [openComentarios, setOpenComentarios] = useState(false);
  const [currentPasseio, setCurrentPasseio] = useState({ passeiosIds: [] });

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    dispatch(getPacotes(token));
    dispatch(getPasseios(token));
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
        record.ativo &&
        identificacao === "cliente" && (
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <Button
              type="primary"
              onClick={(e) => {
                e.stopPropagation();
                onReservar(record);
              }}
              loading={loading}
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
      ativo: item.ativo,
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
      children: currentPasseio.ativo ? "Sim" : "Não",
    },
    {
      key: "4",
      label: "Passeios",
      children: currentPasseio.passeiosIds.forEach((item) => {
        item = passeios.find((passeio) => passeio.id === item.id);

        return item.nome;
      }),
    },
  ];

  return (
    <Navbar
      children={
        <div style={{ display: "grid", gap: "20px" }}>
          <h1>Pacotes</h1>

          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            onRow={(record, rowIndex) => {
              return {
                onClick: (e) => {
                  e.stopPropagation();
                  setOpenComentarios(true);
                  setCurrentPasseio(record);
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
                className="demo-loadmore-list"
                loading={false}
                itemLayout="horizontal"
                dataSource={[]}
                renderItem={(item) => (
                  <List.Item>
                    <Skeleton
                      avatar
                      title={false}
                      // loading={item.loading}
                      active
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.picture.large} />}
                        title={
                          <a href="https://ant.design">{item.name?.last}</a>
                        }
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                      />

                      <span>
                        <Rate
                          tooltips={desc}
                          onChange={setValue}
                          value={value}
                        />
                        {value ? (
                          <span className="ant-rate-text">
                            {desc[value - 1]}
                          </span>
                        ) : (
                          ""
                        )}
                      </span>
                    </Skeleton>
                  </List.Item>
                )}
              />
            </>
          </Modal>
        </div>
      }
    />
  );
};
