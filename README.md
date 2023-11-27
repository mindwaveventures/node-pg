# node-pg

- User Account

  - Authentication, verify it account already exist
  - Signup, create new account
  - login, verify and open the user_data account
  - view, get the user_data account
  - update, change the user_date verify before changing.

- items

  - Do items adding to site
  - Update item contents
  - Then items list with filters, search, sorting
  - view single item
  - add item to cart

- Rating

  - add rating to item (range from 1 to 5)
  - list overall ratings for single product. then ratings must be average.

- favourites

  - favourite item
  - list items which I liked/favourite with filters, search, sorting

- Purchases
  - buy item
  - list items which I bought with filters, search, sorting
  - cancel order
  - list items which I cancelled with filters, search, sorting

## schema

create table account_users (
id SERIAL primary key,
first_name VARCHAR not null,
last_name VARCHAR ,
user_name VARCHAR not null unique,
email VARCHAR not null,
user_password VARCHAR not null,
phone_no VARCHAR,
createdAt TIMESTAMP default current_timestamp
)

## sign up

- Creates the user data with first_name, last_name, unique username and email
- joi validation

## updating the user_data

- update the user_data with validation
- username and email should not repeat in the database with joi validation

## login

- using email id and password
