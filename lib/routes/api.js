'use strict';

import { Router as routerFactory } from 'express';
import * as toDosController from '../controllers/toDos';

let router = routerFactory();

router.route('/api/toDos')
  .get((req, res) => {
    toDosController.getToDos()
      .then((toDos) => {
        res.status(200).json(toDos);
      });
  })
  .post((req, res) => {
    toDosController.addToDoItem(req, res)
      .then(() => {
        res.status(200).json({});
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  })
  .put((req, res) => {
    toDosController.updateToDoItem(req, res)
      .then(() => {
        res.status(200).json({});
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  })
  .delete((req, res) => {
    toDosController.deleteToDoItem(req, res)
      .then(() => {
        res.status(200).json({});
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

export default router;
