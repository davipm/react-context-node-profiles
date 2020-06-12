import { useState, useEffect } from 'react';

function usePosition() {
  const [position, setPosition] = useState({});

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 3000 });
    } else {
      alert('You browser dont support geolocation');
    }
  }, []);

  function onSuccess({ coords }) {
    const { latitude, longitude } = coords;
    setPosition({ latitude, longitude });
  }

  function onError(error) {
    console.warn(error.message);
  }

  return { ...position, setPosition };
}

export default usePosition;
