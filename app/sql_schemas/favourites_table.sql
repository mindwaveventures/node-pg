CREATE TABLE favourites (
    favourite_id SERIAL PRIMARY KEY,
    item_id INT,
    user_id INT,
    CONSTRAINT fk_item FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "users"(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);