"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
(0, database_1.createUser)("u003", "Astrodev", "astrodev@email.com", "astrodev99");
console.table((0, database_1.getAllUsers)());
console.table((0, database_1.searchProductsByName)("Gamer"));
//# sourceMappingURL=index.js.map