import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';

import '@shared/typeorm';
import { App } from './app';

const server = express();

App(server);

server.listen(3333, () => console.log('Server running.'));
