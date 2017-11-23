import axios from 'axios';

const getError = (error) => {
  let errorObj = {
    status: 500,
    message: 'Server encountered an error'
  };

  if (error.response) {
    errorObj.status = error.response.status;
    errorObj.message = error.response.data;
  } else if (error.request) {
    console.log(error.request);
  } else {
    errorObj.message = error.message;
  }

  return errorObj;
};

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
        reject(getError(err));
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
        reject(getError(err));
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
        reject(getError(err));
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
        reject(getError(err));
      });
  });
}