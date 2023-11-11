import React, { useEffect, useState } from "react";
import { Avatar, List, Rate, Skeleton } from "antd";
import { Table, Modal, Descriptions, Button } from "antd";
import { Navbar } from "../components/Navbar";

export const Home = () => {
  const [open, setOpen] = useState(false);
  const count = 3;
  const [initLoading, setInitLoading] = useState(true);
  const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [value, setValue] = useState(3);

  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);

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

  const items2 = [
    {
      key: "1",
      label: "Nome",
      children: "Pacote 1",
    },
    {
      key: "2",
      label: "Ativo",
      children: "Sim",
    },
    {
      key: "3",
      label: "Valor",
      children: "100",
    },
    {
      key: "5",
      label: "Origem",
      children: "São Paulo",
    },
    {
      key: "5",
      label: "Destino",
      children: "Rio de Janeiro",
    },
  ];

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        }))
      )
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        window.dispatchEvent(new Event("resize"));
      });
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>Carrega mais</Button>
      </div>
    ) : null;

  return (
    <Navbar
      children={
        <>
          <h1>Pacotes</h1>
          <Table
            columns={columns}
            dataSource={data2}
            pagination={false}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  setOpen(true);
                },
              };
            }}
          />
          <Modal
            open={open}
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
            <>
              <Descriptions title="Detalhes" layout="vertical" items={items2} />

              <h3>Comentarios</h3>

              <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={list}
                renderItem={(item) => (
                  <List.Item>
                    <Skeleton
                      avatar
                      title={false}
                      loading={item.loading}
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
        </>
      }
    />
  );
};
