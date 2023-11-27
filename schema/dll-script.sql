-- ddl script

create table account_users (
	user_id SERIAL primary key,
	first_name VARCHAR not null,
	last_name VARCHAR ,
	user_name VARCHAR not null unique,
	email VARCHAR not null,
	user_password VARCHAR not null,
	phone_no VARCHAR,
	created_at TIMESTAMP default current_timestamp
) 