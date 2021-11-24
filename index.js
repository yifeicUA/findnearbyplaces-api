
//const api = require('./api');
//const sql_api = require('./sql_api');
const cors = require('cors');
const express = require('express');      
const application= express();
const port = process.env.PORT || 5000;      

application.use(express.json());
application.use(cors());

application.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 })

application.get('/add', (request, response) =>{
    response.send('The add request resived');
});

application.get('/add2/:n/:m', (request, response) =>{
    let n = Number(request.params.n);
    let m = Number(request.params.m);
    let sum = api.add(n,m);
    response.send(`${n} + ${m} = ${sum}`);
});
/*
application.post('/register', (request, response) =>{
    let name = request.body.name;
    let email = request.body.email;
    let password = request.body.password;
    if(api.checkCustomer(email,password)==0){
        response.sendStatus(403);
    }
    else{
        let sum = api.addCustomer(name,email,password);
        response.sendStatus(200);
        //response.send(JSON.stringify(`customer added ${name}`));
        //response.send(JSON.stringify(`customer added ${name}`));
    }
});

application.post('/login', (request, response) =>{
    let name = request.body.name;
    let email = request.body.email;
    let password = request.body.password;
    if(api.checkCustomer(email,password)==1){
        response.send(JSON. stringify({"isvalid":true,"message":"customer exist"}));
    }
    else{
        response.send(JSON. stringify({"isvalid":false,"message":"customer not exist"}));
    }

});
application.get('/flowers', (request, response) =>{
    let flowerL = api.getFlowers();
    response.send(JSON. stringify(flowerL));
});
application.get('/quizzes', (request, response) =>{
    let quizs = api.getQuizs();
    response.send(JSON. stringify(quizs));
});

application.get('/quiz/:id', (request, response) =>{
    let quiz = api.getQuizById(request.params.id);
    response.send(JSON. stringify(quiz));
});



application.post('/score', (request, response) =>{
    let quizTaker = request.body.quizTaker;
    let quizId = request.body.quizId;
    let score = request.body.score;
    //let date = request.body.date;
    api.addScore(quizTaker,quizId,score);
    response.send(JSON. stringify({"message":"update successful"}));
});

application.get('/scores/:quiztaker/:quizid', (request, response) =>{
    let quiztaker = request.body.quiztaker;
    let quizid = request.body.quizid;
    let scoreOfquiz = api.checkScore(quiztaker,quizid);
    response.send(JSON. stringify(scoreOfquiz));
});


application.post('/register', (request, response) =>{

    let name = request.body.name;
    let email = request.body.email;
    let password = request.body.password;
    sql_api.setCustomer(name,email,password)
    .then(x => {
        //response.status(200).json({message: 'The customer added'});
        response.json({message: 'The customer added'});
    })
    .catch(e => {
        console.log(e);
        //response.sendStatus(403);
        response.json({message: 'A customer with the same email already exists.'});
    })
});

application.post('/login', (request, response) =>{
    //let name = request.body.name;
    let email = request.body.email;
    let password = request.body.password;
    sql_api.checkCustomer(email,password)
    .then(x => {
        response.json({isvalid:"true",message:"customer exist"});
    })
    .catch(e => {console.log(e);
        response.json({isvalid:"false", message:"customer not exist"});
    })
});



application.get('/customer', (request, response) =>{
    sql_api.getAllCustomer()
        .then(x => {
            console.log(x);
            response.json(x);})
        .catch(e => {
            console.log(e);
            response.status(500).json({message: 'error in get all customer: '+e});
        })
    
});

application.get('/flowers', (request, response) =>{
    sql_api.getFlowers()
    .then(x => {
        console.log(x);
        response.json(x);
    })
});

application.get('/quizzes', (request, response) =>{
    sql_api.getQuizs()
    .then(x => {
        console.log(x);
        response.json(x);
    })
});

application.get('/quiz/:name', (request, response) =>{
    sql_api.getQuizById(request.params.name)
    .then(x => {
        console.log(x);
        response.json(x);
    })
});

application.post('/score', (request, response) =>{
    let quizTaker = request.body.quizTaker;
    let quizId = request.body.quizId;
    let score = request.body.score;
    //let date = request.body.date;
    sql_api.addScore(quizTaker,quizId,score)
    .then(x => {
        console.log(x);
        response.json({message:"update successful"});
    })
    .catch(e => {
        console.log(e);
        //response.sendStatus(403);
        response.json({message: 'error: '+e});
    })

});

application.get('/scores/:quiztaker/:quizid', (request, response) =>{
    let quiztaker = request.params.quiztaker;
    let quizid = request.params.quizid;
    console.log(quizid);
    //let scoreOfquiz = sql_api.checkScore(quiztaker,quizid);
    //response.json(JSON.parse(scoreOfquiz));
    //response.send(JSON. stringify(scoreOfquiz));
    sql_api.checkScore(quiztaker,quizid)
    .then(x => {
        console.log(x);
        response.json(x);
    })
    .catch(e => {
        console.log(e);
        //response.sendStatus(403);
        response.json({message: 'error: '+e});
    })

});
*/
application. listen(port, () => console.log('The application is listening to '+port))