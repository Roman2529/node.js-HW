const { Router } = require('express');
const {
  createContact,
  getMyContacts,
  getById,
  removeContact,
  updateContact,
} = require('./contacts.controller');
const { validate } = require('../helpers/validate.middleware');
const { createContactSchema } = require('./contacts.schemes');

const router = Router();

router.post('/', validate(createContactSchema), createContact);

router.get('/', getMyContacts);

router.get('/:contactId', getById);

router.delete('/:contactId', removeContact);

router.patch('/:contactId', updateContact);

exports.contactsRouter = router;
