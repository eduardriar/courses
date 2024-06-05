import React from 'react';
function withStorageListener(WrappedComponent){
  return function WrappedComponentWithStorageListener(props) {
    console.log(props)
    const [storageListener, setStorageListener] = React.useState(false);
    window.addEventListener('storage', (change) => {
      if(change.key === 'TODOS_V1'){
        setStorageListener(true);
      }
    });

    const toggleShow = () => {
      setStorageListener(false);
      props.sincronize()
    }

    return (
      <WrappedComponent 
        show={storageListener}
        toggleShow={toggleShow}
      />
    )
  }
}

export {withStorageListener}