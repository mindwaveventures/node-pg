# node-pg

- Authentication, verify it account already exist
- Signup, create new account
- login, verify and open the user_data account
- view, get the user_data account
- update, change the user_date verify before changing.

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

## Priya
