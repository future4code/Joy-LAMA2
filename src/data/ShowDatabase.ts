import { showInputDTO, showOutputDTO } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";


export class ShowDatabase extends BaseDatabase {

    private static TABLE_NAME = "LAMA_SHOWS"

    public async createShow(show: showInputDTO): Promise<void> {
        try {
            await this.getConnection()
            .insert({
                id: show.id,
                week_day: show.weekDay,
                start_time: show.startTime,
                end_time: show.endTime,
                band_id: show.bandId
            })
            .into(ShowDatabase.TABLE_NAME);
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getAllShows(): Promise<showOutputDTO[]> {
        try {
            const result = await this.getConnection()
            .select("*")
            .from(ShowDatabase.TABLE_NAME);

            return result;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
};