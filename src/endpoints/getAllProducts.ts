import { Request, Response } from 'express';
import { db } from '../database/knex'

export async function getAllProducts (req: Request, res: Response):Promise<void> {
    try {
        const products = await db.raw(`
        SELECT * FROM products;
        `)
        res.status(200).send(products)
    } catch (error) {
        res.status(500).send(error)
    }
}