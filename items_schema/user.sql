create table users (
	user_id SERIAL primary key,
	first_name VARCHAR not null,
	last_name VARCHAR ,
	user_name VARCHAR not null unique,
	email VARCHAR not null,
	user_password VARCHAR not null,
	phone_no VARCHAR,
	created_at TIMESTAMP default current_timestamp
) ;

 insert into users (first_name, last_name, user_name, email, user_password, phone_no)
values
('Kalus', 'Mickalson', 'kalus_Mick19', 'kalusMick@gmail.com', 'bcdbVWGF38', '+1 98481 65848')