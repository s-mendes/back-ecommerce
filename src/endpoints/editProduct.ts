import { Request, Response } from 'express';
import { db } from '../database/knex';

export async function editProduct (req: Request, res: Response): Promise<void> {
    try {
        const idToEdit = req.params.id as string

        const newId = req.body.id as number | string
        const newName = req.body.name as string
        const newDescription = req.body.description as string
        const newPrice = req.body.price as number
        const newImageUrl = req.body.url as string

        const [ product ] = await db("products").where({ id: idToEdit })

        if (!product) {
            res.status(404)
            throw new Error(`Product ${idToEdit} not found`)
        }
        if (newId) {
            const idExists = await db("products").where({ id: newId });
            if (idExists) {
                res.status(421)
                throw new Error(`Product id ${newId} already exist`)
            }
        }

        if (newName !== undefined) {
            if (newName.length < 3) {
                res.status(411)
                throw new Error(`Product name must be at least 3 characters`)
            }
        }

        if (newDescription !== undefined) {
            if (newDescription.length < 10) {
                res.status(411)
                throw new Error(`Description must be at last 10 characters`)
            }
        }

        if (newPrice !== undefined) {
            if (newPrice < 0) {
                res.status(411)
                throw new Error(`Price must be positive`)
            }
        }

        const newProduct = {
            id: newId || product.id,
            name: newName || product.name,
            description: newDescription || product.description,
            price: newPrice || product.price,
            image_url: newImageUrl || product.imageUrl
        }

        await db("products").update(newProduct).where({id: idToEdit})

        res.status(200).send(`Product ${product.name} edited successfully`)

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