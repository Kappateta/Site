const express = require('express')
const bodyParser = require('body-parser')
const fs = require("fs");

var pathUser = "./db/user.json"
var users;

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


async function save(user) {
  
}

function writeFileUser(data) {
  fs.writeFile(pathUser, data, 'utf8', function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("Arquivo " + pathUser + " salvo com sucesso!");
  });  
}

function readFileUser() {
  return fs.readFileSync(pathUser,{ encoding: 'utf8' })
}

function findAllUsers() {
  contentFile = readFileUser()
  return JSON.parse(contentFile.toString());
}

function getId(){
  contentFile = readFileUser()
  listUsers = JSON.parse(contentFile.toString());
  var listUsersDesc = listUsers.sort((a, b) => Number(b.id) - Number(a.id));
  for (let user of listUsersDesc) {
    idUser = user.id
    idUserLatest = Number(idUser) + 1
    return idUserLatest.toString()
  }
}

function findUserByUsername(username) {
  contentFile = readFileUser()
  listUsers = JSON.parse(contentFile.toString());
  for (let user of listUsers) {
    if(user.username === username) {
      return JSON.stringify(user)
    }
  }
}

function validatePassOfUser(databasePassword, reqPassword) {
  databasePasswordDecode = decodeBase64ToString(databasePassword)
  if(databasePasswordDecode == reqPassword){
    return true
  } else {
    return false
  }
}

function decodeBase64ToString(base64) {
  return Buffer.from(base64, 'base64').toString('utf-8');
}

function encodeStringToBase64(string) {
  encodedString = Buffer.from(string, 'utf8').toString('base64')
  return encodedString
}

// requisição POST que receberá o usuário e salvara no database
app.post("/user", (req, res) => {
  let data = JSON.stringify(req.body)
  let dataJson = JSON.parse(data) 
  dataSave = {
    "id": getId(),
    "username": dataJson.username,
    "password": encodeStringToBase64(dataJson.password)
  }
  users = findAllUsers()
  users.push(dataSave)
  writeFileUser(JSON.stringify(users))
  res.send({"msg": "Usuário salvo com sucesso"})
});

app.post("/login", (req, res) => {
  let data = JSON.stringify(req.body)
  let dataJson = JSON.parse(data)
  
  let userJson
  user = findUserByUsername(dataJson.username)
  if(user == undefined){
    res.status(401).send({"msg": "Usuário não existe"})
  } else {
    userJson = JSON.parse(user)
    if(validatePassOfUser(userJson.password, dataJson.password))    
      res.status(200).send({"msg": "Usuário autenticado com sucesso"})
    else
      res.status(401).send({"msg": "Não autenticado"})
  }
});



// requisição GET para listagem de todos os usuários salvos no database
app.get("/users", (req, res) => {
    users = findAllUsers()
    res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});