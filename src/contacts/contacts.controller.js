const {
  addContact,
  listContacts,
  getContactById,
  delContact,
  updateOneContact
} = require('./contacts.model');

exports.createContact = async (req, res, next) => {
  try {
    const data = req.body;
    const newContacts = await addContact(data);
    return res.status(201).send(newContacts);
  } catch (err) {
    next(err);
  }
};

exports.getMyContacts = async (req, res, next) => {
  try {
    const contactsFile = await listContacts();
    return res.status(200).send(contactsFile);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).send({ message: 'Not found' });
    }
    return res.status(200).send(contact);
  } catch (err) {
    next(err);
  }
};

exports.removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).send({ message: 'Not found' });
    }
    delContact(contactId);
    return res.status(200).send({ message: 'contact deleted' });
  } catch (err) {
    next(err);
  }
};

exports.updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    if (!(name || email || phone)) {
      return res.status(400).send({ message: 'Missing fields' });
    }
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(400).send({ message: 'Not found' });
    }
    const newUpdatedContacts = await updateOneContact(contactId, req.body);
    return res.status(200).send(newUpdatedContacts);
  } catch (err) {
    next(err);
  }
};
