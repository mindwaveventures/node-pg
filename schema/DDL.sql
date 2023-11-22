create table users (user_id serial not null primary key,user_name varchar(30) );

create table items (item_id serial not null primary key,item_name varchar(50) not null,item_count integer not null,price integer not null);

create table rating(rating_id serial not null primary key, item_id integer references items(item_id),user_id integer references 
users(user_id),ratingValue INT CHECK (ratingValue BETWEEN 1 AND 5) );

create table cart(cart_items_id serial not null primary key,item_id integer references items(item_id),item_name varchar(50) not NULL,
user_id integer references users(user_id));

create table purchases(purchase_id serial not null primary key,item_id integer references items(item_id),user_id integer references users(user_id),
date_of_order date default cast(now() as date),item_price DECIMAL(10, 2) NOT null,status varchar(15) );

alter table items drop column price;
alter table items add column item_price DECIMAL(10, 2) NOT null;

--create table my_orders(order_id serial not null primary key, item_id integer references items(item_id),item_name varchar(50) not NULL,
--date_of_order date, item_price DECIMAL(10, 2) NOT null );

--drop table my_orders;