const uuid = require('uuid');
const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, '../../db/contacts.json');

async function listContacts() {
  const contacts = await fsp.readFile(contactsPath, 'utf-8');
  return contacts;
}

async function getContactById(contactId) {
  const contactsList = await fsp.readFile(contactsPath, 'utf-8');
  const updateList = await JSON.parse(contactsList);
  const searchContact = await updateList.find(
    el => el.id === Number(contactId),
  );
  return searchContact;
}

async function addContact(contactParams) {
  const contactsList = await fsp.readFile(contactsPath, 'utf-8');
  const updateList = await JSON.parse(contactsList);
  const newContact = {
    ...contactParams,
    id: uuid.v4(),
  };
  updateList.push(newContact);
  await fsp.writeFile(contactsPath, JSON.stringify(updateList), err => {
    if (err) {
      throw err;
    }
  });
  return updateList;
}

async function delContact(contactId) {
  const contactsList = await fsp.readFile(contactsPath, 'utf-8');
  const updateList = await JSON.parse(contactsList);
  const findIndexOfEl = await updateList.findIndex(
    el => el.id === Number(contactId),
  );
  if (findIndexOfEl === -1) {
    return;
  } else {
    await updateList.splice(findIndexOfEl, 1);
    await fsp.writeFile(contactsPath, JSON.stringify(updateList), err => {
      if (err) {
        throw err;
      }
    });
  }
}

async function updateOneContact(contactId, contactParams) {
  const contactsList = await fsp.readFile(contactsPath, 'utf-8');
  const updateList = await JSON.parse(contactsList);
  const contactIndex = updateList.findIndex(el => el.id === Number(contactId));
  if (contactIndex === -1) {
    return;
  } else {
    updateList[contactIndex] = await {
      ...updateList[contactIndex],
      ...contactParams,
    };
    await fsp.writeFile(contactsPath, JSON.stringify(updateList), err => {
      if (err) {
        throw err;
      }
    });
    return updateList[contactIndex];
  }
}

module.exports = {
  listContacts,
  addContact,
  getContactById,
  delContact,
  updateOneContact,
};
