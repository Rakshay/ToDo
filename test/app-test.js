'use strict';

import React from 'react';
import { mount } from 'enzyme';
import App from '../lib/views/index';
import expect from 'expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockData from './mockData';

let mock = new MockAdapter(axios),
    items = mockData.list;

mock.onGet('/api/todos').reply(() => {
  return [200, items];
});

describe('Checking App Rendering', () => {
  it('App is rendered', function (done) {
    this.timeout(4000);
    let app = mount(<App />),
        completedItems = items.filter((item) => {
          return item.isComplete === true;
        }),
        toDoItems = items.filter((item) => {
          return item.isComplete !== true;
        });

    setTimeout(() => {
      expect(app.find('ToDoApp').length).toEqual(1);
      expect(app.find('ToDoItems').length).toEqual(3);
      expect(app.find('.new-todo-item-input').length).toEqual(1);
      expect(app.find('ToDoItems').at(2).find('ToDoItem').length).toEqual(completedItems.length);
      expect(app.find('ToDoItems').at(1).find('ToDoItem').length).toEqual(toDoItems.length);
      done();
    }, 2000);
  });

  it('Creating new ToDo item', function (done) {
    this.timeout(4000);
    let app = mount(<App />),
        completedItems,
        toDoItems,
        input,
        addControl,
        toDoItemDescription;

    input = app.find('ToDoItems').at(0).find('.todo input').first();
    addControl = app.find('ToDoItems').at(0).find('.todo-control').first();
    toDoItemDescription = 'ToDo Item Description';

    items.push({
      '_id': '5a16d641c790c81ba70ad77d',
      'description': toDoItemDescription,
      'isComplete': true,
      'isActive': true
    });

    setTimeout(() => {
      mock.reset();

      mock.onGet('/api/todos').reply(() => {
        return [200, items];
      });

      mock.onPost('/api/todos').reply(() => {
        return [200, items];
      });

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

      completedItems = items.filter((item) => {
        return item.isComplete === true;
      });
      toDoItems = items.filter((item) => {
        return item.isComplete !== true;
      });

      expect(app.find('ToDoApp').length).toEqual(1);
      expect(app.find('ToDoItems').length).toEqual(3);
      expect(app.find('ToDoItems').at(2).find('ToDoItem').length).toEqual(completedItems.length);
      expect(app.find('ToDoItems').at(1).find('ToDoItem').length).toEqual(toDoItems.length);
      done();
    }, 2000);
  });

  it('Editing ToDo item', function (done) {
    this.timeout(6000);
    let app = mount(<App />),
        toDoItems = items.filter((item) => {
          return item.isComplete !== true;
        }),
        id = toDoItems[1]['_id'],
        input,
        editControl,
        saveControl,
        toDoItemDescription = 'New Description';

    toDoItems[1].description = toDoItemDescription;

    setTimeout(() => {
      for (let i = 0, len = items.length; i < len; i++) {
        if (items[i]['_id'] === id) {
          items[i].description = toDoItemDescription;
        }
      }

      mock.reset();

      mock.onGet('/api/todos').reply(() => {
        return [200, items];
      });

      mock.onPut('/api/todos').reply(() => {
        return [200, true];
      });

      editControl = app.find('ToDoItems').at(1).find('ToDoItem').at(1).find('.todo-control').first();

      editControl.simulate('click', {
        target: {
          dataset: {
            control: 'Edit'
          }
        }
      });

      input = app.find('ToDoItems').at(1).find('ToDoItem').at(1).find('input').first();

      input.simulate('change', {
        target: {
          value: toDoItemDescription
        }
      });

      saveControl = app.find('ToDoItems').at(1).find('ToDoItem').at(1).find('.todo-control').first();

      saveControl.simulate('click', {
        target: {
          dataset: {
            control: 'Save'
          }
        }
      });

      setTimeout(() => {
        expect(app.find('ToDoApp').length).toEqual(1);
        expect(app.find('ToDoItems').length).toEqual(3);
        expect(app.find('ToDoItems').at(1).find('ToDoItem').at(1).find('.to-do-description').first().text()).toEqual(toDoItemDescription);
        done();
      }, 2000);
    }, 2000);
  });

  it('Deleting ToDo item', function (done) {
    this.timeout(6000);
    let app = mount(<App />),
        completedItems,
        toDoItems = items.filter((item) => {
          return item.isComplete !== true;
        }),
        id = toDoItems[1]['_id'],
        deleteControl;

    setTimeout(() => {
      items = items.filter((item) => {
        return item['_id'] !== id;
      });

      mock.reset();

      mock.onGet('/api/todos').reply(() => {
        return [200, items];
      });

      mock.onDelete('/api/todos').reply(() => {
        return [200, true];
      });

      deleteControl = app.find('ToDoItems').at(1).find('ToDoItem').at(1).find('.todo-control').at(1);

      deleteControl.simulate('click', {
        target: {
          dataset: {
            control: 'Delete'
          }
        }
      });

      setTimeout(() => {
        completedItems = items.filter((item) => {
          return item.isComplete === true;
        });
        toDoItems = items.filter((item) => {
          return item.isComplete !== true;
        });

        expect(app.find('ToDoApp').length).toEqual(1);
        expect(app.find('ToDoItems').length).toEqual(3);
        expect(app.find('ToDoItems').at(2).find('ToDoItem').length).toEqual(completedItems.length);
        expect(app.find('ToDoItems').at(1).find('ToDoItem').length).toEqual(toDoItems.length);
        done();
      }, 2000);
    }, 2000);
  });
});