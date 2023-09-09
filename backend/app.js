const express = require("express");
//const fs = require('fs/promises');
var fs = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();

async function save(user) {
  try {
    await fs.appendFile('./db/user.json', user);
    } catch (err) {
      console.log(err);
    }
}

getUser(function (err, content) {
  console.log(content)
})

let users

function listAllUsers() {
  dbFile = "./db/user.json"
  fs.readFile(dbFile, function read(err, data) {
    if (err) {
        throw err;
    }
    users = JSON.parse(data.toString());
  });
  //console.log("users: " + users)
}

app.get("/users", (req, res) => {
    listAllUsers()
    console.log("user: ", users)
    res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});