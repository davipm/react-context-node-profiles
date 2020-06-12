import React, { useState } from "react";
import usePosition from "../../hooks/usePosition";

function DevForm({ onSubmit }) {
  const { latitude, longitude, setPosition } = usePosition();
  const [github_username, setGithubUsername] = useState("");
  const [techs, setTechs] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude,
    });

    setGithubUsername("");
    setTechs("");
    setPosition({});
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form__input--block">
        <label htmlFor="githubUsername">Usuário do Github</label>
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
        <label htmlFor="githubUsername">Tecnologias</label>
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
        <label htmlFor="githubUsername">Latitude</label>
        <input
          type="number"
          name="latitude"
          id="latitude"
          required
          value={latitude}
          onChange={(event) => setPosition({ latitude: event.target.value })}
        />
      </div>

      <div className="form__input--block">
        <label htmlFor="githubUsername">Longitude</label>
        <input
          type="number"
          name="longitude"
          id="longitude"
          required
          value={longitude}
          onChange={(event) => setPosition({ longitude: event.target.value })}
        />
      </div>

      <button type="submit" className="form__submit">
        Salvar
      </button>
    </form>
  );
}

export default DevForm;
