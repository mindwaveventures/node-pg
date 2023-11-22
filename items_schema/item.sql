CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR,
    item_content VARCHAR,
    price INT,
    status_of_item VARCHAR
);

INSERT INTO items (item_name, item_content, price,status_of_item ) VALUES
  ('Almonds', 'Healthy nuts with a crunchy texture', 220,'Available'),
  ('Candy', 'Assorted sweets and candies for a sweet tooth', 25,'Available'),
  ('Cashews', 'Creamy and buttery flavored cashew nuts', 330,'Bought'),
  ('Cookies', 'Delicious baked cookies for a tasty treat', 15,'Cancelled'),
  ('Crackers', 'Crunchy crackers perfect for snacking', 440,'Cancelled'),
  ('Dried fruit', 'Assortment of dried fruits for a nutritious snack', 518,'Bought'),
  ('Popcorn', 'Classic popcorn, a favorite movie-time snack', 35,'Available'),
  ('Potato chips', 'Savory potato chips with various flavors', 22,'Bought');
  sss