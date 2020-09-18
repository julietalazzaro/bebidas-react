import React, { useContext } from "react";
import Receta from "./Receta.js";
import PropTypes from "prop-types";
import { RecetasContext } from "../context/RecetasContext.js";

const ListaRecetas = () => {
  const { recetas } = useContext(RecetasContext);

  return (
    <div className="row mt-5">
      {Array.from(recetas).map((receta) => (
        // eslint-disable-next-line
        <Receta key={receta.idDrink} receta={receta} />
      ))}
    </div>
  );
};

ListaRecetas.propTypes = {
  recetas: PropTypes.string,
};
export default ListaRecetas;
