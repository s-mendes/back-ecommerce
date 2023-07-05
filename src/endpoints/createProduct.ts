import { Request, Response } from 'express';
import { db } from '../database/knex'

export async function createProducts (req: Request, res: Response):Promise<void> {
    try {
        const id = req.body.id as string
        const name = req.body.name as string
        const description = req.body.description as string
        const price = req.body.price as number
        const imageUrl = req.body.url as string

        const  products = await db.raw(`
        SELECT * from products;
        `)

        const idExists = products.find((product:any) => product.id === id)

        if (idExists) {
            res.status(421)
            throw new Error(`Product id ${id} already exist`)
        }

        if (name !== undefined) {
            if (name.length < 3) {
                res.status(411)
                throw new Error(`Product name must be at least 3 characters`)
            }
        }

        if (description !== undefined) {
            if (description.length < 10) {
                res.status(411)
                throw new Error(`Description must be at last 10 characters`)
            }
        }

        if (price !== undefined) {
            if (price < 0) {
                res.status(411)
                throw new Error(`Price must be positive`)
            }
        }

        await db.raw(`
        INSERT INTO products (id, name, price, description, image_url) VALUES
        ('${id}', '${name}', '${price}', '${description}', '${imageUrl}');
        `)
        res.status(200).send("Registration done successfully")

    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected error")
        }
    }

}