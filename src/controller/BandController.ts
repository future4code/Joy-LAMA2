import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BaseDatabase } from "../data/BaseDatabase"; 
import { BandInput, GetBandInput } from "../model/Bands";

export class BandController {
    async signup(req: Request, res: Response) {
        try {
                        
            const input: BandInput = {
                name: req.body.name,
                musicGenre: req.body.musicGenre,
                responsible: req.body.responsible,
                token: req.headers.authorization
            }
            
            const bandBusiness = await new BandBusiness();
            bandBusiness.createBand(input)

            res.status(201).send("Band created successfully")
        } catch (error: any) {
            res.status(500).send(error.sqlMessage || error.message);
        }
        await BaseDatabase.destroyConnection();
    }

    async getBandById(req: Request, res: Response) {
        try {
            const input: GetBandInput = {
                id: req.query.id as string,
                name: req.params.name as string
            }

            const bandBusiness = await new BandBusiness();
            const band = await bandBusiness.getBandById(input);

            res.status(200).send(band);

        } catch (error: any) {
            res.status(500).send(error.sqlMessage || error.message);
        }

        await BaseDatabase.destroyConnection();
    }
}