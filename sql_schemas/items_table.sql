
create database amazon_clone;

CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR,
    item_content VARCHAR,
    price INT
);

INSERT INTO items (item_name, item_content, price) VALUES
  ('Almonds', 'Healthy nuts with a crunchy texture', 220),
  ('Candy', 'Assorted sweets and candies for a sweet tooth', 25),
  ('Cashews', 'Creamy and buttery flavored cashew nuts', 330),
  ('Cookies', 'Delicious baked cookies for a tasty treat', 15),
  ('Crackers', 'Crunchy crackers perfect for snacking', 440),
  ('Dried fruit', 'Assortment of dried fruits for a nutritious snack', 518),
  ('Popcorn', 'Classic popcorn, a favorite movie-time snack', 35),
  ('Potato chips', 'Savory potato chips with various flavors', 22);
