import React from 'react';
import { View } from '../container/App';
import cn from 'classnames';

interface ActionTabProps {
  currentView: View;
  clearAll(): void;
  changeView(view: View): void;
}

export const TodoViews: React.FC<ActionTabProps> = React.memo(
  ({ currentView, clearAll, changeView }) => {
    const viewHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
      const value = e.target as HTMLInputElement;
      const content = value.innerHTML as keyof typeof View;
      const view: View = View[content];
      changeView(view);
    };

    return (
      <div className="ActionTab">
        <div className="ActionTab__text" onClick={clearAll}></div>
        <div className="ActionTab__view-group">
          <button
            className={cn('btn', 'ActionTab__view', {
              ActionTab__view_selected: currentView === View.All,
            })}
            onClick={viewHandler}
          >
            {View[View.All]}
          </button>
          <button
            className={cn('btn', 'ActionTab__view', {
              ActionTab__view_selected: currentView === View.Active,
            })}
            onClick={viewHandler}
          >
            {View[View.Active]}
          </button>
          <button
            className={cn('btn', 'ActionTab__view', {
              ActionTab__view_selected: currentView === View.Completed,
            })}
            onClick={viewHandler}
          >
            {View[View.Completed]}
          </button>
        </div>
        <div className="ActionTab__clear" onClick={clearAll}>
          Clear Completed
        </div>
      </div>
    );
  }
);
