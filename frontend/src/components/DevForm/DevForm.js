import React, { useState, useEffect } from "react";

function DevForm({ onSubmit }) {
  const [github_username, setGithubUsername] = useState("");
  const [techs, setTechs] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const options = {
    timeout: 3000
  }

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    } else {
      alert('You browser dont support geolocation');
    }
  }, []);

  function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    setLatitude(latitude);
    setLongitude(longitude);
  }

  function onError(error) {
    console.warn(error.message);
  }

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
    setLongitude("");
    setLatitude("");
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
          onChange={(event) => setLatitude(event.target.value)}
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
          onChange={(event) => setLongitude(event.target.value)}
        />
      </div>

      <button type="submit" className="form__submit">
        Salvar
      </button>
    </form>
  );
}

export default DevForm;
