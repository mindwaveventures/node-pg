-- ddl script

create table account_users (
	id SERIAL primary key,
	first_name VARCHAR not null,
	last_name VARCHAR ,
	user_name VARCHAR not null unique,
	email VARCHAR not null,
	user_password VARCHAR not null,
	phone_no VARCHAR,
	created_at TIMESTAMP default current_timestamp
) 

CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR not null,
    item_content VARCHAR,
    price integer DECIMAL(10, 2) not null,
    item_count integer not null
);

CREATE TABLE favourites (
    fav_id SERIAL PRIMARY KEY,
    item_id SERIAL references items(item_id) on delete cascade on update cascade,
    user_id SERIAL references account_users(id) on delete cascade on update cascade,
);

create table ratings(
    rating_id serial not null primary key, 
    item_id integer references items(item_id) on delete cascade on update cascade,
    user_id integer references users(user_id) on delete cascade on update cascade,
    rating INT CHECK (rating BETWEEN 1 AND 5)
);

create table carts(
    cart_id serial not null primary key,
    item_id integer references items(item_id) on delete cascade on update cascade,
    user_id integer references users(user_id) on delete cascade on update cascade,
    item_name varchar(255) not NULL,
    price integer DECIMAL(10, 2) not null,
);

create table purchases(
    purchase_id serial not null primary key,
    item_id integer references items(item_id) on delete cascade on update cascade,
    user_id integer references users(user_id) on delete cascade on update cascade,
    date_of_order date default cast(now() as date),
    order_status varchar(255)
    item_price DECIMAL(10, 2) NOT null,
);