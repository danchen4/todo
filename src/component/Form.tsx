import React, { useState, createRef, useEffect } from 'react';

interface FormProps {
  addTodo(todo: string): void;
  toggleAll(): void;
}

export const Form: React.FC<FormProps> = React.memo(({ addTodo, toggleAll }) => {
  console.log('<TodoForm /> Render');

  const textInput = createRef<HTMLInputElement>();
  const [input, setInput] = useState('');
  const [toggleAllButton, setToggleAllButton] = useState(false);

  useEffect(() => {
    if (textInput.current) {
      textInput.current.focus();
    }
  }, [textInput]);

  const inputChangeHandler = (e: React.FormEvent<HTMLInputElement>): void => {
    let target = e.target as HTMLInputElement;
    setInput(target.value);
  };

  const enterKeyHandler = (e: React.KeyboardEvent): void => {
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
        onChange={inputChangeHandler}
        onKeyDown={enterKeyHandler}
        value={input}
      />
      <button className="btn btn--secondary Form__button" onClick={addTodoHandler}>
          Add
        </button>
    </div>
  );
});
