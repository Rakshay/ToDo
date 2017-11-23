/*global location*/

'use strict';

import React from 'react';
import * as dataRequests from './data-requests';

/**
 * This react component provides the layout of the application and hosts
 * @class
 */
class ToDoApp extends React.Component {
  /* eslint-disable require-jsdoc */
  componentDidMount () {
    dataRequests.getToDos()
      .then((data) => {
        console.log(data);
      });
  }

  /* eslint-disable require-jsdoc */
  render () {
    return (
      <div />
    );
  }
}

ToDoApp.displayName = 'ToDoApp';

export default ToDoApp;
