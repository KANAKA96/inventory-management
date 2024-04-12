const initialState = {
  loading: false,
  data: [],
  error: null,
};

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_INVENTORY_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_INVENTORY_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case "FETCH_INVENTORY_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default inventoryReducer;
