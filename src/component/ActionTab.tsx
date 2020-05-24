import React from 'react';
import { View } from '../container/App';

interface ActionTabProps {
  clearAll(): void;
  changeView(view: View): void;
}

export const ActionTab: React.FC<ActionTabProps> = ({ clearAll, changeView }) => {
  const viewHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.target as HTMLInputElement;
    const content = value.innerHTML as keyof typeof View;
    const view: View = View[content];
    changeView(view);
    console.log(view);
  };

  return (
    <div className="ActionTab">
      <div className="ActionTab__text" onClick={clearAll}></div>
      <div className="ActionTab__view-group">
        <button className="btn ActionTab__view" onClick={viewHandler}>
          {View[View.All]}
        </button>
        <button className="btn ActionTab__view" onClick={viewHandler}>
          {View[View.Active]}
        </button>
        <button className="btn ActionTab__view" onClick={viewHandler}>
          {View[View.Completed]}
        </button>
      </div>
      <div className="ActionTab__clear" onClick={clearAll}>
        Clear Completed
      </div>
    </div>
  );
};
