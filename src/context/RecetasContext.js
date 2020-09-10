import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//Crear context
export const RecetasContext = createContext();

//Provider es donde se encentran las funciones y state
const RecetasProvider = (props) => {
  //state del context
  const [recetas, setRecetas] = useState([]);
  const [busqueda, buscarRecetas] = useState({
    nombre: "",
    categoria: "",
  });
  const [consultar, setConsultar] = useState(false);

  useEffect(() => {
    if (consultar) {
      const obtenerRecetas = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${busqueda.nombre}&c=${busqueda.categoria}`;
        const resultado = await axios.get(url);

        setRecetas(resultado.data.drinks);
        //console.log(resultado.data.drinks);
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
