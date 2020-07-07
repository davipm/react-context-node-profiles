import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useGlobalState } from "./store/GlobalState";
import DevForm from "./components/DevForm";
import DevItem from "./components/DevItem";

function App() {
  const { items, loading, error } = useGlobalState();

  return (
    <div id="app">
      <aside className="aside">
        <strong className="aside__title">Cadastrar</strong>
        <DevForm />
      </aside>

      <main className="app__main">
        {loading && <h3>Loading...</h3>}
        {error && <h3>Error!</h3>}

        <ul className="main__list">
          {items.map((dev) => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>

      <ToastContainer
        position="top-right"
        hideProgressBar={true}
        autoClose={2000}
      />
    </div>
  );
}

export default App;
