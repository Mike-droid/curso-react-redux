# Curso de Redux por Bedu

> “Todos los grandes desarrolladores llegaron ahí resolviendo problemas que no estaban calificados para resolver, hasta que en realidad lo hicieron.” Patrick McKenzie

Conocimientos previos necesarios:

- HTML, CSS
- Fundamentos de JavaScript
- React JS

## Repaso React

### ¿Qué es React y cómo funciona?

- Librería -> Fácil desarrollo de una tarea en específico.
- Intercaes -> Lo que se ve en la pantalla y con lo que interactua el usuario.
- Componentes -> Hazlo una vez, úsalo cuantas veces quieras.

React tiene alta demanda por ser de *peso ligero*, *alto rendimiento* y está en *constante mantenimiento*.

JSX es la sintaxís con la que escribimos código dentro de React. Es como una fusión entre HTML y JS.

```js
DoStuff((thing) => {
  this.isAwesome(thing); //😄
});
```

EcmaScript 6

- Diferente
- 2015
- React
- NodeJS

React usa el Virtual DOM, una copia del DOM.

### Preparar el entorno de trabajo

Descarga Node JS.

### Creación de la app con React

- Creamos proyecto: `npx create-react-app nombre_del_proyecto`
- Entramos a la carpeta del proyecto: `cd nombre_del_proyecto`
- Ejecutamos: `npm run start`

### Agregando funciones a la app con React

```js
const ponerFilas = () => [
    // código chido
  ]

  <tbody>
    {ponerFilas()}
  </tbody>
```

### Stateful vs Stateless

Todas las `const nombre = (props) => {}` son **componentes stateless** o funcionales y no manejan estado.

**Componente de clase**: `class App extends Component {} render(){}`

### Ciclo de vida de React

4 fases por las que un componente pasa:

1. Initialization -> setup props and state
2. Mounting -> componentWillMount -> render -> componentDidMount
3. Updation -> props -> componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate | states -> shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate
4. Unmouting -> componentWillUnmount

Todo stateful component debe tener render.

### Manejando promesas

Usando axios, async await y hooks:

```javascript
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        setUsers(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUsers()
  }, [])

    return (
      <div className="margen">
        <table className="tabla">
        <thead>
          <tr>
            <th>Name</th>
            <th>Correo</th>
            <th>Enlace</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key = {user.id} >
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    )
}

export default App
```

### React Router DOM

### ¿Qué es Redux, cuándo usarlo y por qué?

Redux es una herramienta de uso libre que nos deja almacenar todo nuestro estado de la aplicación en un solo lugar.

Principios:

- Almacenamiento -> Es para los estados.
- Inmutables -> No se pueden modificar los estados. Solo se crean nuevos.
- Centralizado -> Todo estado está en un lugar.

¿Cuándo usarlo?

Se recomienda usarlo en aplicaciones grandes, donde sea compartida con muchos componentes.

También para compartir información entre componentes.

Estados, no formatos.

## Fases de Redux

### Introducción: las fases de Redux

4 pilares:

1. Store -> Almacenamiento (Toda la información, todos los estados)
2. Reducers -> Estados (Dependendiendo del componente)
3. Actions Creators -> Funciones (Pedimos información, normalmente son promesas)
4. Componente -> Código JSX (React)

El *componente* se comunica con el *action creator* y este se va al *reducer* y le da información que necesita. Cuando es actualizado, regresa al componente con el nuevo estado. El corazón de Redux es el *almacenamiento*.

[Gif que explica Redux](https://redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif).

### Store

Hay que instalar `npm i redux react-redux`.

Agregamos al archivo index.js:

```js
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(
  {}, // Todos los reducers
  {}, // Estado inicial
);
```

Esto da un error porque por el momento están vacíos los reducers.

### Reducers

Los reducers son funciones puras que reciben como parámetros, el **estado inicial** y una **acción**.

Creamos el primer reducer, llamado "usuariosReducer.js":

```js
const INITIAL_STATE = {
  usuarios: [],
};

export default (state = INITIAL_STATE, action) => { //* El estado es el initial state que regresa una función
  switch(action.type) {
    case 'traer_usuarios':
      return { ...state, usuarios: action.payload }

    default: return state;
  }
}

```

Y esto lo importamos en index.js de la carpeta reducers:

```js
import { combineReducers } from "redux";
import usuariosReducers from "./usuariosReducers";

export default combineReducers({
  usuariosReducers
});
```

### Conexión a un componente

```js
const mapStateToProps = (reducers) => {
  return reducers.usuariosReducers;
}

export default connect(mapStateToProps, {/*Actions*/})(Users);
```

El primer parametro es: todos los reducers que el proveedor le va a entregar al User.

[Redux for begginers | React Redux Tutorial](https://www.youtube.com/watch?v=CVpUuw9XSjY)

### Actions Creators

Los actions creators se encargan de **traer la información**.

[7 steps to understand React Redux](https://dev.to/ibrahima92/7-steps-to-understand-react-redux-121j).

Creamos una carpeta 'actions' y dentro el archivo 'usuariosActions.js':

```js
export const traerTodos = () => (dispatch) => { //* Función que retorna otra función
  dispatch({
    type: 'traer_usuarios', //*Tiene que llamarse exactamente igual al case del reducer
    payload: [1,2,3]
  })
}
```

### Redux Thunk

Las acciones deben ser plain objetcs. Tenemos que usar redux-thunk: `npm i redux-thunk`. Este redux-thunk lo vamos a aplicar al *almacenamiento* como un **middleware**.

Este será el tercer parametro de la store.

index.js dentro de src:

```js
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';

const store = createStore(
  reducers, // Todos los reducers
  {}, // Estado inicial
  applyMiddleware(reduxThunk) // Middleware
);
```

Para recordar: Tenemos componente. Inicia vacío, luego en `componentDidMount() { this.props.traerTodos(); }` le decimos que vaya a la acción, esta acción la verifica con Reducer y tiene que regresar el payload, que en este caso es la llamada al json de usuarios.

Acción:

```js
import axios from 'axios';

export const traerTodos = () =>  async (dispatch) => { //* Función que retorna otra función
  const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users');
  dispatch({
    type: 'traer_usuarios', //!Tiene que llamarse exactamente igual al case del reducer
    payload: respuesta.data,
  });
}

```

Un middleware actúa como un puente entre un sistema operativo o base de datos y aplicaciones. En este caso específico, un thunk es una función que actúa como un wrapper ya que envuelve una expresión para retrasar su evaluación.

Redux-thunk te permite escribir creadores de acciones que retornan una función en vez de un objeto de acción típico. Entonces, el thunk puede ser usado para retrasar el envío de una acción hasta que se cumpla una línea de código asíncrona.

[Cómo funciona Redux Thunk](https://platzi.com/blog/como-funciona-redux-thunk/).

### Explicación teórica: ciclo completo de Redux

1. El componente (JSX) se comunica con las acciones.
2. La acciones hablan con el reducer.
3. El reducer se comunica con el componente.
4. Volvemos al paso 1.

JSX carga la vista, llama al **action creator** gracias al `this.props.functionName()`. El action creator tiene una **promesa**, la cual va y modifica al **reducer**(estado) gracias al `dispatch`. Finalmente el estado actualiza al JSX gracias al `mapStateToProps`.

### Práctica: ciclo completo de Redux

Resumen de lo que escribí arriba.

## Fases Extra

### Archivos Types

Estas fases no son obligatorias pero sí son altamente recomendables al utiliza Redux.

Le damos más robustes al proyecto con la siguiente estrutura:

Creamos una carpeta "types" justo dentro de src, y creamos el archivo "usuariosTypes.js" (para este ejemplo).

```js
export const TRAER_TODOS = 'traer_todos';
```

Vamos a hacer referencia a este archivo en el archivo de actions y reducers:

usuariosActions.js:

```js
import axios from 'axios';
import { TRAER_TODOS } from '../types/usuariosTypes';

//*Esto es una promesa por estar haciendo una petición HTTP GET
export const traerTodos = () =>  async (dispatch) => { //* Función que retorna otra función
  const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users');
  dispatch({ //* Este dispatch se comunicará con el reducer
    type: TRAER_TODOS,
    payload: respuesta.data,
  });
}

```

usuariosReducers.js:

```js
import { TRAER_TODOS } from '../types/usuariosTypes';

const INITIAL_STATE = {
  usuarios: [],
};

export default (state = INITIAL_STATE, action) => { //* El estado es el initial state que regresa una función
  //!Se crea el switch porque llegarán varias tareas y solo se distingue por el nombre
  switch(action.type) {
    case TRAER_TODOS:
      return { ...state, usuarios: action.payload }
    default: return state;
  }
}
```

Esto es una excelente práctica.

### Try Catch

El try catch no podía quedarse afuera, esto es para manejar las execepciones y cuando traemos información de una API es obligatorio
usarlo por buenas prácticas.

usuariosActions.js:

```js
export const traerTodos = () =>  async (dispatch) => { //* Función que retorna otra función
  try {
    const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users');
    dispatch({ //* Este dispatch se comunicará con el reducer
      type: TRAER_TODOS,
      payload: respuesta.data,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}
```

### Escenarios asíncronos

Siempre debemos de manejar los casos de:

1. Cuando está cargando
2. Cuando fue exitoso
3. Cuando hay un error

Nuestro sitio está cargando información cuando entramos a una página.

Lo que haremos es mostrar cuando la información está cargando, cuando hay éxito y cuando hay error:

usuariosTypes.js:

```js
export const TRAER_TODOS = 'traer_todos';
export const CARGANDO = 'cargando';
export const ERROR = 'error';
```

usuariosReducers.js:

```js
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
```

usuariosActions.js:

```js
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
      payload: error.message,
    })
  }
}
```

### Componente Spinner

[Pure CSS Loader](https://loading.io/css)

Le vamos a decir al usuario que la información está cargando con el uso de animaciones.

Podemos tomar de la página web cualquier Spinner o Loader que querramos en nuestro proyecto.

Copiamos el código CSS y este lo guardaremos como un componente, así que creamos una carpeta "css" y dentro
hacemos el archivo "loader.css".

Luego copiamos el código HTML, esté será guardado dentro la carpeta "General", dentro de la carpeta "components".

Loader.js:

```js
import React from 'react';
import '../../css/loader.css';

const Loader = (props) => (
  <div className="center">
    // Código del Loader
  </div>
);

export default Loader;
```

Modificamos el archivo index.js de la carpeta users:

```js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../General/Loader';
import * as usuariosActions from '../../actions/usuariosActions';

class Users extends Component {

  componentDidMount() {
    this.props.traerTodos();
  }

  ponerContenido = () => {
    if (this.props.cargando) {
      return <Loader />;
    }

    return(
      <table className="tabla">
        <thead>
          <tr>
            <th>Name</th>
            <th>Correo</th>
            <th>Enlace</th>
          </tr>
        </thead>
        <tbody>
          { this.ponerFilas() }
        </tbody>
      </table>
    )
  }

  //* Por cada usuario, tendré una fila
  ponerFilas = () => this.props.usuarios.map((usuario) => (
    <tr key={ usuario.id }>
      <td>{ usuario.name }</td>
      <td>{ usuario.email }</td>
      <td>{ usuario.website }</td>
  </tr>
  ))

  render(){
    return (
      <div>
        { this.ponerContenido() }
      </div>
    )
  }

}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducers;
}

export default connect(mapStateToProps, usuariosActions)(Users);
```

Con esto tenemos un Loader que se va a mostrar cuando estamos cargando información.

### Componente Fatal

Creamos el componente para mostrar un mensaje de error.

El componente se llamará "Fatal.js" y estará dentro de la carpeta "components".

```js
import React from 'react'

const Fatal = (props) => (
  <h2 className="center rojo">
    { props.mensaje }
  </h2>
)

export default Fatal
```

En el index.js de los usuarios:

```js
if (this.props.error) {
  return <Fatal mensaje={ this.props.error } />;
}
```

En usuariosActions.js podemos dar un mensaje personalizado:

```js
dispatch({
  type: ERROR,
  payload: 'Algo salió mal. Intente más tarde.',
})
```

### Tabla como componente

El `this` solamente se utiliza cuando estamos en un componente clase.

Creamos un componente llamado 'Tabla.js':

```js
import React from 'react'
import { connect } from 'react-redux'

const Tabla = (props) => {
  /* Por cada usuario, tendré una fila */
  const ponerFilas = () => props.usuarios.map((usuario) => (
    <tr key={ usuario.id }>
			<td>
				{ usuario.name }
			</td>
			<td>
				{ usuario.email }
			</td>
			<td>
				{ usuario.website }
			</td>
		</tr>
  ))

  return (
    <div>
      <table className="tabla">
        <thead>
          <tr>
            <th>Name</th>
            <th>Correo</th>
            <th>Enlace</th>
          </tr>
        </thead>
        <tbody>
          { ponerFilas() }
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer
}

export default connect(mapStateToProps)(Tabla)
```

Modificamos el index.js de los usuarios:

```js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../General/Loader';
import Fatal from '../General/Fatal';
import Tabla from './Tabla';
import * as usuariosActions from '../../actions/usuariosActions';

class Users extends Component {

  componentDidMount() {
    this.props.traerTodos();
  }

  ponerContenido = () => {
    if (this.props.cargando) {
      return <Loader />;
    }

    if (this.props.error) {
      return <Fatal mensaje={ this.props.error } />;
    }

    return <Tabla usuarios={this.props.usuarios} />;
  }

  render(){
    return (
      <div>
        <h1>Usuarios</h1>
        { this.ponerContenido() }
      </div>
    )
  }

}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducers;
}

export default connect(mapStateToProps, usuariosActions)(Users);
```

## Compartir información en Redux

### Introducción a Compartir información en Redux

### Parámetros por URL

[Iconos - CSS ICON animate](https://cssicon.space/#/)

Creamos la carpeta "Publicaciones" dentro de "components":

Dentro de ella tendremos el archivo index.js:

```js
import React, { Component } from 'react'

export default class Publicaciones extends Component {
  render() {
    return (
      <div>
        { this.props.match.params.key }
        {/*  Usamos this porque es una clase */}
      </div>
    )
  }
}

```

Conseguimos un CSS como icono:

```html
<div className="eye-solid icon"></div>
```

```css
.eye-solid.icon {
  color: #000;
  /* position: absolute; */
  margin-left: 3px;
  margin-top: 3px;
  width: 12px;
  height: 12px;
  border-radius: 70% 15%;
  border: solid 1px currentColor;
  -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
}

.eye-solid.icon:before {
  content: '';
  position: absolute;
  left: 2px;
  top: 2px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: solid 1px currentColor;
  background-color: currentColor;
}
```

Usaremos esto en la tabla.js.

Creamos una nueva ruta en el index.js de src:

```js
<Route exact path="/publicaciones/:key" component = {Publicaciones} />
```

Con el `:key` indicamos que ese parámetro se pasará por la URL.

### Compartir Reducer

### Mútiples Reducers

[Posts de JSON Placeholder](http://jsonplaceholder.typicode.com/posts)

### Llamando a mútiples reducers en una acción

Un error muy común es que estamos llamando a una acción, pero nos está modificando algo que no debería.

Ya tenemos publicacionesActions.js:

```js
import axios from "axios";
import { TRAER_TODOS, CARGANDO, ERROR } from '../types/publicacionesTypes';

export const traerTodos = () => async (dispatch) => {
  dispatch({
    type: CARGANDO
  });

  try {
    const respuesta = await axios.get('http://jsonplaceholder.typicode.com/posts')
    dispatch({
      type: TRAER_TODOS,
      payload: respuesta.data
    })
  } catch (error) {
    console.error(`Error: ${error.message}`);
    dispatch({
      type: ERROR,
      payload: 'Algo salió mal. Intente más tarde.',
    })
  }
}
```

Cambiamos index.js de publicaciones:

```js
import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';

//! Destructuramos y renombramos las funciones
const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerTodos: publicacionesTraerTodos } = publicacionesActions;

class Publicaciones extends Component {
  componentDidMount() {
    if (!this.props.usuariosReducers.usuarios.length) {
      this.props.usuariosTraerTodos()
    }
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Publicaciones de </h1>
        { this.props.match.params.key }
        {/*  Usamos this porque es una clase */}
      </div>
    )
  }
}

const mapStateToProps = ({usuariosReducers, publicacionesReducer}) => {
  return {
    usuariosReducers,
    publicacionesReducer
  }
}

const mapDispatchToProps = {
  usuariosTraerTodos,
  publicacionesTraerTodos
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones)
```

publicacionesReducer.js:

```js
import { TRAER_TODOS, CARGANDO, ERROR } from '../types/publicacionesTypes';

const INITIAL_STATE = {
  publicaciones: [],
  cargando: false,
  error: ''
};

export default (state = INITIAL_STATE, action) => { //* El estado es el initial state que regresa una función
  //!Se crea el switch porque llegarán varias tareas y solo se distingue por el nombre
  switch(action.type) {
    case TRAER_TODOS:
      return { ...state, publicaciones: action.payload, cargando: false };
    case CARGANDO:
      return { ...state, cargando: true};
    case ERROR:
      return { ...state, error: action.payload, cargando: false };
    default: return state;
  }
}
```

publicacionesTypes.js:

```js
export const TRAER_TODOS = 'publicaciones_traer_todos';
export const CARGANDO = 'publicaciones_cargando';
export const ERROR = 'publicaciones_error';
```

### Uso del estado en acción

### Evitar segundas búsquedas

### Inmutabilidad

### Evitar sobreescritura

Destructurando:

```js
const {
  //* Vamos a destructurar cosas que no tengan que ver con el estado
  usuariosTraerTodos,
  publicacionesTraerPorUsuario,
  match: { params: { key } }
} = this.props;
```

### Validación compuesta

### Validación de errores

Ya estamos manejando mejor las publicacionesActions.js:

```js
import axios from "axios";
import { TRAER_POR_USUARIO, CARGANDO, ERROR } from '../types/publicacionesTypes';
import * as usuariosTypes from '../types/usuariosTypes';

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes;

export const traerPorUsuario = (key) => async (dispatch, getState) => {

  dispatch({ type: CARGANDO });

  const { usuarios } = getState().usuariosReducers;
  const { publicaciones } = getState().publicacionesReducer;
  const usuario_id = usuarios[key].id;

  try {
    const respuesta = await axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`);

    const publicaciones_actualizadas = [
      ...publicaciones,
      respuesta.data
    ];

    dispatch({
      type: TRAER_POR_USUARIO,
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
```

### Modificando respuesta de url

### Estado con interacción

index.js de usuarios:

```js
mostrarInfo = (publicaciones, pub_key) => (
    publicaciones.map((publicacion, comentario_key) => (
      <div
        className = "pub_titulo"
        key = {publicacion.id}
        onClick = {() => {
          this.props.abrirCerrar(pub_key, comentario_key);
        }}
      >
        <h2>{publicacion.title}</h2>
        <h3>{publicacion.body}</h3>
        {
          publicacion.abierto ? 'abierto' : 'cerrado'
        }
      </div>
    ))
  );
```

publicacionesActions.js:

```js
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
```

### Mostrar componentes dinamicamente

### LLamadas asincronas dinámicas

### Props por herencia vs estado

### Estado compartido

Mandar parámetros por reducer tiene más prioridad que un componente.

## Métodos HTTP

### Introducción a métodos HTTP

### Nuevo ciclo Redux

Creamos la carpeta "Tareas" dentro de components.

Su archivo index.js:

```js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as tareasActions from './../../actions/tareasActions'

class Tareas extends Component {
  componentDidMount(){
    this.props.traerTodas();
  }
  render() {
    console.log(this.props);
    return (
      <div>
        ¡Tareas!
      </div>
    )
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Tareas);
```

Creamos el archivo tareasTypes.js:

```js
export const TRAER_TODAS = 'tareas_traer_todas';
export const CARGANDO = 'tareas_cargando';
export const ERROR = 'tareas_error';
```

Creamos su reducer, tareasReducer.js:

```js
import { TRAER_TODAS, CARGANDO, ERROR } from '../types/tareasTypes';

const INITIAL_STATE = {
  tareas: {},
  cargando: false,
  error: ''
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => { //* El estado es el initial state que regresa una función
  //!Se crea el switch porque llegarán varias tareas y solo se distingue por el nombre
  switch(action.type) {
    case TRAER_TODAS:
      return { ...state, tareas: action.payload, cargando: false, error: '' };
    case CARGANDO:
      return { ...state, cargando: true};
    case ERROR:
      return { ...state, error: action.payload, cargando: false };
    default: return state;
  }
}
```

Creamos sus acciones, tareasActions.js:

```js
import axios from 'axios';
import { TRAER_TODAS, CARGANDO, ERROR } from '../types/tareasTypes';

//*Esto es una promesa por estar haciendo una petición HTTP GET
export const traerTodas = () =>  async (dispatch) => { //* Función que retorna otra función
  dispatch({
    type: CARGANDO
  });

  try {
    const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos');
    dispatch({ //* Este dispatch se comunicará con el reducer
      type: TRAER_TODAS,
      payload: respuesta.data,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    dispatch({
      type: ERROR,
      payload: 'Información de tareas no disponible',
    })
  }
}
```

Y agregamos esto al index.js de reducers:

```js
import { combineReducers } from "redux";
import usuariosReducers from "./usuariosReducers";
import publicacionesReducer from "./publicacionesReducer";
import tareasReducer from "./tareasReducer";

export default combineReducers({
  usuariosReducers,
  publicacionesReducer,
  tareasReducer
});
```

### Normalizar datos

en tareasActions.js:

```js
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
```

### Mapear Objetos

### Componente para agregar tarea

Creamos el archivo Guardar.js en la carpeta "Tareas":

```js
import React, { Component } from 'react'

class Guardar extends Component {
  render() {
    return (
      <div>
        <h1>Guardar tarea</h1>
        Usuario id:
        <input type="number"/>
        <br></br>
        <br></br>
        Título:
        <input type="text"/>
        <br></br>
        <br></br>
        <button>Guardar</button>
      </div>
    )
  }
}

export default Guardar;
```

Actualizamos App.js:

```js
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Menu from './Menu'
import Users from './users/index'
import Tareas from './Tareas/index'
import Publicaciones from './Publicaciones'
import Guardar from './Tareas/Guardar'

const App = () => (
  <BrowserRouter>
    <Menu />
    <Switch>
      <div className="margen">
        <Route exact path="/" component = {Users} />
        <Route exact path="/tareas" component = {Tareas} />
        <Route exact path="/publicaciones/:key" component = {Publicaciones} />
        <Route exact path="/tareas/guardar" component = {Guardar} />
      </div>
    </Switch>
  </BrowserRouter>
)

export default App
```

### Manejar inputs con Reducer

tareasActions.js:

```js
import axios from 'axios';
import { TRAER_TODAS, CARGANDO, ERROR } from '../types/tareasTypes';

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
    })
  }
}

export const cambioUsuarioId = (usuario_id) => (dispatch) => {
  dispatch({
    type: 'CAMBIO_USUARIO_ID',
    payload: usuario_id
  })
}

export const cambioTitulo = (titulo) => (dispatch) => {
  dispatch({
    type: 'cambio_titulo',
    payload: titulo
  })
}
```

tareasReducer.js:

```js
import { TRAER_TODAS, CARGANDO, ERROR } from '../types/tareasTypes';

const INITIAL_STATE = {
  tareas: {},
  cargando: false,
  error: '',
  usuario_id: '',
  titulo: ''
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => { //* El estado es el initial state que regresa una función
  //!Se crea el switch porque llegarán varias tareas y solo se distingue por el nombre
  switch(action.type) {
    case TRAER_TODAS:
      return { ...state, tareas: action.payload, cargando: false, error: '' };
    case CARGANDO:
      return { ...state, cargando: true};
    case ERROR:
      return { ...state, error: action.payload, cargando: false };
    case 'CAMBIO_USUARIO_ID':
      return { ...state, usuario_id: action.payload };
    case 'cambio_titulo':
      return { ...state, titulo: action.payload };
    default: return state;
  }
}
```

Guardar.js:

```js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as tareasActions from '../../actions/tareasActions'

class Guardar extends Component {

  cambioUsuarioId = (event) => {
    this.props.cambioUsuarioId(event.target.value);
  }

  cambioTitulo = (event) => {
    this.props.cambioTitulo(event.target.value);
  }

  render() {
    return (
      <div>
        <h1>Guardar tarea</h1>
        Usuario id:
        <input
          type="number"
          value={this.props.usuario_id}
          onChange={this.cambioUsuarioId} />

        <br></br> <br></br>

        Título:
        <input
          type="text"
          value={this.props.titulo}
          onChange={this.cambioTitulo} />

        <br></br> <br></br>

        <button>Guardar</button>
      </div>
    )
  }
}

const mapStateToProps = ({tareasReducer}) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Guardar);
```

### POST

### Deshabilitando botón

### Redireccionar

```js
import { Redirect } from 'react-router-dom'

{
  this.props.regresar ? <Redirect to="tareas/" /> : ''
}
```

### Reutilizar componentes

### PUT

[Inmutabilidad en Redux](https://redux.js.org/usage/structuring-reducers/immutable-update-patterns#correct-approach-copying-all-levels-of-nested-data)

### DELETE

## Conclusión

### Conocimientos adquiridos

[Repostorio de Redux con apuntes en modo resumen](https://github.com/jocode/redux-react)

### Qué hacer a continuación

Nunca parar de aprender.
