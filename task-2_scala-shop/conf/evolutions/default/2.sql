# --- !Ups
INSERT INTO categories (name) VALUES('Electronics');
INSERT INTO categories (name) VALUES('Clothing');
INSERT INTO categories (name) VALUES('Food');
INSERT INTO categories (name) VALUES('Furniture');
INSERT INTO categories (name) VALUES('Toys');

INSERT INTO products (name, price, category_id) VALUES
   ('Product A', 10.99, 1),
   ('Product B', 15.49, 2),
   ('Product C', 5.99, 3),
   ('Product D', 20.00, NULL),
   ('Product E', 12.50, NULL);


INSERT INTO baskets (user_id) VALUES(1);
INSERT INTO baskets (user_id) VALUES(2);

INSERT INTO basket_items (quantity, basket_id, product_id) VALUES(2, 1, 1);
INSERT INTO basket_items (quantity, basket_id, product_id) VALUES(1, 2, 3);
INSERT INTO basket_items (quantity, basket_id, product_id) VALUES(4, 2, 3);