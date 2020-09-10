import React, { useContext, useState } from "react";
import { ModalContext } from "../context/ModalContext.js";

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
//import { light } from "@material-ui/core/styles/createPalette";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 800,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Receta = ({ receta }) => {
  //config ui modal de materialize
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { informacion, setIdreceta, setReceta } = useContext(ModalContext);

  const mostarIngredientes = (informacion) => {
    let ingredientes = [];
    for (let i = 1; i < 16; i++) {
      if (informacion[`strIngredient${i}`]) {
        ingredientes.push(
          <li key={i}>
            {informacion[`strIngredient${i}`]} {informacion[`strMeasure${i}`]}
          </li>
        );
      }
    }
    return ingredientes;
  };
  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{receta.strDrink}</h2>
        <img
          src={receta.strDrinkThumb}
          alt={`Imagende ${receta.strDrink}`}
          className="card-img-top"
        />

        <div className="card-body">
          <button
            className="btn btn-block btn-primary"
            name="ver"
            onClick={() => {
              setIdreceta(receta.idDrink);
              handleOpen();
            }}
          >
            Ver Receta
          </button>
          <Modal
            open={open}
            onClose={() => {
              setIdreceta(null);
              setReceta({});
              handleClose();
            }}
          >
            <div style={modalStyle} className={classes.paper}>
              <h2>{informacion.strDrink}</h2>
              <div className="row justify-content-around">
                <div className="col-md-5 off mb-1">
                  <h3>Instrucciones</h3>
                  <p>{informacion.strInstructions}</p>
                </div>

                <div className="col-md-5 mb-1">
                  <h3>Ingredientes y cantidades</h3>
                  <ul>{mostarIngredientes(informacion)}</ul>
                  <img
                    src={informacion.strDrinkThumb}
                    alt={`Imagen de ${informacion.strDrink}`}
                    className="img-fluid my-4"
                  />
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Receta;
