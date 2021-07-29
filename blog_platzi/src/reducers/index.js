import { combineReducers } from "redux";
import usuariosReducers from "./usuariosReducers";
import publicacionesReducer from "./publicacionesReducer";
import tareasReducer from "./tareasReducer";

export default combineReducers({
  usuariosReducers,
  publicacionesReducer,
  tareasReducer
});