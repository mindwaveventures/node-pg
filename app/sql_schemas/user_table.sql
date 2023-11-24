CREATE TABLE "user" (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL
);
INSERT INTO "user" (user_name) VALUES
    ('John Doe'),
    ('Jane Smith'),
    ('Alice Johnson'),
    ('Bob Brown'),
    ('Eva Davis'),
    ('Michael Wilson'),
    ('Olivia Miller'),
    ('Daniel Lee'),
    ('Sophia Turner'),
    ('William Clark');