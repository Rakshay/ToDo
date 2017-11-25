'use strict';

import React from 'react';
import { mount } from 'enzyme';
import ToDoItems from '../lib/views/toDoItems';
import expect from 'expect';
import sinon from 'sinon';

let onAction = sinon.spy(),
    items = [
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

describe('Checking ToDoItems Rendering', () => {
  let toDoItems = mount(<ToDoItems onAction={onAction} items={items} />);

  after(() => {
    toDoItems.unmount();
  });

  it('ToDoItems are rendered', () => {
    expect(toDoItems.find('ToDoItem').length).toEqual(items.length);
  });
});

describe('Checking ToDoItems Rendering', () => {
  let toDoItems = mount(<ToDoItems onAction={onAction} >Content</ToDoItems>);

  after(() => {
    toDoItems.unmount();
  });

  it('Content is rendered', () => {
    expect(toDoItems.text()).toEqual('Content');
  });
});