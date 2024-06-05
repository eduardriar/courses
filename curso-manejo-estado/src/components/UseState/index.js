import React, { useEffect, useState } from 'react';

const SECURITY_CODE = 'paradigma';

function UseState({name}){
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // TODO
  // Comparar la cantidad de rerender que se usa con un estado compuesto y con uno individual
  useEffect(() => {
    if(loading){
      setTimeout(() => {
        if(value !== SECURITY_CODE){
          setError(true);
        }

        setLoading(false);
        setConfirmed(true);
      }, 3000);
    }
  }, [loading]);

  const onChangeInput = (event) => {
    setValue(event.target.value);
  }

  const onValidate = () => {
    if(error) setError(false);
    setLoading(true);
  }

  const onConfirmDelete = () => {
    setDeleted(true);
    setValue('');
  }

  const onDismissConfirm = () => {
    setConfirmed(false);
    setValue('');
  }

  const onRestore = () => {
    setConfirmed(false);
    setDeleted(false);
  }

  if(!deleted && !confirmed){
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad.</p>
  
        {
          error && !loading && (
            <p style={{color: 'red'}}>Error: El código es incorrecto</p>
          )
        }
        {
          loading && (
            <p>Cargando...</p>
          )
        }
  
        <input 
          placeholder="Código de seguridad"
          value={value}
          onChange={onChangeInput}
        />
        <button onClick={onValidate}>Comprobar</button>
      </div>
    )
  } else if(!!confirmed && !deleted) {
    return (
      <div>
        <p>¿Seguro que quieres eliminar el UseState?</p>
        <button onClick={onConfirmDelete}>Si, eliminar</button>
        <button onClick={onDismissConfirm}>No, volver a revisar</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>Eliminado con éxito</p>
        <button onClick={onRestore}>Restaurar</button>
      </div>
    )
  }
  
}

export {UseState}