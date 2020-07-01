import { useReducer, useEffect } from "react";

const initial = {
  latitude: '',
  longitude: ''
};

function usePosition() {
  const [position, setPosition] = useReducer((state, newState) => ({...state, ...newState}), initial);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        timeout: 3000,
      });
    } else {
      alert("You browser dont support geolocation");
    }
  }, []);

  function onSuccess({ coords }) {
    const { latitude, longitude } = coords;
    setPosition({ latitude, longitude });
  }

  function onError(error) {
    console.warn(error.message);
  }

  function onChange(event) {
    const { name, value } = event.target;
    setPosition({ [name]: value });
  }

  function clearPosition() {
    setPosition(initial);
  }

  return { ...position, onChange, clearPosition };
}

export default usePosition;
