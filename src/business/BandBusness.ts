import { BandDatabase } from "../data/BandDatabase";
import { BandInput } from "../model/Bands";
import { EmptyFields, NoLog, UnauthorizedUser } from "../error/BaseError";
import { Authenticator } from "../services/Authenticator";
import { GeneratorID } from "../services/GeneratorID";

export class BandBusiness {
    async createBand(input: BandInput) {

            const idGenerator = new GeneratorID();
            const id = idGenerator.generate();

            if (!input.token) {
                throw new NoLog();
            }
            
            const authenticator = await new Authenticator();
            const accessToken = authenticator.getData(input.token);

            if (accessToken.role !== "ADMIN") {
                throw new UnauthorizedUser();
            }

            if (!input.name || !input.musicGenre || !input.responsible) {
                throw new EmptyFields();
            }
            
            const inputBand = {
                id,
                name: input.name,
                musicGenre: input.musicGenre,
                responsible: input.responsible,
            }

            const bandDatabase = new BandDatabase();
            await bandDatabase.createBand(inputBand)
    }
}