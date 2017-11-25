'use strict';

import { ToDos } from '../models';

/**
 * Returns the list of ToDos
 *
 * @export
 * @returns {Promise} Promise object that returns all toDo Items that are active
 */
export function getToDos () {
  return new Promise((resolve, reject) => {
    ToDos.find({
      isActive: {
        $ne: false
      }
    })
      .exec((err, toDos) => {
        if (err) {
          reject(err);
        } else {
          resolve(toDos);
        }
      });
  });
}

/**
 * Adds a new ToDo item
 *
 * @export
 * @param {Object} req - Express request object
 * @returns {Promise} Promise object that indicates if the ToDo item is added
 */
export function addToDoItem (req) {
  return new Promise((resolve, reject) => {
    ToDos.create({
      description: req.body.description,
      isComplete: false
    })
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * Update a ToDo item
 *
 * @export
 * @param {Object} req - Express request object
 * @returns {Promise} Promise object that indicates if the ToDo item is updated
 */
export function updateToDoItem (req) {
  return new Promise((resolve, reject) => {
    ToDos.findOne({
      _id: req.body.id
    })
      .exec((err, toDo) => {
        if (err) {
          reject(err);
        } else if (!toDo) {
          reject({
            status: 404,
            errorMessage: 'Missing resource'
          });
        } else {
          toDo.description = req.body.description;
          toDo.isComplete = req.body.isComplete;
          toDo.save((err) => {
            if (err) {
              reject(err);
            } else {
              resolve(true);
            }
          });
        }
      });
  });
}

/**
 * Delete a ToDo item
 *
 * @export
 * @param {Object} req - Express request object
 * @returns {Promise} Promise object that indicates if the ToDo item is marked inactive
 */
export function deleteToDoItem (req) {
  return new Promise((resolve, reject) => {
    ToDos.findOne({_id: req.body.id}, (err, toDo) => {
      if (err) {
        reject(err);
      } else if (!toDo) {
        reject({
          status: 404,
          errorMessage: 'Missing resource'
        });
      } else {
        toDo.isActive = false;
        toDo.save((err) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        });
      }
    });
  });
}
