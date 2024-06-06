import React from 'react';
import { withStorageListener } from "./withStorageListener"

function ChangeAlert({
  show,
  toggleShow,
}){
  if(show){
    return (
      <div>
        <h3>Se detectaron cambios</h3>
        <button onClick={() => {
          toggleShow();
        }}>
          Actualiza la página
        </button>
      </div>
    )
  } else {
    <></>
  }
}

const ChangeAlertWithStorageListener = withStorageListener(ChangeAlert)

export {ChangeAlertWithStorageListener}