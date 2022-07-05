import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusness";
import { BaseDatabase } from "../data/BaseDatabase"; 
import { BandInput } from "../model/Bands";

export class BandController {
    async signup(req: Request, res: Response) {
        try {
            
            const input: BandInput = {
                name: req.body.name,
                musicGenre: req.body.musicGenre,
                responsible: req.body.responsible,
                token: req.headers.authorization as string
            }

            const bandBusiness = await new BandBusiness();
            bandBusiness.createBand(input)

            res.status(201).send("Band created successfully")
        } catch (error: any) {
            res.status(500).send(error.sqlMessage || error.message);
        }

        await BaseDatabase.destroyConnection();
    }
}