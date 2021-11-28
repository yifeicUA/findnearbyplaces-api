create schema if not exists findnearbyplaces;

drop table if exists findnearbyplaces.category cascade;
create table findnearbyplaces.category
(
	id bigserial primary key,
	name text not null
);


drop table if exists findnearbyplaces.customer cascade;
create table findnearbyplaces.customer
(
	id bigserial primary key,
	email text not null unique,
	password text not null
);

insert into findnearbyplaces.customer (email,password)
values('napicchen@gmail.com','123');

drop table if exists findnearbyplaces.place cascade;
create table findnearbyplaces.place
(
	id bigserial primary key,
	name text not null unique,
	latitude int not null,
    longitude int not null,
    description text not null,
    category_id int not null references findnearbyplaces.category(id),
    customer_id int not null references findnearbyplaces.customer(id)
);

drop table if exists findnearbyplaces.reviews cascade;
create table findnearbyplaces.reviews
(
	location_id int not null references findnearbyplaces.place(id),
	customer_id int not null references findnearbyplaces.customer(id),
	id bigserial primary key,
	text text not null,
    rating int not null
);


drop table if exists findnearbyplaces.photo cascade;
create table findnearbyplaces.photo
(
	id bigserial primary key,
    file text not null
);

drop table if exists findnearbyplaces.place_photo cascade;
create table findnearbyplaces.place_photo
(
	location_id int not null references findnearbyplaces.place(id),
    photo_id int not null references findnearbyplaces.photo(id)
);

drop table if exists findnearbyplaces.review_photo cascade;
create table findnearbyplaces.review_photo
(
	review_id int not null references findnearbyplaces.reviews(id),
    photo_id int not null references findnearbyplaces.photo(id)
);