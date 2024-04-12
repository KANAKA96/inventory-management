import { combineReducers } from "redux";
import inventoryReducer from "./reducer";

const rootReducer = combineReducers({
  inventory: inventoryReducer,
});

export default rootReducer;
