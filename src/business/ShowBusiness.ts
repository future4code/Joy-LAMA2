import { showInputDTO } from './../model/Show';
import { ShowDatabase } from "../data/ShowDatabase";
import { BandDatabase } from "../data/BandDatabase";
import { 
    EmptyFields,
    InvalidTime,
    NoLog,
    UnauthorizedUser,
    InvalidShowTime
} from "../error/CustomError";
import { Show, showInput, showOutputDTO, weekDay } from "../model/Show";
import { Authenticator } from "../services/Authenticator";
import { GeneratorID } from "../services/GeneratorID";
import { CheckShow } from '../services/CheckShow';

export class ShowBusiness {
    async createShow(show: showInput) {
        let { weekDay, startTime, endTime, bandId, token } = show;

        if(!weekDay || !startTime || !endTime || !bandId){
            throw new EmptyFields
        }

        if(!token){
            throw new NoLog();
        }

        const authenticator = new Authenticator();
        const accessToken = authenticator.getData(token);

        if(accessToken.role !== "ADMIN"){
            throw new UnauthorizedUser();
        }
        
        weekDay = Show.stringToWeekDay(weekDay);

        if(startTime < 8 || startTime > 23 || endTime < 8 || endTime > 23){
            throw new InvalidTime();
        }

        if(!Number.isInteger(startTime) || !Number.isInteger(endTime)){
            throw new InvalidTime();
        }

        const showDataBase = await new ShowDatabase();

        const allShows = await showDataBase.getAllShows();
        const checkShow = await CheckShow.available(allShows, show);

        if(!checkShow){
            throw new InvalidShowTime();
        }

        const id =  new GeneratorID().generate();

        const input:showInputDTO = {
            id,
            weekDay,
            startTime,
            endTime,
            bandId
        }

        await showDataBase.createShow(input);
    }
}