/*global location*/

'use strict';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * This react component provides the layout of the application and hosts
 * @class
 */
class ToDoItem extends React.Component {
  /* eslint-disable require-jsdoc */
  constructor (props) {
    super(props);
    this.state = this.extractStateFromProps(props);
    this.changeDescription = (e) => this._changeDescription(e);
    this.onClick = (e) => this._onClick(e);
    this.toggleComplete = (e) => this._toggleComplete(e);
  }

  componentWillReceiveProps (nextProps) {
    this.setState(this.extractStateFromProps(nextProps));
  }

  extractStateFromProps (props) {
    return {
      description: props.description,
      isComplete: props.isComplete,
      id: props._id
    };
  }

  _changeDescription (e) {
    this.setState({
      description: e.target.value
    });
  }

  _toggleComplete (e) {
    this.setState({
      isComplete: e.target.checked
    }, () => {
      this.props.onAction('Save', {
        description: this.state.description,
        isComplete: this.state.isComplete,
        id: this.state.id
      });
    });
  }

  _onClick (e) {
    let action = e.target.dataset.control;

    if (action === 'Edit') {
      this.setState({
        mode: 'edit'
      });
    } else if (action === 'Save') {
      this.setState({
        mode: 'view'
      });
    }

    if (action !== 'Edit' && typeof this.props.onAction === 'function') {
      this.props.onAction(action, {
        description: this.state.description,
        isComplete: this.state.isComplete,
        id: this.state.id
      });
    }
  }

  /* eslint-disable require-jsdoc */
  render () {
    let controls = [];

    if (this.props.mode === 'create') {
      controls = ['Add'];
    } else if (this.state.mode === 'edit') {
      controls = ['Save', 'Delete'];
    } else {
      controls = ['Edit', 'Delete'];
    }

    return (
      <div className="todo">
        {
          (() => {
            if (this.props.mode === 'create') {
              return <input type="text" value={this.state.description} onChange={this.changeDescription} />;
            } else if (this.state.mode === 'edit') {
              return (
                <div>
                  <input name="isComplete" type="checkbox" checked={this.state.isComplete} onChange={this.toggleComplete} />
                  <input type="text" value={this.state.description} onChange={this.changeDescription} />
                </div>
              );
            } else {
              return (
                <div>
                  <input name="isComplete" type="checkbox" checked={this.state.isComplete} onChange={this.toggleComplete} />
                  <span>{this.state.description}</span>
                </div>
              );
            }
          })()
        }
        <ul className="todos-controls">
          {
            controls.map((control, index) => {
              return <li key={index} className="todo-control" onClick={this.onClick} data-control={control}>{control}</li>;
            })
          }
        </ul>
      </div>
    );
  }
}

ToDoItem.displayName = 'ToDoItem';

ToDoItem.propTypes ={
  mode: PropTypes.string,
  description: PropTypes.string,
  isComplete: PropTypes.bool,
  id: PropTypes.string,
  onAction: PropTypes.func
};

ToDoItem.defaultProps ={
  description: '',
  isComplete: false
};

export default ToDoItem;
