import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Descriptions } from "antd";
import { Navbar } from "../components/Navbar";

export const Perfil = () => {
  const userState = useSelector((state) => state.user);
  const { user } = userState;

  const items = [
    {
      key: "1",
      label: "Nome",
      children: user.nome,
    },
    {
      key: "2",
      label: "Email",
      children: user.email,
    },
    {
      key: "3",
      label: "Telefone",
      children: user.telefone,
    },
    {
      key: "4",
      label: "Data de Nascimento",
      children: user.dataAniversario,
    },
  ];

  return (
    <Navbar
      children={
        <>
          <Descriptions title="Perfil" items={items} />
        </>
      }
    />
  );
};
