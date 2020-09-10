import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ModalContext = createContext();

const ModalProvider = (props) => {
  const [idreceta, setIdreceta] = useState(null);
  const [informacion, setReceta] = useState({});

  useEffect(() => {
    const obtenerReceta = async () => {
      if (!idreceta) return;
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
      const resultado = await axios.get(url);

      setReceta(resultado.data.drinks[0]);
    };
    obtenerReceta();
  }, [idreceta]);
  return (
    <ModalContext.Provider value={{ informacion, setIdreceta, setReceta }}>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
