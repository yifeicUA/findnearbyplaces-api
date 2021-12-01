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
    //add a orderby for sort
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

let addPlace = (name,category_id,latitude,longitude,description) => {
    return pool.query('insert into findnearbyplaces.place(name,latitude,longitude,description,category_id,customer_id) values ($1,$2,$3,$4,$5,$6)',
    [name,latitude,longitude,description,category_id,1])
    .then(x => {
        return pool.query(`select id from findnearbyplaces.place where name = $1 and latitude = $2 and longitude = $3`,[name,latitude,longitude])
        .then(x => {
            console.log(x.rows[0].id);
            return x.rows[0].id;
        })
        
        //response.send(JSON. stringify({"done":true,"id": x.rows[0].id,"message":"category added successful"}));
    })
    .catch(e => {
        return e;
    })
}

let addPhoto = (photo,place_id,review_id) => {
    pool.query(`insert into findnearbyplaces.photo(file) values (${photo})`);
    if(place_id!=null)return pool.query(`insert into findnearbyplaces.place_photo(location_id,photo_id) values (${place_id},(select id from findnearbyplaces.photo where file = ${photo}))`);
    else if(review_id!=null)return pool.query(`insert into findnearbyplaces.review_photo(review_id,photo_id) values (${review_id},(select id from findnearbyplaces.photo where file = ${photo}))`);
}
let addCategory = (category) => {
    return pool.query('insert into findnearbyplaces.category(name) values ($1)',
    [category])
    .then(x => {
        return pool.query(`select id from findnearbyplaces.category where name = $1`,[category])
        .then(x => {
            console.log(x.rows[0].id);
            return x.rows[0].id;
        })
        
        //response.send(JSON. stringify({"done":true,"id": x.rows[0].id,"message":"category added successful"}));
    })
    .catch(e => {
        return e;
    })
}
let addReview = (place_id,comment,rating) => {
    return pool.query('insert into findnearbyplaces.reviews(location_id,customer_id,text,rating) values ($1,$2,$3,$4)',
    [place_id,1,comment,rating])
    .then(x => {
        return pool.query(`select id from findnearbyplaces.reviews where location_id = $1 and text = $2 and rating = $3`,[place_id,comment,rating])
        .then(x => {
            console.log(x.rows[0].id);
            return x.rows[0].id;
        })
        
        //response.send(JSON. stringify({"done":true,"id": x.rows[0].id,"message":"category added successful"}));
    })
    .catch(e => {
        return e;
    })
}

//update method

let updatePlace = (place_id,name,category_id,latitude,longitude,description) => {
    if(name!=-1)pool.query(`update findnearbyplaces.place set name = ${name} where id = ${place_id} ;`).catch(e => {
        return 1;
    })
    if(category_id!=-1)pool.query(`update findnearbyplaces.place set category_id = ${category_id} where id = ${place_id} ;`).catch(e => {
        return 1;
    })
    if(latitude!=-1)pool.query(`update findnearbyplaces.place set latitude = ${latitude} where id = ${place_id} ;`).catch(e => {
        return 1;
    })
    if(longitude!=-1)pool.query(`update findnearbyplaces.place set longitude = ${longitude} where id = ${place_id} ;`).catch(e => {
        return 1;
    })
    if(description!=-1)pool.query(`update findnearbyplaces.place set description = ${description} where id = ${place_id} ;`).catch(e => {
        return 1;
    })
    return 0;
}

let updateReview = (review_id,comment,rating) => {
    if(comment!=null)pool.query('update findnearbyplaces.reviews set text = '+comment+' where id = '+review_id+';')
        .catch(e => {
            return 1;
        })
    if(rating!=null)pool.query('update findnearbyplaces.reviews set rating = '+rating+' where id = '+review_id+';')
        .catch(e => {
            return 1;
        })
    return 0;
}

let updatePhoto = (photo_id,photo) => {
    let sql = ``;
    if(photo!=null)sql += `update findnearbyplaces.photo set photo=${photo} where id=${photo_id};`;
    return pool.query(sql);
}


//delete method

let delatePlace = (place_id) => {
    return pool.query('delete from findnearbyplaces.reviews where location_id=$1',
    [place_id])
    .then(x => {
        return pool.query('delete from findnearbyplaces.place where id = $1',
        [place_id]);
    })
}

let delateReview = (review_id) => {
    return pool.query('delete from findnearbyplaces.reviews where id=$1',
    [review_id]);
}

let delatePhoto = (photo_id) => {
    return pool.query('delete from findnearbyplaces.photo where id=$1',
    [photo_id]);
}

exports.search = search;
exports.setCustomer = setCustomer;
exports.addPlace = addPlace;
exports.addPhoto = addPhoto;
exports.addCategory = addCategory;
exports.addReview = addReview;
exports.updatePlace = updatePlace;
exports.updateReview = updateReview;
exports.updatePhoto = updatePhoto;
exports.delatePlace = delatePlace;
exports.delateReview = delateReview;
exports.delatePhoto = delatePhoto;