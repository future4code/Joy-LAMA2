import { BandDatabase } from "../data/BandDatabase";
import { 
    Band,
    BandInput,
    GetBandInput
} from "../model/Bands";
import { 
    BandNotFound,
    EmptyFields,
    NoLog,
    UnauthorizedUser
} from "../error/CustomError";
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

    public async getBandById(input: GetBandInput){

        if(!input.id && !input.name){
            throw new EmptyFields();
        }

        const bandDatabase = new BandDatabase();
        let band

       if(input.name){
            band = await bandDatabase.getBandByName(input.name);
            if(!band){
                throw new BandNotFound();
            }
            return band;
       }else{
            band = await bandDatabase.getBandById(input.id as string);
            if(!band){
                throw new BandNotFound();
            }
            return band;
       }
    }
}