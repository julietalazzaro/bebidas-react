import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//Crear context
export const IngredientesContext = createContext();

//Provider es donde se encentran las funciones y state
const IngredientesProvider = (props) => {
  //state del context
  const [ingredientes, setIngredientes] = useState([]);

  //llamado a api
  useEffect(() => {
    const obtenerIngredientes = async () => {
      const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";
      const ingredientes = await axios.get(url);
      setIngredientes(ingredientes.data.drinks);
    };
    obtenerIngredientes();
  }, []);

  return (
    <IngredientesContext.Provider value={{ ingredientes }}>
      {props.children}
    </IngredientesContext.Provider>
  );
};

export default IngredientesProvider;
