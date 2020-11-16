const { Router } = require('express');
const {
  createContact,
  getContacts,
  getById,
  removeContact,
  updateContact,
} = require('./contacts.controller');
const { validate } = require('../helpers/validate.middleware');
const { createContactSchema, updateContactSchema, validateIdSchema} = require('./contacts.schemes');

const router = Router();

router.post('/', validate(createContactSchema), createContact);

router.get('/', getContacts);

router.get('/:contactId', validate(validateIdSchema, "params"), getById);

router.delete(
  '/:contactId',
  validate(validateIdSchema, 'params'),
  removeContact
);

router.patch(
  '/:contactId',
  validate(validateIdSchema, 'params'),
  validate(updateContactSchema),
  updateContact
);

exports.contactsRouter = router;
