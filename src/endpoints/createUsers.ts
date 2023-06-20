import { Request, Response } from 'express';
import { users } from '../database/database';
import { TUser } from '../interfaces/types/user.type';

export function createUsers (req: Request, res: Response):void {
    try {
        const id = req.body.id as number
        const name = req.body.name as string
        const email = req.body.email as string
        const password = req.body.password as string

        const searchEmail = users.find(user => user.email === email)

        if (searchEmail) {
            res.status(400)
            throw new Error(`User ${name} already exists`)
        }

        const newUser: TUser = {
            id: id,
            name: name,
            email: email,
            password: password,
            created_at: new Date().toISOString()
        }
        users.push(newUser);

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