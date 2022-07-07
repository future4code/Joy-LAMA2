import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { BaseDatabase } from "../data/BaseDatabase"; 


export class ShowController {
    async signup(req: Request, res: Response) {
        try {

            const input = {
                weekDay: req.body.weekDay,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                bandId: req.body.bandId,
                token: req.headers.authorization
            }

            await new ShowBusiness().createShow(input);
            
            res.status(201).send({message: "Show created successfully"})
        } catch (error: any) {
            res.status(500).send(error.sqlMessage || error.message);
        }

        await BaseDatabase.destroyConnection();
    }
}