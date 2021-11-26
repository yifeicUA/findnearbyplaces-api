//const e = require('express');
const bcrypt = require('bcrypt');
const {Pool} = require('pg'); 
require('dotenv').config();
//const connectionString = `postgres://:@:5432/d8gceaqrtfr7m5`;
const connectionString = `postgres://rrdzfiasjwpwvp:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DATABASEPORT}/${process.env.DATABASE}`;
//postgres://rrdzfiasjwpwvp:67611b8b460f5c7161d94020b0e032757ced82ebca0d55115d0357bec2996163@ec2-54-225-46-224.compute-1.amazonaws.com:5432/db0lqs9mmfi2db
const connection={
    connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL: connectionString,
    ssl: {rejectUnauthorized: false}
}
const pool = new Pool(connection);

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