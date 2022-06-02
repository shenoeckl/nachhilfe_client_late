import {Offer} from "./offer";

export class OfferFactory {
  static empty():Offer{
    return new Offer(0,'','','',0,
      [{id:0,label:'',status:'',starttime:'',endtime:'',offer_id:0,user_id:0}],
      '','')
  }

  static fromObject(rawOffer : any): Offer{
    //Cast from JSON Object via Rest to Offer Domain Object
    return new Offer(
      rawOffer.id,
      rawOffer.title,
      rawOffer.status,
      rawOffer.subject,
      rawOffer.user_id,
      rawOffer.appointments,
      rawOffer.description,
      rawOffer.comment
    );
  }
}
