import { showOutputDTO, weekDay } from './../model/Show';
export class CheckShow {
    public static async available(allShow: showOutputDTO[], show: any): Promise<boolean> {
        const check = allShow.find((e => e.week_day === show.weekDay && 
            e.start_time === show.startTime && e.end_time === show.endTime))

        if(check){
            return false;
        }else{
            return true
        }
    }
}