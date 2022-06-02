import {User} from "./user";
export {User} from "./user";

export class Appointment {
  constructor(public id:number, public label:string, public starttime:string, public endtime:string,
              public offer_id: number, public user_id: number, public status:string,){

  }
}
