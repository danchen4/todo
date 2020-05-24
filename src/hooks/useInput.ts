import { useState } from 'react';

export const useInput = () => {
  const [input, setInput] = useState('');

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    let target = e.target as HTMLInputElement;
    setInput(target.value);
  };

  return [input, changeHandler];
};
