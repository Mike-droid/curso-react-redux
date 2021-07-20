const INITIAL_STATE = {
  usuarios: [],
};

export default (state = INITIAL_STATE, action) => { //* El estado es el initial state que regresa una función
  //!Se crea el switch porque llegarán varias tareas y solo se distingue por el nombre
  switch(action.type) {
    case 'traer_usuarios':
      return { ...state, usuarios: action.payload }

    default: return state;
  }
}
