import React from "react";
import PropTypes from "prop-types";
import styles from "./devItem.module.scss";

import { useGlobalState } from "../../store/GlobalState";

function DevItem({ dev }) {
  const { deleteDev } = useGlobalState();

  return (
    <li className={styles.devItem}>
      <span
        onClick={() => deleteDev(dev._id)}
        title="Delete Dev"
        aria-label="Delete Dev"
      >
        X
      </span>
      <header className={styles.devHeader}>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className={styles.devUserInfo}>
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

DevItem.propTypes = {
  dev: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bio: PropTypes.string,
    techs: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default DevItem;
