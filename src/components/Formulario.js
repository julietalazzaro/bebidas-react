import React, { useContext, useState } from "react";
import { CategoriasContext } from "../context/CategoriasContext.js";
import { RecetasContext } from "../context/RecetasContext.js";

const Formulario = () => {
  const [busqueda, setBusqueda] = useState({
    nombre: "",
    categoria: "",
  });
  const [error, setError] = useState(false);

  const { categorias } = useContext(CategoriasContext);
  const { buscarRecetas, setConsultar } = useContext(RecetasContext);

  const obtenerDatosReceta = (e) => {
    setBusqueda({ ...busqueda, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!busqueda.categoria) {
      setError(true);
      return;
    }
    setError(false);
    buscarRecetas(busqueda);
    setConsultar(true);
  };

  return (
    <form className="col-12" onSubmit={handleSubmit}>
      <fieldset className="text-center">
        <legend>Busca bebidas por Categoria o Ingrediente</legend>
      </fieldset>
      <div className="row mt-4">
        <div className="col-md-1">
          {/* <input
            name="nombre"
            className="form-control"
            type="text"
            placeholder="Bucar por ingrediente"
            onChange={obtenerDatosReceta}
          /> */}
        </div>
        <div className="col-md-5">
          <select
            name="categoria"
            className="form-control"
            onChange={obtenerDatosReceta}
          >
            <option value="">- Selecciona Categoria -</option>
            {categorias.map((categoria) => (
              <option key={categoria.strCategory} value={categoria.strCategory}>
                {categoria.strCategory}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-5">
          <input
            type="submit"
            className="btn btn-block btn-primary"
            value="Buscar Bebidas"
          />
        </div>
        <div className="col-md-1"></div>
        {error ? (
          <div class="alert alert-primary w-100  mr-5 ml-5 mt-3" role="alert">
            Debe seleccionar una cartegoria
          </div>
        ) : null}
      </div>
    </form>
  );
};

export default Formulario;
