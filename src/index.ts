import { createUser, getAllUsers, searchProductsByName } from './database'

createUser("u003", "Astrodev", "astrodev@email.com", "astrodev99")
console.table(getAllUsers())

console.table(searchProductsByName("Gamer"))