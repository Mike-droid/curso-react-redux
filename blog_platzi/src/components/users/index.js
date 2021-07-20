import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as usuariosActions from '../../actions/usuariosActions';

class Users extends Component {

  componentDidMount() {
    this.props.traerTodos();
  }

  //* Por cada usuario, tendré una fila
  ponerFilas = () => this.props.usuarios.map((usuario) => (
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

  render(){
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
          { this.ponerFilas() }
        </tbody>
      </table>
      </div>
    )
  }

}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducers;
}

export default connect(mapStateToProps, usuariosActions)(Users);