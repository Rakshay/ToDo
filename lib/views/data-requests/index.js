import axios from 'axios';

/**
 * Retrieves all active toDo items
 *
 * @export
 * @returns {Promise} Promise object that returns all toDo Items that are active
 */
export function getToDos () {
  return new Promise((resolve, reject) => {
    axios({
      url: '/api/todos',
      method: 'get'
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * Adds a toDo item
 *
 * @export
 * @param {string} description The description of the new toDo item
 * @returns {Promise} Promise object that indicates if the ToDo item is added
 */
export function addToDo (description) {
  return new Promise((resolve, reject) => {
    axios({
      url: '/api/todos',
      method: 'post',
      data: {
        description
      }
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
 * Updates the toDo item specified
 *
 * @export
 * @param {string} id The id of the toDo item to be updated
 * @param {string} description The description of the toDo item to be updated
 * @param {boolean} isComplete The completion status of the toDo item to be updated
 * @returns {Promise} Promise object that indicates if the ToDo item is updated
 */
export function updateToDo (id, description, isComplete) {
  return new Promise((resolve, reject) => {
    axios({
      url: '/api/todos',
      method: 'put',
      data: {
        id,
        description,
        isComplete
      }
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
 * Deletes the toDo item specified
 *
 * @export
 * @param {string} id The id of the toDo item to be deleted
 * @returns {Promise} Promise object that indicates if the ToDo item is deleted
 */
export function deleteToDo (id) {
  return new Promise((resolve, reject) => {
    axios({
      url: '/api/todos',
      method: 'delete',
      data: {
        id
      }
    })
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
}