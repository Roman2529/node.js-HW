
const fs = require("fs");
const path = require("path");


const contactsPath = path.join(__dirname, "./db/contacts.json")

function listContacts() {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
      console.table(JSON.parse(data));
  })
}

function getContactById(contactId) {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
        console.table(JSON.parse(data).filter(el => el.id === contactId));
        
    })
  
}

function removeContact(contactId) {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
        const arr = JSON.parse(data)
        const itemsExDel = arr.filter(el => el.id !== contactId)
        fs.writeFile(contactsPath, JSON.stringify(itemsExDel), err => {
            if (err) {
                console.log("error");
            } 
        })
    })
}
function addContact(name, email, phone) {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
        const newId = Math.random() * (99 - 11) + 11;
        const id = Math.round(newId)
        const addArr = { id, name, email, phone }
        let gotArr = JSON.parse(data);
        gotArr = [...gotArr, addArr]
        const stringArr = JSON.stringify(gotArr)
        fs.writeFile(contactsPath, stringArr, err => {
            if (err) {
                console.log(error);
            }
        })
        
    })
}
module.exports = {
    listContacts, getContactById, removeContact, addContact
};

