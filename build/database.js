"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductsByName = exports.createProduct = exports.getAllUsers = exports.createUser = exports.product = exports.user = void 0;
exports.user = [
    {
        id: "u001",
        name: "Fulano",
        email: "fulano@gmail.com",
        password: "password123",
        created_at: new Date().toISOString()
    },
    {
        id: "u002",
        name: "Deltrano",
        email: "deltrano@gmail.com",
        password: "password123",
        created_at: new Date().toISOString()
    },
];
exports.product = [
    {
        id: "prod001",
        name: "Mouse Gamer",
        price: 250,
        description: "Melhor mouse do mercado",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400"
    },
    {
        id: "prod002",
        name: "Monitor",
        price: 900,
        description: "Monitor LED Full HD 24 polegadas",
        imageUrl: "https://picsum.photos/seed/Monitor/400"
    }
];
const createUser = (id, name, email, password) => {
    const newUser = {
        id: id,
        name: name,
        email: email,
        password: password,
        created_at: new Date().toISOString()
    };
    exports.user.push(newUser);
    return ("Cadastro realizado com sucesso");
};
exports.createUser = createUser;
const getAllUsers = () => {
    return exports.user;
};
exports.getAllUsers = getAllUsers;
const createProduct = (id, name, price, description, imageUrl) => {
    const newProduct = {
        id: id,
        name: name,
        price: price,
        description: description,
        imageUrl: imageUrl
    };
    exports.product.push(newProduct);
    return ("Cadastro realizado com sucesso");
};
exports.createProduct = createProduct;
const searchProductsByName = (name) => {
    const prodFilter = exports.product.filter((prod) => prod.name.toLowerCase().includes(name.toLowerCase()));
    return prodFilter;
};
exports.searchProductsByName = searchProductsByName;
//# sourceMappingURL=database.js.map