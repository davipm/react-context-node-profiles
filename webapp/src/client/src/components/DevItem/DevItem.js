import React from "react";
import style from "./devItem.module.scss";

function DevItem({ dev }) {
  return (
    <li className={style.devItem}>
      <header className={style.devHeader}>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className={style.devUserInfo}>
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(", ")}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a
        href={`https://github.com/${dev.github_username}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Acessar perfil no Github
      </a>
    </li>
  );
}

export default DevItem;
