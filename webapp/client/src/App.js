import React from "react";

import { useGlobalState } from "./store/GlobalState";
import DevForm from "./components/DevForm";
import DevItem from "./components/DevItem";

function App() {
  const { state } = useGlobalState();

  return (
    <div id="app">
      <aside className="aside">
        <strong className="aside__title">Cadastrar</strong>
        <DevForm />
      </aside>

      <main className="app__main">
        <ul className="main__list">
          {state.map((dev) => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
