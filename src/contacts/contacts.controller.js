const { required } = require("joi");

const {
  ContactModel
} = require('./contacts.model');

exports.createContact = async (req, res, next) => {
  try {
    const data = req.body;
    const newContacts = await ContactModel.create(data);
    return res.status(201).send(newContacts);
  } catch (err) {
    next(err);
  }
};

exports.getContacts = async (req, res, next) => {
  try {
    const contactsFile = await ContactModel.find();
    return res.status(200).send(contactsFile);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await ContactModel.findById(contactId);
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
    const delContact = await ContactModel.findByIdAndDelete(contactId);
    if (!delContact) {
      return res.status(404).send({ message: 'Not found' });
    }
    return res.status(200).send({ message: 'contact deleted' });
  } catch (err) {
    next(err);
  }
};

exports.updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone, subscription, password} = req.body;
    if (!(name || email || phone || subscription || password)) {
      return res.status(400).send({ message: 'Missing fields' });
    }
    const updatedContact = await ContactModel.findOneAndUpdate(
      contactId,
      req.body,
    );
    if (!updatedContact) {
      return res.status(400).send({ message: 'Not found' });
    }
    return res.status(200).send(updatedContact);
  } catch (err) {
    next(err);
  }
};
