type TUser = {
    id:string | number,
    name:string,
    email:string,
    password:string,
    created_at:string
}

type TProduct = {
    id:string | number,
    name:string,
    price:number,
    description:string,
    imageUrl:string
}

export const user: TUser[] = [
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

export const product: TProduct[] = [
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
    user.push(newUser);
    return("Cadastro realizado com sucesso")
}

export const getAllUsers = () => {
    return user;
}

export const createProduct = (id: string|number, name: string, price: number, description: string, imageUrl: string) => {
    const newProduct: TProduct = {
        id: id,
        name: name,
        price: price,
        description: description,
        imageUrl: imageUrl
    }
    product.push(newProduct);
    return("Cadastro realizado com sucesso")
}

export const searchProductsByName = (name: string) => {
    const prodFilter = product.filter((prod) => prod.name.toLowerCase().includes(name.toLowerCase()))
    return prodFilter
}