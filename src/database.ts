export type TUser = {
    id:string | number,
    name:string,
    email:string,
    password:string,
    created_at:string
}

export type TProduct = {
    id:string | number,
    name:string,
    price:number,
    description:string,
    imageUrl:string
}

export const users: TUser[] = [
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
]

export const products: TProduct[] = [
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
]

export const createUser = (id: string|number, name: string, email: string, password: string) => {
    const newUser:TUser = {
        id: id,
        name: name,
        email: email,
        password: password,
        created_at: new Date().toISOString()
    }
    users.push(newUser);
    console.log(users)
    return("Cadastro realizado com sucesso")
}

export const getAllUsers = () => {
    return users;
}

export const getAllProducts = () => {
    return products;
}

export const createProduct = (id: string|number, name: string, price: number, description: string, imageUrl: string) => {
    const newProduct: TProduct = {
        id: id,
        name: name,
        price: price,
        description: description,
        imageUrl: imageUrl
    }
    products.push(newProduct);
    console.log(products);
    return("Cadastro realizado com sucesso")
}

export const searchProductsByName = (name: string) => {
    const prodFilter = products.filter((prod) => prod.name.toLowerCase().includes(name.toLowerCase()))
    return prodFilter
}

