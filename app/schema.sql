CREATE TABLE account_users (
    id serial PRIMARY key,
    first_name varchar not null,
    last_name varchar,
    username VARCHAR NOT null unique,
    email VARCHAR NOT null unique,
    user_password VARCHAR NOT NULL,
    phone_no VARCHAR,
    created_at timestamp default current_timestamp
);