import express from "express";
 
const app = express();
const port = 8000;

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const users = { 
    users_list : [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yay999', 
          name: 'Tu',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

const findUserByName = (name) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name); 
}

// app.get('/users', (req, res) => {
//     const name = req.query.name;
//     if (name != undefined){
//         let result = findUserByName(name);
//         result = {users_list: result};
//         res.send(result);
//     }
//     else{
//         res.send(users);
//     }
// });

const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);
    
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});

// app.get('/users', (req, res) => {
//     res.send(users);
// });

const addUser = (user) => {
    users['users_list'].push(user);
    return user;
}

const newUser = 
{
    "id": "qwe123",
    "job": "Zookeeper",
    "name": "Cindy"
 };

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
});

fetch("http://localhost:8000/users", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
});

const delUser = (id) => {
    let result = findUserById(id);
    if (result) {
        const num = users['users_list'].indexOf(result);
        users['users_list'].splice(num, 1);
    }
    return result;
}

app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = delUser(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});

const findUserByNameJob = (name, job) => { 
    return (users['users_list']
        .filter( (user) => user['name'] === name))
        .filter( (user) => user['job'] === job); 
}

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    let result;
    if (name != undefined && job!= undefined){
        result = findUserByNameJob(name, job);
        result = {users_list: result};
        res.send(result);
    }
    else if (name != undefined) {
        result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});