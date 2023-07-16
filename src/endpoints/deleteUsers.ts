import { Request, Response } from 'express';
import { db } from '../database/knex';

export async function deleteUsers (req: Request, res: Response):Promise<void> {
    try {
        const idToDelete = req.params.id as string
        
        const [ user ] = await db("users").where({ id: idToDelete});

        if (!user) {
            res.status(404)
            throw new Error("'id' not found")
        }

        await db("users").where({ id: idToDelete }).del();
        
        res.status(200).send(`User ${idToDelete} deleted successfully`)
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