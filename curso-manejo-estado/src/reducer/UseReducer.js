

import React, { useEffect } from 'react';

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          return onError();
        }

        onConfirm();
      }, 3000);
    }
  }, [state.loading, state.value]);

  const onError = () => dispatch({ type: actionTypes.ERROR });
  const onDelete = () => dispatch({ type: actionTypes.DELETE });
  const onDismiss = () => dispatch({ type: actionTypes.DISMISS });
  const onReset = () => dispatch({ type: actionTypes.RESET })
  const onConfirm = () => dispatch({ type: actionTypes.CONFIRMED });

  const onValidate = () => {
    if (state.error) dispatch({ type: actionTypes.ERROR });
    dispatch({ type: actionTypes.CHECK });
  }

  const onWrite = (event) => {
    dispatch({ type: actionTypes.WRITE, payload: event.target.value })
  };


  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad.</p>

        {
          state.error && !state.loading && (
            <p style={{ color: 'red' }}>Error: El código es incorrecto</p>
          )
        }
        {
          state.loading && (
            <p>Cargando...</p>
          )
        }

        <input
          placeholder="Código de seguridad"
          value={state.value}
          onChange={onWrite}
        />
        <button onClick={onValidate}>Comprobar</button>
      </div>
    )
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <div>
        <p>¿Seguro que quieres eliminar el UseState?</p>
        <button onClick={onDelete}>Si, eliminar</button>
        <button onClick={onDismiss}>No, volver a revisar</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>Eliminado con éxito</p>
        <button onClick={onReset}>Restaurar</button>
      </div>
    )
  }
}

const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

const actionTypes = {
  ERROR: 'ERROR',
  CHECK: 'CHECK',
  CONFIRMED: 'CONFIRMED',
  DELETE: 'DELETE',
  RESET: 'RESET',
  WRITE: 'WRITE',
  DISMISS: 'DISMISS'
}

const reducerObject = (state, action) => (
  {
    [actionTypes.ERROR]: {
      ...state,
      error: true,
      loading: false,
    },
    [actionTypes.CHECK]: {
      ...state,
      loading: true
    },
    [actionTypes.CONFIRMED]: {
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    },
    [actionTypes.DELETE]: {
      ...state,
      deleted: true,
    },
    [actionTypes.RESET]: {
      ...state,
      confirmed: false,
      deleted: false,
      value: ''
    },
    [actionTypes.WRITE]: {
      ...state,
      value: action.payload
    },
    [actionTypes.DISMISS]: {
      ...state,
      confirmed: false,
    }
  }
)

const reducer = (state, action) => {
  if (reducerObject(state, action)[action.type]) {
    return reducerObject(state, action)[action.type]
  } else {
    return { ...state }
  }
}

export { UseReducer }
