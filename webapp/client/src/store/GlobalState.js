import React, { createContext, useContext, useReducer, useEffect } from 'react';

import AppReducer from "./AppReducer";
import api from "../services/api";

const initialState = [];
const GlobalContext = createContext([]);

function GlobalState({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    async function loadDev() {
      try {
        const response = await api.get("/dev");
        dispatch({
          type: 'GET_DEVS',
          payload: response.data
        });
      } catch (error) {
        console.log(error);
      }
    }

    loadDev();
  }, []);

  async function createDev(data) {
    try {
      const response = await api.post("/dev", data);
      dispatch({
        type: 'CREATE_DEV',
        payload: response.data
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteDev(id) {
    try {
      await api.delete(`/dev/${id}`);
      dispatch({
        type: 'DELETE_DEV',
        payload: id
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <GlobalContext.Provider value={{ state, createDev, deleteDev }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;

export function useGlobalState() {
  return useContext(GlobalContext);
}
