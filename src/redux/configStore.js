import { combineReducers, createStore } from "redux";
import { productsReducer } from "./reducers/productsReducer";
import { userReducer } from "./reducers/userReducer";
import { warehouseReducer } from "./reducers/warehouseReducer";
import { exportGoodsReducer } from "./reducers/exportGoodsReducer";

const rootReducer = combineReducers({
  productsReducer: productsReducer,
  userReducer: userReducer,
  warehouseReducer: warehouseReducer,
  exportGoodsReducer: exportGoodsReducer,
});

export const store = createStore(rootReducer);
