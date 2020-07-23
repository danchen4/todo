import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { TodoListItem } from './TodoListItem';
import { Todo, View } from '../container/App';

interface TodoListProps {
  todoList: Todo[];
  view: View;
  deleteTodo(id: number): void;
  toggleComplete(id: number): void;
  changeTodo(e: any, index: number): void;
}

export const TodoList: React.FC<TodoListProps> = React.memo(
  ({ todoList, view, deleteTodo, toggleComplete, changeTodo }) => {
    const list = todoList
      .filter((todo: Todo): boolean => {
        if (view === View.Active) {
          return todo.completed === false;
        }
        if (view === View.Completed) {
          return todo.completed === true;
        }
        return true;
      })
      .map((todo: Todo, index: number) => {
        return (
          <CSSTransition key={todo.id} timeout={100} classNames="list">
            <TodoListItem
              key={todo.id}
              id={todo.id}
              deleteTodo={deleteTodo}
              completed={todo.completed}
              todoText={todo.text}
              toggleComplete={toggleComplete}
              changeTodo={changeTodo}
            >
              {todo.text}
            </TodoListItem>
          </CSSTransition>
        );
      });

    return (
      <div className="TodoList">
        <TransitionGroup>{list}</TransitionGroup>
      </div>
    );
  }
);
