import React, { useState, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import '../sass/main.scss';
import { TodoList } from '../component/TodoList';
import { TodoForm } from '../component/TodoForm';
import { TodoViews } from '../component/TodoViews';

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

const defaultList: Todo[] = [
  { id: 1, text: 'first todo', completed: false },
  { id: 2, text: 'second todo', completed: false },
  { id: 3, text: 'third todo', completed: false },
];

let initialList = defaultList;

// Check session storage to see if there is a todoList and use session stored todoList as initial list.
const sessionTodoList = sessionStorage.getItem('todoList');
if (sessionTodoList) {
  const todoList = JSON.parse(sessionTodoList);
  initialList = todoList;
}

const App = () => {
  const [todoList, setTodoList] = useState(initialList);
  const [todoView, setTodoView] = useState<View>(View.All);

  const deleteTodoHandler = useCallback(
    (id: number): void => {
      const updatedTodoList = todoList.filter((todo: Todo) => todo.id !== id);
      updatedTodoList.forEach((todo: Todo, index: number) => {
        todo.id = index + 1;
      });
      setTodoList(updatedTodoList);
      sessionStorage.setItem('todoList', JSON.stringify(updatedTodoList));
    },
    [todoList]
  );

  const addTodoHandler = useCallback(
    (text: string): void => {
      const updatedTodoList = todoList.concat({
        id: todoList.length + 1,
        text: text,
        completed: false,
      });
      console.log('updatedTodoList', updatedTodoList);
      setTodoList(updatedTodoList);
      sessionStorage.setItem('todoList', JSON.stringify(updatedTodoList));
    },
    [todoList]
  );

  const toggleCompleteHandler = useCallback(
    (id: number): void => {
      const updatedTodoList = [...todoList];
      for (let todo of updatedTodoList) {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
      }
      setTodoList(updatedTodoList);
      sessionStorage.setItem('todoList', JSON.stringify(updatedTodoList));
    },
    [todoList]
  );

  const toggleAllHandler = useCallback((): void => {
    if (todoList.length === 0) {
      return;
    }

    const updatedTodoList = [...todoList];
    let countCompleted = 0;

    updatedTodoList.forEach((todo: Todo): void => {
      if (todo.completed === true) {
        countCompleted++;
      }
    });

    updatedTodoList.forEach((todo: Todo): void => {
      if (updatedTodoList.length === countCompleted) {
        todo.completed = false;
      } else {
        todo.completed = true;
      }
    });

    setTodoList(updatedTodoList);
    sessionStorage.setItem('todoList', JSON.stringify(updatedTodoList));
  }, [todoList]);

  const changeTodoHandler = useCallback(
    (todo: string, id: number) => {
      const updatedTodoList = [...todoList];
      updatedTodoList[id - 1].text = todo;
      setTodoList(updatedTodoList);
      sessionStorage.setItem('todoList', JSON.stringify(updatedTodoList));
    },
    [todoList]
  );

  const clearAllHandler = useCallback((): void => {
    const updatedTodoList = todoList.filter((todo: Todo) => {
      return todo.completed === false;
    });

    setTodoList(updatedTodoList);
    sessionStorage.setItem('todoList', JSON.stringify(updatedTodoList));
  }, [todoList]);

  const changeViewHandler = useCallback((view: View): void => {
    setTodoView(view);
  }, []);

  return (
    <div className="App">
      <h2 className="heading-primary u-mbot-xs">TODO IT</h2>
      <div className="App__section">
        <TodoForm addTodo={addTodoHandler} toggleAll={toggleAllHandler} />
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
          <TodoViews
            currentView={todoView}
            clearAll={clearAllHandler}
            changeView={changeViewHandler}
          />
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
