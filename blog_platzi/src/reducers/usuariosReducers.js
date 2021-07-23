import { TRAER_TODOS, CARGANDO, ERROR } from '../types/usuariosTypes';

const INITIAL_STATE = {
  usuarios: [],
  cargando: false,
  error: ''
};

export default (state = INITIAL_STATE, action) => { //* El estado es el initial state que regresa una función
  //!Se crea el switch porque llegarán varias tareas y solo se distingue por el nombre
  switch(action.type) {
    case TRAER_TODOS:
      return { ...state, usuarios: action.payload, cargando: false };
    case CARGANDO:
      return { ...state, cargando: true};
    case ERROR:
      return { ...state, error: action.payload, cargando: false };
    default: return state;
  }
}
