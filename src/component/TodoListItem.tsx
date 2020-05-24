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
    console.log('<TodoItem /> Render');

    const [showInput, setShowInput] = useState(false);
    const [hideInputOnBlur, setHideInputOnBlur] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const classToggleComplete = ['TodoListItem__todo'];
    if (completed) {
      classToggleComplete.push('TodoListItem__todo--completed');
    }

    // focus on the <input>
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    });

    // set <input> value to todoText from <App /> state passed down as props
    useEffect(() => {
      setInputValue(todoText);
    }, [todoText]);

    // Could use useReducer, but a bit overkill
    const doubleClickHandler = (): void => {
      setShowInput(true);
      setHideInputOnBlur(false);
    };

    // Even though this is causing re-renders, nothing else changes except for the <input> value
    const inputChangeHandler = (e: any) => {
      setInputValue(e.target.value);
    };

    // When clicking outside of <input> need to remove input and changeTodo in <App /> state
    const blurHandler = () => {
      setHideInputOnBlur(true);
      changeTodo(inputValue, id);
    };

    let todoItem = (
      <div className={classToggleComplete.join(' ')} onDoubleClick={doubleClickHandler}>
        {todoText}
      </div>
    );

    //Only show <input> inplace of text if double clicked, if not blurred, and if not completed
    if (showInput && !hideInputOnBlur && !completed) {
      todoItem = (
        <input
          className="TodoListItem__input"
          ref={inputRef}
          value={inputValue}
          onChange={inputChangeHandler}
          onBlur={blurHandler}
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
