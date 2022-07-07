import { CustomError } from "../error/CustomError";

export class Show{
    constructor(
    private id: string,
    private weekDay: weekDay,
    private startTime: number,
    private endTime: number,
    ){}

    getId(){
        return this.id;
    }
    
    getWeekDay(){
        return this.weekDay;
    }

    getStartTime(){
        return this.startTime;
    }

    getEndTime(){
        return this.endTime;
    }

    setId(id: string){
        this.id = id;
    }

    setWeekDay(weekDay: weekDay){
        this.weekDay = weekDay;
    }

    setStartTime(startTime: number){
        this.startTime = startTime;
    }

    setEndTime(endTime: number){
        this.endTime = endTime;
    }

    static stringToWeekDay(input: string): weekDay{
        switch (input) {
            case "SEXTA":
              return weekDay.SEXTA;

            case "SABADO":
              return weekDay.SABADO;

            case "DOMINGO":
                return weekDay.DOMINGO;
                
            default:
              throw new CustomError("Invalid week day, try SEXTA, SABADO or DOMINGO", 400);
          }
    }

    static toBandModel(show: any): Show {
        return new Show(show.id, show.week_day, show.start_time, show.end_time);
    }
}

export interface showInputDTO {
    id: string;
    weekDay: string;
    startTime: number;
    endTime: number;
    bandId: string;
}

export interface showInput{
    weekDay:weekDay;
    startTime: number;
    endTime: number;
    bandId: string;
    token?: string;
}

export enum weekDay{
    SEXTA = "SEXTA",
    SABADO = "SABADO",
    DOMINGO = "DOMINGO"
}

export interface showOutputDTO{
    id: string;
    week_day: string;
    start_time: number;
    end_time: number;
    band_id: string;
}