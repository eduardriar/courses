import React from 'react';

function TodoHeader({children, loading}) {
  // React.Children: React puede recibir uno o más hijos, esto nos ayuda a tratar esos hijos como componentes de react
  // React.cloneElement: Clona el componente deseado y se le puede pasar props, en combinación con React.children, se le pueden compartir props que ambos hijos puedan utilizar
  return(
    <header>
      {
        React.Children
          .toArray(children)
          .map(child => React.cloneElement(child, {loading}))
      }
    </header>
  )
}

export { TodoHeader }