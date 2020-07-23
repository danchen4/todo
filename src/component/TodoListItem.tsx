import React, { useState, useRef, useEffect } from 'react';

interface TodoListItemProps {
  id: number;
  completed: boolean;
  todoText: string;
  deleteTodo(id: number): void;
  toggleComplete(id: number): void;
  changeTodo(e: any, index: number): void;
}

export const TodoListItem: React.FC<TodoListItemProps> = React.memo(
  ({ id, completed, todoText, children, deleteTodo, toggleComplete, changeTodo }) => {
    const [showInput, setShowInput] = useState(false);
    const [hideInputOnBlur, setHideInputOnBlur] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const classToggleComplete = ['TodoListItem__todo'];
    if (completed) {
      classToggleComplete.push('TodoListItem__todo--completed');
    }

    // focus on the <input> if possible
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    });

    // set <input> value to todoText props
    useEffect(() => {
      setInputValue(todoText);
    }, [todoText]);

    const doubleClickHandler = (): void => {
      setShowInput(true);
      setHideInputOnBlur(false);
    };

    const inputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
      let target = e.target as HTMLInputElement;
      setInputValue(target.value);
    };

    // When clicking outside of <input> need to remove input and changeTodo in <App /> state
    const blurHandler = () => {
      setHideInputOnBlur(true);
      changeTodo(inputValue, id);
    };

    // When hitting 'Enter', should hide input on 'Blur' and set Todo
    const enterKeyDownHandler = (e: React.KeyboardEvent): void => {
      if (e.key === 'Enter') {
        setHideInputOnBlur(true);
        changeTodo(inputValue, id);
      }
    };

    let todoItem = (
      <div className={classToggleComplete.join(' ')} onDoubleClick={doubleClickHandler}>
        {todoText}
      </div>
    );
    //Show <input> instead of todo if todo is double clicked, if <input> is not blurred, and if todo is not completed
    if (showInput && !hideInputOnBlur && !completed) {
      todoItem = (
        <input
          className="TodoListItem__input"
          ref={inputRef}
          value={inputValue}
          onChange={inputChangeHandler}
          onBlur={blurHandler}
          onKeyDown={enterKeyDownHandler}
        />
      );
    }

    return (
      <div className="TodoListItem">
        <div className="TodoListItem__icon" onClick={() => toggleComplete(id)}>
          <div className="TodoListItem__icon--circle">
            {completed ? String.fromCharCode(10004) : null}
          </div>
        </div>
        {todoItem}
        <div className="TodoListItem__icon" onClick={() => deleteTodo(id)}>
          <div className="TodoListItem__icon--delete">X</div>
        </div>
      </div>
    );
  }
);
