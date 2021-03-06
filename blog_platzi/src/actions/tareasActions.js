import axios from 'axios';
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

//*Esto es una promesa por estar haciendo una petición HTTP GET
export const traerTodas = () =>  async (dispatch) => { //* Función que retorna otra función
  dispatch({
    type: CARGANDO
  });

  try {
    const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos');

    const tareas = {};
    respuesta.data.map((task) => (
      tareas[task.userId] = { //* Al objeto vacío de tareas le agregamos un atributo, el task.userId
        ...tareas[task.userId], //*Lo hacemos inmutable
        [task.id]: {
          ...task
        }
      }
    ));

    dispatch({ //* Este dispatch se comunicará con el reducer
      type: TRAER_TODAS,
      payload: tareas,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    dispatch({
      type: ERROR,
      payload: 'Información de tareas no disponible',
    });
  }
}

export const cambioUsuarioId = (usuario_id) => (dispatch) => {
  dispatch({
    type: CAMBIO_USUARIO_ID,
    payload: usuario_id
  });
}

export const cambioTitulo = (titulo) => (dispatch) => {
  dispatch({
    type: CAMBIO_TITULO,
    payload: titulo
  });
}

export const agregar = (nueva_tarea) => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });

  try {
    const respuesta = await axios.post('https://jsonplaceholder.typicode.com/todos', nueva_tarea);
    dispatch({
      type: GUARDAR,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    dispatch({
      type: ERROR,
      payload: 'Intente más tarde',
    });
  }
}

export const editar = (tarea_editada) => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });

  try {
    const respuesta = await axios.put(`https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`,
    tarea_editada);
    dispatch({
      type: GUARDAR,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    dispatch({
      type: ERROR,
      payload: 'Intente más tarde',
    });
  }
}

export const cambioCheck = (usuario_id, tarea_id) => (dispatch, getState) => {
  const {tareas} = getState().tareasReducer;
  const seleccionada = tareas[usuario_id][tarea_id];

  const actualizadas = {
    ...tareas
  }

  actualizadas[usuario_id] = {
    ...tareas[usuario_id]
  }

  actualizadas[usuario_id][tarea_id] = {
    ...tareas[usuario_id][tarea_id],
    completed: !seleccionada.completed
  }

  dispatch({
    type: ACTUALIZAR,
    payload: actualizadas
  })
}

export const eliminar = (tarea_id) => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });

  try {
    const respuesta = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${tarea_id}`);
    dispatch({
      type: TRAER_TODAS,
      payload: {},
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    dispatch({
      type: ERROR,
      payload: 'Servicio no disponible',
    });
  }
}

export const limpiarForma = () => (dispatch) => {
  dispatch({
    type: LIMPIAR,
  })
}