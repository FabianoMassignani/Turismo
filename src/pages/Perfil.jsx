import React from "react";
import { Descriptions } from "antd";
import { Navbar } from "../components/Navbar";

export const Perfil = () => {
  const items = [
    {
      key: "1",
      label: "Nome",
      children: "John Brown",
    },
    {
      key: "2",
      label: "Telefone",
      children: "123456789",
    },
    {
      key: "3",
      label: "Cidade",
      children: "São Paulo",
    },
    {
      key: "5",
      label: "endereço",
      children:
        "Rua dos Bobos, nº 0, Bairro: Vila do Chaves, CEP: 00000-000, São Paulo - SP",
    },
  ];

  return (
    <Navbar
      children={
        <>
          <Descriptions title="User Info" items={items} />
        </>
      }
    />
  );
};
