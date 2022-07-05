import { BaseDatabase } from "./BaseDatabase";
import { BandInputDTO, GetBandInput } from "../model/Bands";
import { Band } from "../model/Bands";

export class BandDatabase extends BaseDatabase {

    private static TABLE_NAME = "LAMA_BANDS"

    public async createBand(input: BandInputDTO): Promise<void> {
        try {
            await this.getConnection()
            .insert({
                id: input.id,
                name: input.name,
                music_genre: input.musicGenre,
                responsible: input.responsible
            })
            .into(BandDatabase.TABLE_NAME);
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getBandById(band: GetBandInput) {       
        let result 
        if(band.id){
            result = await this.getConnection()
            .select("*")
            .from(BandDatabase.TABLE_NAME)
            .where({ id: band.id })
        }else{
            result = await this.getConnection()
            .select("*")
            .from(BandDatabase.TABLE_NAME)
            .where({ name: band.name })
        }      

        return result[0]
    }
};