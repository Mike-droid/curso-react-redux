import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';

const store = createStore(
  reducers, // Todos los reducers
  {}, // Estado inicial
  applyMiddleware(reduxThunk) // Middleware
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }> {/* La store es justamente la constante definida arriba */}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
