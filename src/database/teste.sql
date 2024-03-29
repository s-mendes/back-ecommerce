-- Active: 1689195660033@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL
    );

SELECT * FROM users;

DROP TABLE users;

INSERT INTO
    users (
        id,
        name,
        email,
        password,
        created_at
    )
VALUES (
        'user001',
        'Samuel',
        'samuka@gmail.com',
        '132456',
        '15/05/2023'
    ), (
        'user002',
        'Marcolino',
        'marcolino@gmail.com',
        '123654',
        '15/05/2023'
    ), (
        'user003',
        'Ruan',
        'ruan@gmail.com',
        'S2alexandre',
        '15/05/2023'
    );

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        'prod001',
        'Mouse gamer',
        250,
        'Melhor mouse do mercado!',
        'https://picsum.photos/seed/Mouse%20gamer/400'
    ), (
        'prod002',
        'Monitor',
        900,
        'Monitor LED Full HD 24 polegadas',
        'https://picsum.photos/seed/Monitor/400'
    ), (
        'prod003',
        'Teclado Mecânico RGB',
        350,
        'Teclado mecânico com retroiluminação RGB personalizável',
        'https://picsum.photos/seed/Teclado%20Mec%C3%A2nico/400'
    ), (
        'prod004',
        'Headset Gamer com Microfone',
        400,
        'Headset gamer com som imersivo e microfone integrado',
        'https://picsum.photos/seed/Headset%20Gamer/400'
    ), (
        'prod005',
        'Cadeira Gamer Ergonômica',
        800,
        'Cadeira gamer ergonômica com ajustes de altura e inclinação',
        'https://picsum.photos/seed/Cadeira%20Gamer/400'
    );

SELECT * FROM users;

SELECT * FROM products;

SELECT * FROM products WHERE name LIKE '%gamer';

DELETE FROM users WHERE id = 'user003';

UPDATE products
SET
    name = 'Mouse Gamer Logitech',
    price = '300',
    description = 'Mouse gamer sem fio com rápida resposta para jogos',
    image_url = 'https://picsum.photos/seed/Mouse%20gamer%20logitech/400'
WHERE id = 'prod001';

CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (buyer) REFERENCES users (id)
    );

DROP TABLE purchases;

INSERT INTO
    purchases (
        id,
        buyer,
        total_price,
        created_at
    )
VALUES (
        'purchase001',
        'user001',
        250,
        '27/06/2023'
    ), (
        'purchase002',
        'user002',
        900,
        '27/06/2023'
    ), (
        'purchase003',
        'user003',
        350,
        '27/06/2023'
    );

UPDATE purchases SET total_price = 350 WHERE id = 'purchase001';

SELECT
    purchases.id,
    purchases.buyer,
    users.name,
    users.email,
    purchases.total_price,
    purchases.created_at AS 'Data da Compra'
FROM purchases
    INNER JOIN users ON purchases.buyer = users.id;

CREATE TABLE
    purchases_products (
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INT NOT NULL,
        FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

DROP TABLE purchases_products;

INSERT INTO
    purchases_products (
        purchase_id,
        product_id,
        quantity
    )
VALUES ('purchase001', 'prod001', 1), ('purchase002', 'prod002', 1), ('purchase002', 'prod003', 2), ('purchase003', 'prod004', 1), ('purchase003', 'prod005', 1);

SELECT *
FROM purchases_products
    INNER JOIN products ON purchases_products.product_id = products.id
    INNER JOIN purchases ON purchases_products.purchase_id = purchases.id;

SELECT
    purchases.id AS purchaseId,
    users.id AS buyerId,
    users.name AS buyerName,
    users.email AS buyerEmail,
    products.id AS productId,
    products.name AS productName,
    products.price AS productPrice,
    products.description AS productDescription,
    products.image_url AS productImageUrl,
    purchases_products.quantity AS productQuantity,
    purchases.total_price AS totalPrice,
    purchases.created_at AS createdAt
FROM purchases
JOIN users ON purchases.buyer = users.id
JOIN purchases_products ON purchases.id = purchases_products.purchase_id
JOIN products ON purchases_products.product_id = products.id
WHERE purchases.id = 'purchase002';