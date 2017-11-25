'use strict';

import React from 'react';
import { mount } from 'enzyme';
import App from '../lib/views/index';
import expect from 'expect';
import moxios from 'moxios';

let items = [
  {
    '_id': '5a16d4d42c6c901a9642ec5e',
    'isComplete': true,
    'description': 'Yoo hoo',
    'isActive': true
  },
  {
    '_id': '5a16d641c790c81ba70ad77d',
    'description': 'Third Item editing',
    'isComplete': true,
    'isActive': true
  },
  {
    '_id': '5a16f0a02ad2af3030f22dd1',
    'description': 'Fourth Item',
    'isComplete': true,
    'isActive': true
  },
  {
    '_id': '5a16f0ac2ad2af3030f22dd2',
    'isComplete': true,
    'description': 'Yoo hoo again',
    'isActive': true
  },
  {
    '_id': '5a195262cb1c0cc0a4407bf1',
    'description': 'Checking',
    'isComplete': false,
    'isActive': true
  },
  {
    '_id': '5a1954ea2380ebc1aa9dcfc4',
    'description': 'Testing',
    'isComplete': false,
    'isActive': true
  },
  {
    '_id': '5a19550b2380ebc1aa9dcfc5',
    'description': 'Yoo Hoo',
    'isComplete': false,
    'isActive': true
  }
];

moxios.stubRequest('/api/todos', {
  status: 200,
  response: items
});

describe('Checking App Rendering', () => {
  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  it('App is rendered', function (done) {
    let app = mount(<App />),
        completedItems = items.filter((item) => {
          return item.isComplete === true;
        }),
        toDoItems = items.filter((item) => {
          return item.isComplete !== true;
        });

    moxios.wait(function () {
      expect(app.find('ToDoApp').length).toEqual(1);
      expect(app.find('ToDoItems').length).toEqual(3);
      expect(app.find('.new-todo-item-input').length).toEqual(1);
      expect(app.find('ToDoItems').at(2).find('ToDoItem').length).toEqual(completedItems.length);
      expect(app.find('ToDoItems').at(1).find('ToDoItem').length).toEqual(toDoItems.length);
      done();
    });
  });

  it('Creating new ToDo item', () => {
    let app = mount(<App />),
        completedItems = items.filter((item) => {
          return item.isComplete === true;
        }),
        toDoItems = items.filter((item) => {
          return item.isComplete !== true;
        }),
        input,
        addControl,
        editControl,
        saveControl,
        deleteControl,
        toDoItemDescription;

    app.setState({
      completed: completedItems,
      toDos: toDoItems
    });

    input = app.find('ToDoItems').at(0).find('.todo input').first();
    addControl = app.find('ToDoItems').at(0).find('.todo-control').first();
    editControl = app.find('ToDoItems').at(1).find('.todo-control').first();
    toDoItemDescription = 'ToDo Item Description';

    input.simulate('change', {
      target: {
        value: toDoItemDescription
      }
    });

    addControl.simulate('click', {
      target: {
        dataset: {
          control: 'Add'
        }
      }
    });

    editControl.simulate('click', {
      target: {
        dataset: {
          control: 'Edit'
        }
      }
    });

    saveControl = app.find('ToDoItems').at(1).find('.todo-control').first();

    saveControl.simulate('click', {
      target: {
        dataset: {
          control: 'Save'
        }
      }
    });

    deleteControl = app.find('ToDoItems').at(1).find('.todo-control').at(1);

    deleteControl.simulate('click', {
      target: {
        dataset: {
          control: 'Delete'
        }
      }
    });

    expect(app.find('ToDoApp').length).toEqual(1);
    expect(app.find('ToDoItems').length).toEqual(3);
    expect(app.find('ToDoItems').at(2).find('ToDoItem').length).toEqual(completedItems.length);
    expect(app.find('ToDoItems').at(1).find('ToDoItem').length).toEqual(toDoItems.length);
  });
});