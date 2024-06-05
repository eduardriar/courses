'use client'
import React, { useEffect } from 'react';
import '@/app/page.css';
import { useTodos } from './useTodos';
import { TodoCounter } from '@/components/TodoCounter';
import { TodoSearch } from '@/components/TodoSearch';
import { TodoList } from '@/components/TodoList';
import { TodoItem } from '@/components/TodoItem';
import { TodosError } from '@/components/TodosError';
import { TodosLoading } from '@/components/TodosLoading';
import { EmptyTodos } from '@/components/EmptyTodos';
import { TodoForm } from '@/components/TodoForm';
import { CreateTodoButton } from '@/components/CreateTodoButton';
import { Modal } from '@/components/Modal';
import { TodoHeader } from '@/components/TodoHeader';
import { ChangeAlertWithStorageListener } from '@/components/ChangeAlert';

// Composición de componentes que nos ayuda a tener un código más limpio y a compartir estados sin necesidad de anidarlo en props
// Render props, mantener el padre limpio y delegar la tarea de validación al hijo, mezclado con render function pero no funcionó :(

function App() {

  const {
    error,
    loading,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
    totalTodos,
    completedTodos,
    searchValue,
    setSearchValue,
    addTodo,
    sincronize
  } = useTodos();

  return (
    <React.Fragment>
      <TodoHeader loading={loading}>
        <TodoCounter
          totalTodos={totalTodos}
          completedTodos={completedTodos}
        />
        <TodoSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </TodoHeader>
      <TodoList
        error={error}
        loading={loading}
        searchedTodos={searchedTodos}
        totalTodos={totalTodos}
        searchValue={searchValue}
        onError={() => <TodosError />}
        onLoading={() => <TodosLoading />}
        onEmptyTodos={() => <EmptyTodos />}
        onEmptySearchResults={(searchText) =>
          <p>No hay resultados para {searchText}</p>
        }
        render={todo => (<TodoItem
          key={todo.text}
          text={todo.text}
          completed={todo.completed}
          onComplete={() => completeTodo(todo.text)}
          onDelete={() => deleteTodo(todo.text)}
        />)}
      >
        {/* {
          todo => (<TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />)
        } */}
      </TodoList>
      {!!openModal && (
        <Modal>
          <TodoForm addTodo={addTodo} setOpenModal={setOpenModal} />
        </Modal>
      )}

      <CreateTodoButton
        loading={loading}
        setOpenModal={setOpenModal}
      />
      <ChangeAlertWithStorageListener sincronize={sincronize} />
    </React.Fragment>
  );
}

export default App;
