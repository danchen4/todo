import React, { useState, useLayoutEffect, useRef } from 'react';

interface FormProps {
  addTodo(todo: string): void;
  toggleAll(): void;
}

export const TodoForm: React.FC<FormProps> = React.memo(({ addTodo, toggleAll }) => {
  const [input, setInput] = useState('');
  const [toggleAllButton, setToggleAllButton] = useState(false);
  const textInput = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (textInput.current) {
      textInput.current.focus();
    }
  }, []);

  const inputChangeHandler = (e: React.FormEvent<HTMLInputElement>): void => {
    let target = e.target as HTMLInputElement;
    setInput(target.value);
  };

  const enterKeyDownHandler = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      addTodo(input);
      setInput('');
    }
  };

  const addTodoHandler = (): void => {
    if (input) {
      addTodo(input);
      setInput('');
    }
  };

  const toggleAllHandler = (): void => {
    setToggleAllButton(!toggleAllButton);
    toggleAll();
  };

  return (
    <div className="Form">
      <div className="Form__icon" onClick={toggleAllHandler}>
        <div className="Form__icon--checkbox">
          {toggleAllButton ? <span className="Form__icon--checkbox-checked"> </span> : null}
        </div>
      </div>
      <input
        className="Form__input"
        placeholder="What would you like to do?"
        ref={textInput}
        onChange={inputChangeHandler}
        onKeyDown={enterKeyDownHandler}
        value={input}
      />
      <button className="btn btn--secondary Form__button" onClick={addTodoHandler}>
        Add
      </button>
    </div>
  );
});
