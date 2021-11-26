const db = require('./db');


let search = (search_terms,user_location, radius_filter,maximum_results_to_return,category_filter,sort) => {
    return db.search(search_terms,user_location, radius_filter,maximum_results_to_return,category_filter,sort);
}

let checkScore = (quiztaker,quizid) => {
    return db.checkScore(quiztaker,quizid);
}

let getAllCustomer= () =>{
    return db.getAllCustomer();
}


let setCustomer = (name,email,password) => {
    return db.setCustomer(name,email,password);
}

let checkCustomer = (email,password) => {
    return db.checkCustomer(email,password);
}


let getFlowers = () => {
    return db.getFlowers();
}

let getQuizs= () =>{
    return db.getQuizs();
}

let getQuizById = (name) => {
    return db.getQuizById(name);
}


exports.search = search;
