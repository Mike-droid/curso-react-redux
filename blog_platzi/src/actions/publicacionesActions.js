import axios from "axios";
import {
  ACTUALIZAR,
  CARGANDO,
  ERROR,
  COMENTARIO_CARGANDO,
  COMENTARIO_ERROR,
  COMENTARIO_ACTUALIZAR
} from '../types/publicacionesTypes';
import * as usuariosTypes from '../types/usuariosTypes';

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes;

export const traerPorUsuario = (key) => async (dispatch, getState) => {

  dispatch({ type: CARGANDO });

  const { usuarios } = getState().usuariosReducers;
  const { publicaciones } = getState().publicacionesReducer;
  const usuario_id = usuarios[key].id;

  try {
    const respuesta = await axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`);

    const nuevas = respuesta.data.map((publicacion) => ({
      ...publicacion,
      comentarios: [],
      abierto: false
    }
    ))

    const publicaciones_actualizadas = [
      ...publicaciones,
      nuevas
    ];

    dispatch({
      type: ACTUALIZAR,
      payload: publicaciones_actualizadas
    });

    //* Última publicación de usuario
    const publicaciones_key = publicaciones_actualizadas.length - 1;

    const usuarios_actualizados = [...usuarios];
      usuarios_actualizados[key] = {
        ...usuarios[key],
        publicaciones_key
      }

    dispatch({
      type: USUARIOS_TRAER_TODOS,
      payload: usuarios_actualizados
    });

  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: 'Publicaciones no disponibles'
    });
  }
}

export const abrirCerrar = (pub_key, comentario_key) => (dispatch, getState) => {
  //* Traer el estado actual y modificar el "abiero" a "cerrado" y vicecersa
  const { publicaciones } = getState().publicacionesReducer;
  const seleccionada = publicaciones[pub_key][comentario_key];

  const actualizada = {
    ...seleccionada,
    abierto: !seleccionada.abierto
  };

  const publicaciones_actualizadas = [...publicaciones];
  publicaciones_actualizadas[pub_key] = [...publicaciones[pub_key]];
  publicaciones_actualizadas[pub_key][comentario_key] = actualizada;

  dispatch({
    type: ACTUALIZAR,
    payload: publicaciones_actualizadas
  });
}

export const traerComentarios = (pub_key, comentario_key) => async (dispatch, getState) => {
  // Buscar comentarios y colocar donde corresponden

  dispatch({ type: COMENTARIO_CARGANDO });

  const { publicaciones } = getState().publicacionesReducer;
  const seleccionada = publicaciones[pub_key][comentario_key];

  try {
    const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`);

    const actualizada = {
      ...seleccionada,
      comentarios: respuesta.data
    };

    const publicaciones_actualizadas = [...publicaciones];
    publicaciones_actualizadas[pub_key] = [...publicaciones[pub_key]];
    publicaciones_actualizadas[pub_key][comentario_key] = actualizada;

    dispatch({
      type: COMENTARIO_ACTUALIZAR,
      payload: publicaciones_actualizadas
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: COMENTARIO_ERROR,
      payload: 'Comentarios no disponibles'
    });
  }
}