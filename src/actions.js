import axios from "axios";

export const fetchInventoryRequest = () => ({
  type: "FETCH_INVENTORY_REQUEST",
});

export const fetchInventorySuccess = (data) => ({
  type: "FETCH_INVENTORY_SUCCESS",
  payload: data,
});

export const fetchInventoryFailure = (error) => ({
  type: "FETCH_INVENTORY_FAILURE",
  payload: error,
});

export const fetchInventory = () => {
  return async (dispatch) => {
    dispatch(fetchInventoryRequest());
    try {
      const response = await axios.get(
        "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
      );
      dispatch(fetchInventorySuccess(response?.data));
    } catch (error) {
      dispatch(fetchInventoryFailure(error?.message));
    }
  };
};
