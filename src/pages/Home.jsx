import React, { useEffect, useState } from "react";
import { Avatar, List, Rate, Skeleton } from "antd";
import { Table, Modal, Descriptions, Button } from "antd";
import { Navbar } from "../components/Navbar";

export const Home = () => {
  const [open, setOpen] = useState(false);
  const count = 3;

  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [value, setValue] = useState(3);

  useEffect(() => {}, []);

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

  const data2 = [];

  const items2 = [];

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
                loading={false}
                itemLayout="horizontal"
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
