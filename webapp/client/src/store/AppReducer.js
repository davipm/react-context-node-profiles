export default (state, action) => {
  switch (action.type) {
    case 'GET_DEVS':
      return [...state, ...action.payload];
    case 'CREATE_DEV':
      return [...state, action.payload];
    case 'DELETE_DEV':
      return state.filter(item => item._id !== action.payload);
    default:
      return state;
  }
}
