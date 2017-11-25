'use strict';

import React from 'react';
import { mount } from 'enzyme';
import ToDoItem from '../lib/views/toDoItem';
import expect from 'expect';
import sinon from 'sinon';

let onAction = sinon.spy();

describe('Checking ToDoItem : Create Mode', () => {
  let toDoItem = mount(<ToDoItem onAction={onAction} mode="create" />);

  after(() => {
    toDoItem.unmount();
  });

  it('Input is rendered', () => {
    expect(toDoItem.find('.todo input').length).toEqual(1);
  });

  it('Add Control is rendered', () => {
    expect(toDoItem.find('.todo-control').length).toEqual(1);
    expect(toDoItem.find('.todo-control').first().text()).toEqual('Add');
  });

  it('Entering ToDo description is captured', () => {
    let input = toDoItem.find('.todo input').first(),
        toDoItemDescription = 'ToDo Item Description';

    input.simulate('change', {
      target: {
        value: toDoItemDescription
      }
    });

    expect(input.prop('value')).toEqual(toDoItemDescription);
  });

  it('Entering ToDo description and clicking save triggers onSave action', () => {
    let input = toDoItem.find('.todo input').first(),
        saveControl = toDoItem.find('.todo-control').first(),
        toDoItemDescription = 'ToDo Item Description',
        args;

    input.simulate('change', {
      target: {
        value: toDoItemDescription
      }
    });

    saveControl.simulate('click', {
      target: {
        dataset: {
          control: 'Add'
        }
      }
    });

    args = onAction.args;


    expect(onAction.callCount).toEqual(1);
    expect(args[0][0]).toEqual('Add');
    expect(args[0][1].description).toEqual(toDoItemDescription);
  });
});

describe('Checking ToDoItem : View Mode', () => {
  let toDoItemProps = {
        description: 'Item 1',
        _id: 1,
        isComplete: false
      },
      toDoItem = mount(<ToDoItem onAction={onAction} {...toDoItemProps} />);

  after(() => {
    toDoItem.unmount();
  });

  it('Checkbox is rendered', () => {
    expect(toDoItem.find('.todo input[type="checkbox"]').length).toEqual(1);
  });

  it('Controls are rendered', () => {
    expect(toDoItem.find('.todo-control').length).toEqual(2);
    expect(toDoItem.find('.todo-control').at(0).text()).toEqual('Edit');
    expect(toDoItem.find('.todo-control').at(1).text()).toEqual('Delete');
  });

  it('Props updates gets captured', () => {
    let description = toDoItem.find('.todo span').first(),
        updatedDescription = 'Updated Description';

    expect(description.text()).toEqual(toDoItemProps.description);

    toDoItem.setProps({description: updatedDescription});

    expect(description.text()).toEqual(updatedDescription);

    toDoItem.setProps({description: toDoItemProps.description});
  });

  it('ToDo description is rendered', () => {
    let description = toDoItem.find('.todo span').first();

    expect(description.text()).toEqual(toDoItemProps.description);
  });

  it('Clicking "Edit" triggers edit mode', () => {
    let control = toDoItem.find('.todo-control').at(0);

    control.simulate('click', {
      target: {
        dataset: {
          control: 'Edit'
        }
      }
    });

    expect(toDoItem.find('.todo-control').at(0).text()).toEqual('Save');
    expect(toDoItem.find('.todo-control').at(1).text()).toEqual('Delete');
    expect(toDoItem.find('.todo input[type="text"]').length).toEqual(1);
    expect(toDoItem.find('.todo input[type="checkbox"]').length).toEqual(1);
  });
});

describe('Checking ToDoItem : Edit Mode', () => {
  let toDoItemProps = {
        description: 'Item 1',
        _id: 1,
        isComplete: false
      },
      toDoItem = mount(<ToDoItem onAction={onAction} {...toDoItemProps} />),
      control = toDoItem.find('.todo-control').at(0);

  after(() => {
    toDoItem.unmount();
  });

  control.simulate('click', {
    target: {
      dataset: {
        control: 'Edit'
      }
    }
  });

  it('Controls are rendered', () => {
    expect(toDoItem.find('.todo-control').at(0).text()).toEqual('Save');
    expect(toDoItem.find('.todo-control').at(1).text()).toEqual('Delete');
    expect(toDoItem.find('.todo input[type="text"]').length).toEqual(1);
    expect(toDoItem.find('.todo input[type="checkbox"]').length).toEqual(1);
  });

  it('Changing description and saving triggers "Update"', () => {
    let input = toDoItem.find('.todo input[type="text"]').first(),
        saveControl = toDoItem.find('.todo-control').first(),
        toDoItemDescription = 'ToDo Item Description',
        args;

    input.simulate('change', {
      target: {
        value: toDoItemDescription
      }
    });

    saveControl.simulate('click', {
      target: {
        dataset: {
          control: 'Save'
        }
      }
    });

    args = onAction.args;


    expect(onAction.callCount).toEqual(2);
    expect(args[1][0]).toEqual('Save');
    expect(args[1][1].description).toEqual(toDoItemDescription);
  });

  it('Checking checkbox triggers "Update"', () => {
    let checkbox = toDoItem.find('.todo input[type="checkbox"]').first(),
        args;

    checkbox.simulate('change', {
      target: {
        checked: true
      }
    });

    args = onAction.args;

    expect(onAction.callCount).toEqual(3);
    expect(args[2][0]).toEqual('Save');
    expect(args[2][1].isComplete).toEqual(true);
  });
});
