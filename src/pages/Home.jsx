import React from "react";
import { Table } from "antd";
import { Navbar } from "../components/Navbar";

export const Home = () => {
  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
    },
    {
      title: "Imagem",
      dataIndex: "imagem",
      key: "imagem",
      render: (text) => <img src={text} alt="Imagem do passeio" style={{ width: '50px' }} />,
    },
    {
      title: "Ativo",
      dataIndex: "ativo",
      key: "ativo",
      render: (text) => text ? "Sim" : "Não",
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
      title: "Itinerário",
      dataIndex: "itinerario",
      key: "itinerario",
    },
    {
      title: "Saída",
      dataIndex: "dataHoraSaida",
      key: "dataHoraSaida",
    },
    {
      title: "Retorno",
      dataIndex: "dataHoraRetorno",
      key: "dataHoraRetorno",
    },
    {
      title: "Máximo de Pessoas",
      dataIndex: "quantidadeMaximaPessoas",
      key: "quantidadeMaximaPessoas",
    },
    {
      title: "Observação",
      dataIndex: "observacao",
      key: "observacao",
    }
  ];

  const data = []; // Aqui você deverá inserir os dados vindo da sua API ou fonte de dados

  return (
    <Navbar
      children={
        <>
          <h1>Pacotes</h1>
          <Table columns={columns} dataSource={data} />
        </>
      }
    />
  );
};
