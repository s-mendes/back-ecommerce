import { Request, Response } from 'express';
import { users } from '../database/database';

export function deleteUsers (req: Request, res: Response):void {
    const id = req.params.id as string
    try {
        const userIndex = users.findIndex(user => user.id === id)

        if (userIndex < 0) {
            res.status(404)
            throw new Error(`User ${id} not found`)
        }

        users.splice(userIndex, 1)
        res.status(200).send(`User ${id} deleted successfully`)
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