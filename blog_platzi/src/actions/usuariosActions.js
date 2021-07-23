import axios from 'axios';
import { TRAER_TODOS, CARGANDO, ERROR } from '../types/usuariosTypes';

//*Esto es una promesa por estar haciendo una petición HTTP GET
export const traerTodos = () =>  async (dispatch) => { //* Función que retorna otra función
  dispatch({
    type: CARGANDO
  });

  try {
    const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users');
    dispatch({ //* Este dispatch se comunicará con el reducer
      type: TRAER_TODOS,
      payload: respuesta.data,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    dispatch({
      type: ERROR,
      payload: 'Algo salió mal. Intente más tarde.',
    })
  }
}
