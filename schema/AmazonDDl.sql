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

drop table my_orders;

alter table cart add column item_price DECIMAL(10, 2) NOT null;


--begin transaction;
--
--update cart set item_name ='abc' where item_name ='Pen' or 1=1
--
--
--
--rollback
--select * from cart c 

drop table users;
alter table rating drop constraint rating_user_id_fkey;
alter table cart drop constraint cart_user_id_fkey;
alter table purchases drop constraint purchases_user_id_fkey;

create table account_users (
	user_id SERIAL primary key,
	first_name VARCHAR not null,
	last_name VARCHAR ,
	user_name VARCHAR not null unique,
	email VARCHAR not null,
	user_password VARCHAR not null,
	phone_no VARCHAR,
	created_at TIMESTAMP default current_timestamp
);
alter table rating drop column user_id;
alter table rating add column user_id integer  references account_users(user_id) on delete cascade;
alter table cart drop column user_id;
alter table purchases  drop column user_id;
alter table cart add column user_id integer  references account_users(user_id) on delete cascade;
alter table purchases  add column user_id integer  references account_users(user_id) on delete cascade;

alter table rating drop constraint rating_item_id_fkey;
alter table cart drop constraint cart_item_id_fkey;
alter table purchases drop constraint purchases_item_id_fkey;

drop table items;

CREATE TABLE items (
    item_id SERIAL not null PRIMARY KEY,
    item_name VARCHAR,
    item_content VARCHAR,
    item_price INT,
    item_count integer not null
);

INSERT INTO items (item_name, item_content, item_price ,item_count) VALUES
  ('Almonds', 'Healthy nuts with a crunchy texture', 220, 25),
  ('Candy', 'Assorted sweets and candies for a sweet tooth',  25,30),
  ('Cashews', 'Creamy and buttery flavored cashew nuts', 330,35),
  ('Cookies', 'Delicious baked cookies for a tasty treat', 15,40),
  ('Crackers', 'Crunchy crackers perfect for snacking', 440,45),
  ('Dried fruit', 'Assortment of dried fruits for a nutritious snack', 518,50),
  ('Popcorn', 'Classic popcorn, a favorite movie-time snack', 35,55),
  ('Potato chips', 'Savory potato chips with various flavors', 22,60);
 alter table rating drop column item_id;
alter table rating add column item_id  integer  references items(item_id) on delete cascade;
 alter table cart drop column item_id;
alter table cart add column item_id  integer  references items(item_id) on delete cascade;
alter table purchases  drop column item_id;
alter table purchases  add column item_id  integer  references items(item_id) on delete cascade;

create table favourites(favourite_id serial primary key not null,item_id integer references items(item_id),user_id integer references account_users(user_id));





