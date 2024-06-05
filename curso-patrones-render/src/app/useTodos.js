import React, { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

function useTodos() {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
    sincronize
  } = useLocalStorage('TODOS_V1', []);
  const [searchValue, setSearchValue] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);
  console.log(todos)
  // const [searchedTodos, setSearchedTodos] = React.useState(todos);

  // Derivated states: variables defined from an state content
  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => {
        const todoText = todo.text.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return todoText.includes(searchText);
      }
    )
  }

  // Avoid making a state from an other state

  // useEffect(() => {
  //   console.log('>>>>', todos);
  //   if (!searchValue.length >= 1) {
  //     console.log('>>>> Nothing to search');
  //     setSearchedTodos(todos);
  //     return;
  //   }

  //   setSearchedTodos(
  //     todos.filter(todo => 
  //       {
  //         const todoText = todo.text.toLowerCase();
  //         const searchText = searchValue.toLowerCase();
  //         return todoText.includes(searchText);      
  //       }
  //     )
  //   );
  // }, [searchValue, todos]);

  const addTodo = (text) => {
    const newTodos = [...todos];
    newTodos.push({
      completed: false,
      text,
    });
    saveTodos(newTodos);
  };

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  return {
    loading,
    error,
    totalTodos,
    completedTodos,
    searchValue,
    setSearchValue,
    searchedTodos,
    addTodo,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
    sincronize
  }
}

export { useTodos };
