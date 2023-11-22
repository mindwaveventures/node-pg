CREATE TABLE ratings (
    rating_id SERIAL PRIMARY KEY,
    item_id INT REFERENCES items(item_id),
    rating INT,
    CONSTRAINT fk_item FOREIGN KEY (item_id) REFERENCES items(item_id)
);
   