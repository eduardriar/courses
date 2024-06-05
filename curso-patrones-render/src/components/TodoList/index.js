import React from 'react';
import './TodoList.css'

function TodoList(props) {
  console.log(props)
  return (
    <section className="TodoList-container">
      {props.error && props.onError()}
      {props.loading && props.onLoading()}
      {
        !props.loading &&
        !props.totalTodos &&
        !!!props.searchValue && 
        props.onEmptyTodos()
      }
      {
        (
          !!props.totalTodos &&
          !props.searchedTodos?.length && 
          !!props.searchValue
        ) && 
        props.onEmptySearchResults(props.searchValue)
      }
      {!props.loading && props.searchedTodos.map(
        todo => props.render(todo))
      }
    </section>
  );
}

export { TodoList };
