import React, { useState } from "react";

import { useGlobalState } from "../../store/GlobalState";
import usePosition from "../../hooks/usePosition";
import './styles.scss';

function DevForm() {
  const { createDev } = useGlobalState();
  const { latitude, longitude, onChange, clearPosition } = usePosition();
  const [github_username, setGithubUsername] = useState("");
  const [techs, setTechs] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    await createDev({
      github_username,
      techs,
      latitude,
      longitude,
    });

    setGithubUsername("");
    setTechs("");
    clearPosition();
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form__input--block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input
          type="text"
          name="github_username"
          id="github_username"
          required
          value={github_username}
          onChange={(event) => setGithubUsername(event.target.value)}
        />
      </div>

      <div className="form__input--block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          type="text"
          name="techs"
          id="techs"
          required
          value={techs}
          onChange={(event) => setTechs(event.target.value)}
        />
      </div>

      <div className="form__input--block">
        <label htmlFor="latitude">Latitude</label>
        <input
          type="text"
          name="latitude"
          id="latitude"
          required
          value={latitude}
          onChange={onChange}
        />
      </div>

      <div className="form__input--block">
        <label htmlFor="longitude">Longitude</label>
        <input
          type="text"
          name="longitude"
          id="longitude"
          required
          value={longitude}
          onChange={onChange}
        />
      </div>

      <button type="submit" className="form__submit">
        Salvar
      </button>
    </form>
  );
}

export default DevForm;
