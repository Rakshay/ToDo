/*global location*/

'use strict';

import React from 'react';
import * as dataRequests from './data-requests';
import ToDoItem from './toDoItem';
import ToDoItems from './toDoItems';

const logError = (err) => {
  console.log('error: ', err);
};

const filterToDos = (list) => {
  let toDos = [],
      completed = [],
      item;

  for (let i = 0, len = list.length; i < len; i++) {
    item = list[i];

    if (item.isComplete === true) {
      completed.push(item);
    } else {
      toDos.push(item);
    }
  }

  return {
    toDos,
    completed
  };
};

const fetchList = () => {
  return new Promise((resolve, reject) => {
    dataRequests.getToDos()
      .then((list) => {
        resolve(filterToDos(list));
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * This react component provides the layout of the application and hosts
 * @class
 */
class ToDoApp extends React.Component {
  /* eslint-disable require-jsdoc */
  /* istanbul ignore next */
  constructor () {
    super();
    this.state = {
      toDos: [],
      completed: []
    };
    this.onAction = (action, toDoItem) => this._onAction(action, toDoItem);
  }

  /* eslint-disable require-jsdoc */
  componentDidMount () {
    fetchList()
      .then((lists) => {
        this.setState(lists);
      })
      .catch(logError);
  }

  _onAction (action, toDoItem) {
    let actionRequest,
        args;

    /* istanbul ignore else */
    if (action === 'Add') {
      actionRequest = dataRequests.addToDo;
      args= [toDoItem.description];
    } else if (action === 'Save') {
      actionRequest = dataRequests.updateToDo;
      args= [toDoItem.id, toDoItem.description, toDoItem.isComplete];
    } else if (action === 'Delete') {
      actionRequest = dataRequests.deleteToDo;
      args= [toDoItem.id];
    }

    actionRequest.apply(this, args)
      .then(() => {
        fetchList()
          .then((lists) => {
            this.setState(lists);
          })
          .catch(logError);
      })
      .catch(logError);
  }

  /* eslint-disable require-jsdoc */
  render () {
    return (
      <div>
        <ToDoItems title="To Dos">
          <ToDoItem mode="create" onAction={this.onAction}/>
        </ToDoItems>
        <ToDoItems title="To Dos" items={this.state.toDos} onAction={this.onAction} />
        <ToDoItems title="Completed" items={this.state.completed} onAction={this.onAction} />
      </div>
    );
  }
}

ToDoApp.displayName = 'ToDoApp';

export default ToDoApp;
