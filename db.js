//const e = require('express');
const bcrypt = require('bcrypt');
const {Pool} = require('pg'); 
require('dotenv').config();
const connectionString = `postgres://rrdzfiasjwpwvp:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DATABASEPORT}/${process.env.DATABASE}`;
const connection={
    connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL: connectionString,
    ssl: {rejectUnauthorized: false}
}
const pool = new Pool(connection);

//get method

let search = (search_terms,user_location, radius_filter,maximum_results_to_return,category_filter,sort) => {
    let sql = '';
    //let distance = Math.sqrt(Math.pow(pos.latitude - pos2.latitude, 2) + Math.pow(pos.longitude - pos2.longitude, 2));
    //sql +=`select latitude,longitude from findnearbyplaces.place where name = ${user_location}`
    sql +=`select * from findnearbyplaces.place where name like ${search_terms}`;
    if(radius_filter!=null){
        sql+=` and sqrt(square(latitude - (select latitude from findnearbyplaces.place where name = ${user_location})) 
        + square(longitude - (select longitude from findnearbyplaces.place where name = ${user_location}))) <= ${radius_filter}`;
    }
    if(category_filter!=null)sql +=` and category_id = (select id from findnearbyplaces.category where name = ${category_filter})`;
    if(maximum_results_to_return!=null)sql +=` limit ${maximum_results_to_return},`;
    return pool.query(sql);
}


//add method

let setCustomer = (email,password) => {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    return pool.query('insert into findnearbyplaces.customer(email,password) values ($1,$2)',
    [email.toLowerCase(),hashPassword]);
}

let storePlace = (name,category_id,latitude,longitude,description) => {
    return pool.query('insert into findnearbyplaces.place(name,category_id,latitude,longitude,description) values ($1,$2,$3,$4,$5)',
    [name,category_id,latitude,longitude,description]);
}

let addPhoto = (photo,place_id,review_id) => {
    pool.query(`insert into findnearbyplaces.photo(file) values (${photo})`);
    if(place_id!=null)pool.query(`insert into findnearbyplaces.place_photo(location_id,photo_id) values (${place_id},(select id from findnearbyplaces.photo where file = ${photo}))`);
    else if(review_id!=null)pool.query(`insert into findnearbyplaces.review_photo(review_id,photo_id) values (${review_id},(select id from findnearbyplaces.photo where file = ${photo}))`);
}

let addReview = (place_id,comment,rating) => {
    return pool.query('insert into findnearbyplaces.reviews(place_id,comment,rating) values ($1,$2,$3)',
    [place_id,comment,rating]);
}

//update method

let updatePlace = (place_id,name,category_id,latitude,longitude,description) => {
    let sql = '';
    if(name!=null)sql += `update findnearbyplaces.place set name=${name} where place_id=${place_id};`;
    if(category_id!=null)sql += `update findnearbyplaces.place set category_id=${category_id} where place_id=${place_id};`;
    if(latitude!=null)sql += `update findnearbyplaces.place set latitude=${latitude} where place_id=${place_id};`;
    if(longitude!=null)sql += `update findnearbyplaces.place set longitude=${longitude} where place_id=${place_id};`;
    if(description!=null)sql += `update findnearbyplaces.place set description=${description} where place_id=${place_id};`;
    return pool.query(sql);
}

let updateReview = (review_id,comment,rating) => {
    let sql = '';
    if(comment!=null)sql += `update findnearbyplaces.reviews set comment=${comment} where review_id=${review_id};`;
    if(rating!=null)sql += `update findnearbyplaces.reviews set rating=${rating} where review_id=${review_id};`;
    return pool.query(sql);
}

let updatePhoto = (photo_id,photo) => {
    let sql = '';
    if(photo!=null)sql += `update findnearbyplaces.photo set photo=${photo} where review_id=${photo_id};`;
    return pool.query(sql);
}


//delete method
let delatePlace = (place_id) => {
    return pool.query('delete from findnearbyplaces.place where place_id=$1',
    [place_id]);
}

let delateReview = (review_id) => {
    return pool.query('delete from findnearbyplaces.reviews where review_id=$1',
    [review_id]);
}

let delatePhoto = (photo_id) => {
    return pool.query('delete from findnearbyplaces.place where photo_id=$1',
    [photo_id]);
}

exports.search = search;
exports.setCustomer = setCustomer;
exports.storePlace = storePlace;
exports.addPhoto = addPhoto;
exports.addReview = addReview;
exports.updatePlace = updatePlace;
exports.updateReview = updateReview;
exports.updatePhoto = updatePhoto;
exports.delatePlace = delatePlace;
exports.delateReview = delateReview;
exports.delatePhoto = delatePhoto;
/*
//1. customer: id, name, email, password (note: never save the actual password into the database. You should always encrypt the password and save the hashed password.)
let getAllCustomer= () =>{
    return pool.query('select * from imagequiz.customer')
    .then(x => x.rows);
   // .catch(e => console.log(e));
}

let setCustomer = (name,email,password) => {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    return pool.query('insert into imagequiz.customer(name,email,password) values ($1,$2,$3)',
    [name,email.toLowerCase(),hashPassword]);
}

let checkCustomer = (email,password) =>{
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    return pool.query('select * from imagequiz.customer where (email = $1 and password = $2)',
    [email.toLowerCase(),hashPassword]);
}
//3. category: id, name




//2. question: id, picture, choices, answer
//4. quiz: id, name, category_id

let getQuizs = () =>{
    return pool.query('select * from imagequiz.quiz')
    .then(x => x.rows);
}

let getQuizById = (name) =>{
    return pool.query('select q2.* from imagequiz.quiz q inner join imagequiz.quiz_question qq on q.id = qq.quiz_id inner join imagequiz.question q2 on q2.id = qq.question_id where q.name = $1',
    [name])
    .then(x => x.rows);
}
//5. quiz_question: quiz_id, question_id




//6. flower: id, name, picture
let getFlowers= () =>{
    //pool.query('');
    //pool.query('drop table if exists imagequiz.flower; create table imagequiz.flower(id bigserial primary key,name text not null,picture text not null);');
    //for (var i = 0; i < flowers.length; i++) {
    //    pool.query('create table if not exists imagequiz.flower(id bigserial primary key,name text not null,picture text not null);');
    //    pool.query('insert into imagequiz.flower(name,picture) values ($1,$2)',[flowers[i].name,flowers[i].picture]);
    //}
    return pool.query('select * from imagequiz.flower')
    .then(x => x.rows);
   // .catch(e => console.log(e));
}


let addScore = (quizTaker,quizId, score) => {
    //scores.push({quizTaker,quizId,score});
    return pool.query('select * from imagequiz.customer where email = $1',[quizTaker.toLowerCase()])
    .then(x => {
        console.log(quizTaker.toLowerCase());
        console.log(x.rows);
        pool.query('insert into imagequiz.score(customer_id,quiz_id,score) values ($1,$2,$3)',[x.rows[0].id,quizId,score]).then(x => x.rows);
    })
    //return pool.query('insert into imagequiz.score(customer_id,quiz_id,score) values ($1,$2,$3)',
    //[quizTaker,quizId,score]);
}


let checkScore = (quiztaker,quizid) => {
    return pool.query('select * from imagequiz.customer where email = $1',[quiztaker.toLowerCase()])
    .then(x => {
        console.log(x.rows[0].id);
        console.log(quizid);
        return pool.query('select * from imagequiz.score where (customer_id = $1 and quiz_id = $2)',[x.rows[0].id,quizid]).then(x => {
            console.log(x.rows);
            return x.rows});
    
    });
}



exports.getAllCustomer = getAllCustomer;
exports.setCustomer = setCustomer;
exports.checkCustomer = checkCustomer;
exports.getFlowers = getFlowers;
exports.getQuizs = getQuizs;
exports.getQuizById = getQuizById;
exports.addScore = addScore;
exports.checkScore = checkScore;
*/