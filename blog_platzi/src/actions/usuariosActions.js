import axios from 'axios';

//*Esto es una promesa por estar haciendo una petición HTTP GET
export const traerTodos = () =>  async (dispatch) => { //* Función que retorna otra función
  const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users');
  dispatch({ //* Este dispatch se comunicará con el reducer
    type: 'traer_usuarios', //!Tiene que llamarse exactamente igual al case del reducer
    payload: respuesta.data,
  });
}
