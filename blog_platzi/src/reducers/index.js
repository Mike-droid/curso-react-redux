import { combineReducers } from "redux";
import usuariosReducers from "./usuariosReducers";
import publicacionesReducer from "./publicacionesReducer";

export default combineReducers({
  usuariosReducers,
  publicacionesReducer
});