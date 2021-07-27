import React from 'react'
import { connect } from 'react-redux'
import Loader from '../General/Loader'
import Fatal from '../General/Fatal'

const Comentarios = (props) => {
  if (props.comentarios.error) {
    return <Fatal mensaje={props.comentarios.error} />
  }
  if (props.comentarios.cargando && !props.comentarios.length) {
    return <Loader />
  }

  const ponerComentarios = () => {
    props.comentarios.map((comentario) => (
      <li>
        <b>
          <u>
            { comentario.email }
          </u>
        </b>
        <br/>
        { comentario.body }
      </li>
    ))
  }
  return (
    <ul>
      { ponerComentarios() }
    </ul>
  )
}

const mapStateToProps = ({ publicacionesReducer }) => publicacionesReducer;

export default connect(mapStateToProps)(Comentarios)
