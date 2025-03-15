# --- !Ups
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE baskets(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL
);

CREATE TABLE basket_items(
    id SERIAL PRIMARY KEY,
    quantity INT NOT NULL DEFAULT 1,
    basket_id INT NOT NULL REFERENCES baskets(id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE
);

# --- !Downs
DROP TABLE products
DROP TABLE categories
DROP TABLE baskets
DROP TABLE basket_items
