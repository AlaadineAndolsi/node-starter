/**
 * Module dependencies.
 */

import * as dotEnv from 'dotenv';

/**
 * Get environment variables.
 */

dotEnv.config();

import { connect } from 'mongoose';
import http from 'http';
import app from '../app';
import config from './config';

/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT || 3000;
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen({ port: port, host: '0.0.0.0' });

/**
 * Event listener for HTTP server "error" event.
 */
/* eslint no-console: 0 */
server.on('error', (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

/**
 * Event listener for HTTP server "listening" event.
 */
const dbName: string = config.DB_NAME;
const dbUrl: string = config.DB_URL.replace('<database-user>', config.DB_USER).replace(
  '<database-password>',
  config.DB_PASSWORD,
);
server.on('listening', async () => {
  const addr: any = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.info(`\x1b[4m Listening on ${bind}`);
  await connect(dbUrl, {
    dbName,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }).catch(() => {
    console.error('Database connection error');
    process.exit(1);
  });
});
