-- Active: 1687211858084@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

SELECT * FROM users;

DROP TABLE users;

INSERT INTO users (id, name, email, password, created_at) VALUES 
('user001', 'Samuel', 'samuka@gmail.com', '132456', '15/05/2023' ),
('user002', 'Marcolino', 'marcolino@gmail.com', '123654', '15/05/2023'),
('user003', 'Ruan', 'ruan@gmail.com', 'S2alexandre', '15/05/2023');

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

INSERT INTO products (id, name, price, description, image_url) VALUES
("prod001","Mouse gamer",250,"Melhor mouse do mercado!","https://picsum.photos/seed/Mouse%20gamer/400"),
("prod002","Monitor",900,"Monitor LED Full HD 24 polegadas","https://picsum.photos/seed/Monitor/400"),
("prod003","Teclado Mecânico RGB",350,"Teclado mecânico com retroiluminação RGB personalizável","https://picsum.photos/seed/Teclado%20Mec%C3%A2nico/400"),
("prod004","Headset Gamer com Microfone",400,"Headset gamer com som imersivo e microfone integrado","https://picsum.photos/seed/Headset%20Gamer/400"),
("prod005","Cadeira Gamer Ergonômica",800,"Cadeira gamer ergonômica com ajustes de altura e inclinação","https://picsum.photos/seed/Cadeira%20Gamer/400");