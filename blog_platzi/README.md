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
