const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const { contactsRouter } = require('./contacts/contacts.router');
const mongoose = require('mongoose');
const { authRouter } = require('./auth/auth.router');
const { userRouter } = require('./users/user.router');

exports.CrudServer = class {
  constructor() {
    this.app = null;
  }

  async start() {
    this.initServer();
    await this.initDatabase();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.app = express();
  }

  async initDatabase() {
    try {
      await mongoose.connect(process.env.MONGODB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
      console.log('Database connection successful');
        
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }

  initMiddlewares() {
    this.app.use(express.json());
    this.app.use(morgan('tiny'));
    this.app.use(cors());
  }

  initRoutes() {
    this.app.use('/contacts', contactsRouter);
    this.app.use('/auth', authRouter);
    this.app.use('/users', userRouter);
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
