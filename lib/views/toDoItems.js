/*global location*/

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import ToDoItem from './toDoItem';

const ToDoItems = (props) => {
  return (
    <div className="todos-panel">
      <div className="todos-panel-title">{props.title}</div>
      <div className="todos-panel-content">
        {
          (() => {
            if (props.children !== undefined) {
              return props.children;
            } else {
              return props.items.map((item, index) => {
                return <ToDoItem key={index} {...item} onAction={props.onAction} />;
              });
            }
          })()
        }
      </div>
    </div>
  );
};

ToDoItems.displayName = 'ToDoItems';

ToDoItems.propTypes = {
  items: PropTypes.object,
  onAction: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node
};

export default ToDoItems;
