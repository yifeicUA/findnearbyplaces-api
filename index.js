
const api = require('./api');
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

//1. A GET method: search(search_terms, user_location, radius_filter, max imum_results_to_return, category_filter, sort)
application.get('/search', (request, response) =>{
    let search_terms = request.body.search_terms;
    let user_location = request.body.user_location;
    let radius_filter = request.body.radius_filter;
    let maximum_results_to_return = request.body.maximum_results_to_return;
    let category_filter = request.body.category_filter;
    let sort = request.body.sort;
    if(api.search(search_terms,user_location,radius_filter,maximum_results_to_return,category_filter,sort)==0){
        response.sendStatus(403);
    }
    else{
        api.search(search_terms,user_location,radius_filter,maximum_results_to_return,category_filter,sort);
        response.sendStatus(200);
        //response.send(JSON.stringify(`customer added ${name}`));
        //response.send(JSON.stringify(`customer added ${name}`));
    }
});



//2. A POST method: customer(email, password)
application.post('/customer', (request, response) =>{
    let email = request.body.email;
    let password = request.body.password;
    if(api.checkCustomer(email,password)==0){
        response.sendStatus(403);
    }
    else{
        let sum = api.addCustomer(email,password);
        response.sendStatus(200);
        //response.send(JSON.stringify(`customer added ${name}`));
        //response.send(JSON.stringify(`customer added ${name}`));
    }
});





//3. A POST method: place(name, category_id, latitude, longitude, description)
application.post('/place', (request, response) =>{
    let name = request.body.name;
    let category_id = request.body.category_id;
    let latitude = request.body.latitude;
    let longitude = request.body.longitude;
    let description = request.body.description;
    if(api.checkPlace(name,category_id,latitude,longitude,description)==1){
        response.send(JSON. stringify({"done":true,"id":id,"message":"customer exist"}));
    }
    else{
        response.send(JSON. stringify({"done":false,"id":id,"message":"customer not exist"}));
    }
});





//4. A POST method: photo(photo, place_id, review_id)
application.post('/photo', (request, response) =>{
    let photo = request.body.photo;
    let place_id = request.body.place_id;
    let review_id = request.body.review_id;
    if(api.checkPlace(photo,place_id,review_id)==1){
        response.send(JSON. stringify({"done":true,"id":id,"message":"customer exist"}));
    }
    else{
        response.send(JSON. stringify({"done":false,"id":id,"message":"customer not exist"}));
    }
});




//5. A POST method: review(place_id, comment, rating)
application.post('/review', (request, response) =>{
    let place_id = request.body.place_id;
    let comment = request.body.comment;
    let rating = request.body.rating;
    if(api.checkPlace(place_id,comment,rating)==1){
        response.send(JSON. stringify({"done":true,"id":id,"message":"customer exist"}));
    }
    else{
        response.send(JSON. stringify({"done":false,"id":id,"message":"customer not exist"}));
    }
});


//6. A Put method: place(place_id, name, category_id, latitude, longitude, description)
application.put('/place', (request, response) =>{
    let place_id = request.body.place_id;
    let name = request.body.name;
    let category_id = request.body.category_id;
    let latitude = request.body.latitude;
    let longitude = request.body.longitude;
    let description = request.body.description;
    if(api.checkPlace(place_id,name,category_id,latitude,longitude,description)==1){
        response.send(JSON. stringify({"done":true,"message":"customer exist"}));
    }
    else{
        response.send(JSON. stringify({"done":false,"message":"customer not exist"}));
    }
});

//7. A PUT method: review(review_id, comment, rating)
application.put('/review', (request, response) =>{
    let review_id = request.body.review_id;
    let comment = request.body.comment;
    let rating = request.body.rating;
    if(api.checkPlace(review_id,comment,rating)==1){
        response.send(JSON. stringify({"done":true,"message":"customer exist"}));
    }
    else{
        response.send(JSON. stringify({"done":false,"message":"customer not exist"}));
    }
});


//8. A PUT method: photo(photo_id, photo)
application.put('/photo', (request, response) =>{
    let photo_id = request.body.photo_id;
    let photo = request.body.photo;
    if(api.checkPlace(photo_id,photo)==1){
        response.send(JSON. stringify({"done":true,"message":"customer exist"}));
    }
    else{
        response.send(JSON. stringify({"done":false,"message":"customer not exist"}));
    }
});

//9. A DELETE method: place(place_id)
application.delete('/place', (request, response) =>{
    let place_id = request.body.place_id;
    if(api.checkPlace(place_id)==1){
        response.send(JSON. stringify({"done":true,"message":"customer exist"}));
    }
    else{
        response.send(JSON. stringify({"done":false,"message":"customer not exist"}));
    }
});

//10. A DELETE method: review(review_id)
application.delete('/photo', (request, response) =>{
    let review_id = request.body.review_id;
    if(api.checkPlace(review_id)==1){
        response.send(JSON. stringify({"done":true,"message":"customer exist"}));
    }
    else{
        response.send(JSON. stringify({"done":false,"message":"customer not exist"}));
    }
});

//11. A DELETE method: photo(photo_id)
application.delete('/photo', (request, response) =>{
    let photo_id = request.body.photo_id;
    if(api.checkPlace(photo_id)==1){
        response.send(JSON. stringify({"done":true,"message":"customer exist"}));
    }
    else{
        response.send(JSON. stringify({"done":false,"message":"customer not exist"}));
    }
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