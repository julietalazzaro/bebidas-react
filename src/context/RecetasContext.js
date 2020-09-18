import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//Crear context
export const RecetasContext = createContext();

//Provider es donde se encentran las funciones y state
const RecetasProvider = (props) => {
  //state del context
  const [recetas, setRecetas] = useState([]);
  const [busqueda, buscarRecetas] = useState({
    tipo: "",
    categoria: "",
    ingrediente: "",
    nombrebebida: "",
  });
  const [consultar, setConsultar] = useState(false);

  useEffect(() => {
    if (consultar) {
      const obtenerRecetas = async () => {
        let url = "";
        switch (busqueda.tipo) {
          case "categoria":
            url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${busqueda.categoria}`;
            break;

          case "ingrediente":
            url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${busqueda.ingrediente}`;
            break;

          case "nombrebebida":
            url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?s=${busqueda.nombrebebida}`;
            break;
          default:
            break;
        }
        const resultado = await axios.get(url);
        //  resultado.data.drinks.push({ strDrink: "", strDrinkThumb: "" });
        setRecetas(resultado.data.drinks);
        // console.log(resultado.data.drinks);
        setConsultar(false);
      };
      obtenerRecetas();
    }
    // eslint-disable-next-line
  }, [busqueda]);

  return (
    <RecetasContext.Provider value={{ recetas, buscarRecetas, setConsultar }}>
      {props.children}
    </RecetasContext.Provider>
  );
};

export default RecetasProvider;
