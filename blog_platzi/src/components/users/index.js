import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../General/Loader';
import Fatal from '../General/Fatal';
import Tabla from './Tabla';
import * as usuariosActions from '../../actions/usuariosActions';

class Users extends Component {

  componentDidMount() {
    if (!this.props.usuarios.length) {
      this.props.traerTodos();
    }
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