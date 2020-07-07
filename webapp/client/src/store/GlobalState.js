import React, { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import AppReducer from "./AppReducer";
import api from "../services/api";
import { GET_DEVS, DELETE_DEV, CREATE_DEV, FETCH, ERROR } from "./actionTypes";

const initialState = {
  loading: null,
  error: null,
  items: [],
};

const GlobalContext = createContext(initialState);

function GlobalState({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    (async function loadDev() {
      dispatch({ type: FETCH });
      try {
        const response = await api.get("/dev");
        dispatch({ type: GET_DEVS, payload: response.data });
      } catch (error) {
        dispatch({ type: ERROR });
        toast.error(`${error}`);
      }
    })();
  }, []);

  async function createDev(data) {
    try {
      const response = await api.post("/dev", data);
      dispatch({
        type: CREATE_DEV,
        payload: response.data,
      });
      toast.success("Dev save!");
    } catch (error) {
      toast.error(`${error}`);
    }
  }

  async function deleteDev(id) {
    try {
      await api.delete(`/dev/${id}`);
      dispatch({
        type: DELETE_DEV,
        payload: id,
      });
      toast.success("Dev Deleted!");
    } catch (error) {
      toast.error(`${error}`);
    }
  }

  return (
    <GlobalContext.Provider value={{ ...state, createDev, deleteDev }}>
      {children}
    </GlobalContext.Provider>
  );
}

GlobalState.propTypes = {
  children: PropTypes.any.isRequired,
};

export default GlobalState;

export function useGlobalState() {
  return useContext(GlobalContext);
}
