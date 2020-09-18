import React, { useContext, useState } from "react";
import { CategoriasContext } from "../context/CategoriasContext.js";
import { IngredientesContext } from "../context/IngredientesContext.js";
import { RecetasContext } from "../context/RecetasContext.js";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const Formulario = () => {
  //config ui modal de materialize
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setError(false);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [busqueda, setBusqueda] = useState({
    tipo: "",
    categoria: "",
    ingrediente: "",
    nombrebebida: "",
  });
  const [error, setError] = useState(false);

  const { categorias } = useContext(CategoriasContext);
  const { buscarRecetas, setConsultar } = useContext(RecetasContext);
  const { ingredientes } = useContext(IngredientesContext);

  const obtenerDatosReceta = (e) => {
    setBusqueda({
      ...busqueda,
      tipo: e.target.name,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!busqueda[busqueda.tipo]) {
      setError(true);
      return;
    }
    setError(false);
    buscarRecetas(busqueda);
    setConsultar(true);
  };

  return (
    <div className="col-12 ">
      <fieldset className="text-center ">
        <legend>Busca bebidas por Categoria, Ingrediente o Nombre</legend>
      </fieldset>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            centered
            className="paddingCero"
          >
            <Tab label="Categorias" {...a11yProps(0)} />
            <Tab label="Ingrediente" {...a11yProps(1)} />
            {/* <Tab label="Nombre" {...a11yProps(2)} /> */}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <form className="col-12" onSubmit={handleSubmit}>
              <div className="row mt-2">
                <div className="col-md-6">
                  <select
                    name="categoria"
                    className="form-control"
                    onChange={obtenerDatosReceta}
                  >
                    <option value="">- Selecciona Categoria -</option>
                    {categorias.map((categoria) => (
                      <option
                        key={categoria.strCategory}
                        value={categoria.strCategory}
                      >
                        {categoria.strCategory}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <input
                    name="categoria"
                    type="submit"
                    className="btn btn-block btn-primary"
                    value="Buscar Bebidas"
                  />
                </div>
                {error ? (
                  <div
                    className="alert alert-primary w-100  mr-3 ml-3 mt-3"
                    role="alert"
                  >
                    Debe seleccionar una cartegoria
                  </div>
                ) : null}{" "}
              </div>
            </form>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <form className="col-12" onSubmit={handleSubmit}>
              <div className="row mt-2">
                <div className="col-md-6">
                  <select
                    name="ingrediente"
                    className="form-control"
                    onChange={obtenerDatosReceta}
                  >
                    <option value="">- Selecciona Ingrediente -</option>
                    {ingredientes.map((ingrediente) => (
                      <option
                        key={ingrediente.strIngredient1}
                        value={ingrediente.strIngredient1}
                      >
                        {ingrediente.strIngredient1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <input
                    type="submit"
                    className="btn btn-block btn-primary"
                    value="Buscar Bebidas"
                  />
                </div>
                {error ? (
                  <div
                    className="alert alert-primary w-100  mr-3 ml-3 mt-3"
                    role="alert"
                  >
                    Debe ingresar un ingrediente
                  </div>
                ) : null}
              </div>
            </form>
          </TabPanel>
          {/* <TabPanel value={value} index={2} dir={theme.direction}>
            <form className="col-12" onSubmit={handleSubmit}>
              <div className="row mt-2">
                <div className="col-md-6">
                  <input
                    name="nombrebebida"
                    className="form-control"
                    type="text"
                    placeholder="Bucar por nombre"
                    onChange={obtenerDatosReceta}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="submit"
                    className="btn btn-block btn-primary"
                    value="Buscar Bebidas"
                  />
                </div>
                {error ? (
                  <div
                    className="alert alert-primary w-100  mr-3 ml-3 mt-3"
                    role="alert"
                  >
                    Debe ingresar una busqueda
                  </div>
                ) : null}
              </div>
            </form>
          </TabPanel> */}
        </SwipeableViews>
      </div>
    </div>
  );
};

export default Formulario;
