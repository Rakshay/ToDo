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
}

export function getToDos () {
  return new Promise((resolve, reject) => {
    axios({
      url: '/api',
      method: 'get'
    })
    .then((response) => {
      resolve(response.data);
    })
    .catch((err) => {
      reject(getError(err));
    })
  });
}