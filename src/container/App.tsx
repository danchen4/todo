import React, { useState, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';

import '../sass/main.scss';
import { TodoList } from '../component/TodoList';
import { Form } from '../component/Form';
import { ActionTab } from '../component/ActionTab';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export enum View {
  All,
  Active,
  Completed,
}

const App = () => {
  console.log('<App /> Render');

  const initialList: Todo[] = [
    { id: 1, text: 'first todo', completed: false },
    { id: 2, text: 'second todo', completed: false },
    { id: 3, text: 'third todo', completed: false },
  ];

  const [todoList, setTodoList] = useState(initialList);
  const [todoView, setTodoView] = useState<View>(View.All);

  const deleteTodoHandler = useCallback(
    (id: number): void => {
      setTodoList(todoList.filter((text: Todo) => text.id !== id));
    },
    [todoList]
  );

  const addTodoHandler = useCallback(
    (text: string): void => {
      setTodoList(todoList.concat({ id: todoList.length + 1, text: text, completed: false }));
    },
    [todoList]
  );

  const toggleCompleteHandler = useCallback(
    (id: number): void => {
      const todoListCopy = [...todoList];
      for (let todo of todoListCopy) {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
      }
      setTodoList(todoListCopy);
    },
    [todoList]
  );

  const toggleAllHandler = useCallback((): void => {
    if (todoList.length === 0) {
      return;
    }

    const todoListCopy = [...todoList];
    let countCompleted = 0;

    todoListCopy.forEach((todo: Todo): void => {
      if (todo.completed === true) {
        countCompleted++;
      }
    });

    todoListCopy.forEach((todo: Todo): void => {
      if (todoListCopy.length === countCompleted) {
        todo.completed = false;
      } else {
        todo.completed = true;
      }
    });

    setTodoList(todoListCopy);
  }, [todoList]);

  const changeTodoHandler = useCallback(
    (todo: string, id: number) => {
      const todoListCopy = [...todoList];
      todoListCopy[id - 1].text = todo;
      setTodoList(todoListCopy);
    },
    [todoList]
  );

  const clearAllHandler = (): void => {
    const todoListCopy = [...todoList];

    setTodoList(
      todoListCopy.filter((todo: Todo) => {
        return todo.completed === false;
      })
    );
    // setTodoView(View.Active);
  };

  const changeViewHandler = (view: View): void => {
    setTodoView(view);
    console.log('<App />', todoView);
  };

  return (
    <div className="App">
      <h2 className="heading-primary u-mbot-xs">TODO IT</h2>
      <div className="App__section">
        <Form addTodo={addTodoHandler} toggleAll={toggleAllHandler} />
        <TodoList
          todoList={todoList}
          deleteTodo={deleteTodoHandler}
          toggleComplete={toggleCompleteHandler}
          changeTodo={changeTodoHandler}
          view={todoView}
        />
        <CSSTransition
          in={todoList.length !== 0}
          timeout={200}
          mountOnEnter
          unmountOnExit
          classNames="list"
        >
          <ActionTab clearAll={clearAllHandler} changeView={changeViewHandler} />
        </CSSTransition>
      </div>
      <div className="App__helper u-mtop-sm">
        <p className="App__helper-text">Press Enter to add</p>
        <p className="App__helper-text">Double click to update todo</p>
      </div>
    </div>
  );
};

export default App;
