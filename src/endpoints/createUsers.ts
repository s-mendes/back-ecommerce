import { Request, Response } from 'express';
import { db } from '../database/knex';

export async function createUsers (req: Request, res: Response):Promise<void> {
    try {
        const id = req.body.id as number | string;
        const name = req.body.name as string;
        const email = req.body.email as string;
        const password = req.body.password as string;

        const users = await db.raw(`
        SELECT email FROM users;
        `);

        const searchEmail = users.find((user:any) => user.email === email)

        if (searchEmail) {
            res.status(400)
            throw new Error(`User ${name} already exists`)
        }
        
        await db.raw(`
        INSERT INTO users (id, name, email, password, created_at) VALUES 
        ("${id}", "${name}", "${email}", "${password}", "${new Date().toISOString()}");
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