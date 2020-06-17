import React, { useState, useEffect } from "react";
import api from "./services/api";
import DevForm from "./components/DevForm";
import DevItem from "./components/DevItem";

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDev() {
      try {
        const response = await api.get("/dev");
        setDevs(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    loadDev();
  }, []);

  async function handleAddDev(data) {
    try {
      const response = await api.post("/dev", data);
      setDevs([...devs, response.data]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="app">
      <aside className="aside">
        <strong className="aside__title">Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main className="app__main">
        <ul className="main__list">
          {devs.map((dev) => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
