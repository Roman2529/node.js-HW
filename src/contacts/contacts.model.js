// const uuid = require('uuid');
// const fs = require('fs');
// const fsp = require('fs').promises;
// const path = require('path');
// const contactsPath = path.join(__dirname, '../../db/contacts.json');
const mongoose = require('mongoose');
const { Schema } = mongoose;


const contactsSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subscription: { type: String, required: true },
  password: { type: String, required: true },
  token: {type: String},
});

exports.ContactModel = mongoose.model('Contact', contactsSchema, 'contacts');