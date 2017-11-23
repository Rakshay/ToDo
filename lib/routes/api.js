'use strict';

import { Router as routerFactory } from 'express';

let router = routerFactory();

router.route('/api/')
  .get((req, res) => {
    res.status(200).json({});
  });

export default router;
