const db = require('./db');


let search = (search_terms,user_location, radius_filter,maximum_results_to_return,category_filter,sort) => {
    return db.search(search_terms,user_location, radius_filter,maximum_results_to_return,category_filter,sort);
}

let setCustomer = (email,password) => {
    return db.setCustomer(email,password);
}

let addPlace = (name,category_id,latitude,longitude,description) => {
    return db.addPlace(name,category_id,latitude,longitude,description);
}

let addPhoto = (photo,place_id,review_id) => {
    return db.addPhoto(photo,place_id,review_id);
}

let addCategory = (category) => {
    return db.addCategory(category);
}

let addReview = (place_id,comment,rating) => {
    return db.addReview(place_id,comment,rating);
}

let updatePlace = (place_id,name,category_id,latitude,longitude,description) => {
    return db.updatePlace(place_id,name,category_id,latitude,longitude,description);
}

let updateReview = (review_id,comment,rating) => {
    return db.updateReview(review_id,comment,rating);
}

let updatePhoto = (photo_id,photo) => {
    return db.updatePhoto(photo_id,photo);
}

let delatePlace = (place_id) => {
    return db.delatePlace(place_id);
}

let delateReview = (review_id) => {
    return db.delateReview(review_id);
}

let delatePhoto = (photo_id) => {
    return db.delatePhoto(photo_id);
}

exports.search = search;
exports.setCustomer = setCustomer;
exports.addPlace = addPlace;
exports.addPhoto = addPhoto;
exports.addReview = addReview;
exports.updatePlace = updatePlace;
exports.updateReview = updateReview;
exports.updatePhoto = updatePhoto;
exports.delatePlace = delatePlace;
exports.delateReview = delateReview;
exports.delatePhoto = delatePhoto;