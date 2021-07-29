import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from '../General/Loader'
import Fatal from '../General/Fatal'
import { Redirect } from 'react-router-dom'
import * as tareasActions from '../../actions/tareasActions'

class Guardar extends Component {
  componentDidMount() {
    const {
      match: { params: {usuario_id, tarea_id}},
      tareas,
      cambioUsuarioId,
      cambioTitulo,
      limpiarForma
    } = this.props;

    if (usuario_id && tarea_id) {
      const tarea = tareas[usuario_id][tarea_id];
      cambioUsuarioId(tarea.usuario_id);
      cambioTitulo(tarea.titulo);
    } else {
      limpiarForma();
    }
  }

  cambioUsuarioId = (event) => {
    this.props.cambioUsuarioId(event.target.value);
  }

  cambioTitulo = (event) => {
    this.props.cambioTitulo(event.target.value);
  }

  guardar = () => {
    const {
      match: { params: {usuario_id, tarea_id}},
      tareas,
      titulo,
      agregar,
      editar
    } = this.props;

    const nueva_tarea = {
      userId: usuario_id,
      title: titulo,
      completed: false
    };

    if(usuario_id && tarea_id) {
      const tarea = tareas[usuario_id][tarea_id];
      const tarea_editada = {
        ...nueva_tarea,
        completed: tarea.completed,
        id: tarea.id
      };
      editar(tarea_editada);
    } else {
      agregar(nueva_tarea);
    }
  }

  deshabilitar = () => {
    const { usuario_id, titulo, cargando } = this.props;

    if (cargando) {
      return true
    }

    if (!usuario_id || !titulo) {
      return true
    }
    return false
  }

  mostrarAccion = () => {
    const { error, cargando } = this.props;
    if (cargando) {
      return <Loader />
    }
    if (error) {
      return <Fatal mensaje={error} />
    }
  }

  render() {
    return (
      <div>
        {
          this.props.regresar ? <Redirect to="tareas/" /> : ''
        }
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

        <button
          onClick={this.guardar()}
          disabled={this.deshabilitar()}>
          Guardar
        </button>
        { this.mostrarAccion() }
      </div>
    )
  }
}

const mapStateToProps = ({tareasReducer}) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Guardar);