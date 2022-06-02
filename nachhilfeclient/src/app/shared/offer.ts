import {Appointment} from "./appointment";
import {User} from "./user";
export {Appointment} from "./appointment";
export {User} from "./user";

export class Offer {
  constructor(public id:number, public title:string, public status:string, public subject:string,
              public user_id:number, public appointments: Appointment[], public description?:string,
              public comment?:string) {
  }
}
