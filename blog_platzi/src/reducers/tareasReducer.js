import {
  TRAER_TODAS,
  CAMBIO_USUARIO_ID,
  CAMBIO_TITULO,
  GUARDAR,
  CARGANDO,
  ERROR,
  ACTUALIZAR,
  LIMPIAR
} from '../types/tareasTypes';

const INITIAL_STATE = {
  tareas: {},
  cargando: false,
  error: '',
  usuario_id: '',
  titulo: '',
  regresar: false
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => { //* El estado es el initial state que regresa una función
  //!Se crea el switch porque llegarán varias tareas y solo se distingue por el nombre
  switch(action.type) {
    case TRAER_TODAS:
      return { ...state, tareas: action.payload, cargando: false, error: '', regresar: false };

    case CARGANDO:
      return { ...state, cargando: true};

    case ERROR:
      return { ...state, error: action.payload, cargando: false };

    case CAMBIO_USUARIO_ID:
      return { ...state, usuario_id: action.payload };

    case CAMBIO_TITULO:
      return { ...state, titulo: action.payload };

    case GUARDAR:
      return { ...state, tareas: {}, cargando: false, error: '', regresar: true, usuario_id: '', titulo: '' };

    case ACTUALIZAR:
      return { ...state, tareas: action.payload };

    case LIMPIAR:
      return { ...state, usuario_id: '', titulo: '' }

    default: return state;
  }
}
