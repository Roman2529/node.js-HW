const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const { contactsRouter } = require('./contacts/contacts.router');

exports.CrudServer = class {
  constructor() {
    this.app = null;
  }

  start() {
    this.initServer();
    // this.initDatabase();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.app = express();
  }

  initMiddlewares() {
    this.app.use(express.json());
    this.app.use(morgan('tiny'));
    this.app.use(cors());
  }

  initRoutes() {
    this.app.use('/contacts', contactsRouter);
  }

  initErrorHandling() {
    this.app.use((err, rec, res, next) => {
      const statusCode = err.status || 500;
      return res.status(statusCode).send(err.message);
    });
  }

  startListening() {
    const { PORT } = process.env;
    this.app.listen(PORT, () => {
      console.log('Server started listening on port', PORT);
    });
  }
};
