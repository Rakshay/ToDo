'use strict';

import express from 'express';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import methodOverride from 'method-override';
import compression from 'compression';
import path from 'path';
import nconf from 'nconf';
import logger from './lib/services/logger';
import middleware from './lib/middleware';
import Routes from './lib/routes';
import mongoose from './lib/services/mongoose';

const buildDir = path.join(__dirname, 'public', 'assets');
const port = nconf.get('port');
const app = express();

mongoose.init(nconf.get('mongoDb'));

app.use(morgan('dev', {
  stream: logger.stream
}));
app.use(compression());
app.use(methodOverride());
app.use(middleware.setNoCache);
app.use(middleware.encodedBodyParser);
app.use(middleware.jsonBodyParser);
app.use(middleware.rawBodyParser);
app.use(methodOverride());

app.set('port', port);
app.use(favicon(path.join(buildDir, 'favicon.ico')));
app.use(express.static(path.join(process.cwd(), 'public')));

Routes.attach(app);

app.use((req, res) => {
  res.sendFile(path.join(buildDir, 'index.html'));
});

app.listen(port, () => {
  logger.log('info', `App started and listening at port ${port}`);
});

process.addListener('uncaughtException', (err) => {
  logger.error('Uncaught Error', err);
});

export default app;
