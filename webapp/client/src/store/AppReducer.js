import { GET_DEVS, DELETE_DEV, CREATE_DEV, ERROR, FETCH } from "./actionTypes";

export default (state, action) => {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        loading: true,
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case GET_DEVS:
      return {
        ...state,
        loading: false,
        items: [...state.items, ...action.payload],
      };
    case CREATE_DEV:
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload],
      };
    case DELETE_DEV:
      return {
        ...state,
        loading: false,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    default:
      return state;
  }
};
