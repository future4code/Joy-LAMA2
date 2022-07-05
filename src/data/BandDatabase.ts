import { BaseDatabase } from "./BaseDatabase";
import { BandInputDTO } from "../model/Bands";

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
};