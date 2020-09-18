import React from "react";
import Header from "./components/Header.js";
import Formulario from "./components/Formulario.js";
import ListaRecetas from "./components/ListaRecetas.js";

import CategoriasProvider from "./context/CategoriasContext.js";
import IngredientesProvider from "./context/IngredientesContext.js";
import RecetasProvider from "./context/RecetasContext.js";
import ModalProvider from "./context/ModalContext.js";

function App() {
  return (
    <CategoriasProvider>
      <IngredientesProvider>
        <RecetasProvider>
          <ModalProvider>
            <Header />
            <div className="container mt-5">
              <div className="row">
                <Formulario />
              </div>
              <ListaRecetas />
            </div>
          </ModalProvider>
        </RecetasProvider>
      </IngredientesProvider>
    </CategoriasProvider>
  );
}

export default App;
