type TUser = {
    id:string,
    name:string,
    email:string,
    password:string,
    created_at:string
}

type TProduct = {
    id:string,
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