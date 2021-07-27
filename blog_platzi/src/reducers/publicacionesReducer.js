import {
  ACTUALIZAR,
  CARGANDO,
  ERROR,
  COMENTARIO_CARGANDO,
  COMENTARIO_ERROR,
  COMENTARIO_ACTUALIZAR
} from '../types/publicacionesTypes';

const INITIAL_STATE = {
  publicaciones: [],
  cargando: false,
  error: '',
  comentario_cargando: false,
  comentario_error: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => { //* El estado es el initial state que regresa una función
  //!Se crea el switch porque llegarán varias tareas y solo se distingue por el nombre
  switch(action.type) {
    case ACTUALIZAR:
      return { ...state, publicaciones: action.payload, cargando: false, error: '' };

    case CARGANDO:
      return { ...state, cargando: true};

    case ERROR:
      return { ...state, error: action.payload, cargando: false };

      case COMENTARIO_ACTUALIZAR:
        return { ...state, publicaciones: action.payload, comentario_cargando: false, comentario_error: '' };

      case COMENTARIO_CARGANDO:
        return { ...state, comentario_cargando: true};

      case COMENTARIO_ERROR:
        return { ...state, comentario_error: action.payload, comentario_cargando: false };

    default: return state;
  }
}
