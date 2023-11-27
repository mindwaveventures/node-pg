
create database amazon_clone;

CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR,
    item_content VARCHAR,
    price INT,
    item_count integer not null
);
INSERT INTO items (item_name, item_content, price,item_count) VALUES
  ('Almonds', 'Healthy nuts with a crunchy texture', 220, 25),
  ('Candy', 'Assorted sweets and candies for a sweet tooth', 25,30),
  ('Cashews', 'Creamy and buttery flavored cashew nuts', 330,35),
  ('Cookies', 'Delicious baked cookies for a tasty treat', 15,40),
  ('Crackers', 'Crunchy crackers perfect for snacking', 440,45),
  ('Dried fruit', 'Assortment of dried fruits for a nutritious snack', 518,50),
  ('Popcorn', 'Classic popcorn, a favorite movie-time snack', 35,55),
  ('Potato chips', 'Savory potato chips with various flavors', 22,60);