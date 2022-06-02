import {Component, OnInit} from '@angular/core';
import {Offer, User, Appointment} from "../shared/offer";
import {NachhilfeStoreService} from "../shared/nachhilfe-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OfferFactory} from "../shared/offer-factory";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../shared/authentication.service";
import {retry} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'bs-offer-details',
  templateUrl: './offer-details.component.html',
  styles: [
  ]
})
export class OfferDetailsComponent implements OnInit {


  user: User = new User(0,'','','','','');
  ApUser: User = new User(0,'','','','','');
  offer : Offer = OfferFactory.empty();
  appointment : Appointment = new Appointment(0,'','','',0,0,'');

  constructor(
    private bs: NachhilfeStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr : ToastrService,
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.bs.getSingle(params['id']).subscribe(o=>{
      this.offer = o;
      this.bs.getUser(this.offer.user_id).subscribe(res => {
        this.user = res;
      });
      for (let ap of this.offer.appointments){
        if(this.offer.user_id != ap.user_id){
          this.bs.getUser(ap.user_id).subscribe(res=> this.ApUser = res);
        }
      }
    });
  }

  removeOffer(){
    this.toastr.success("Erfolgreich", "Angebot wurde gelöscht!");
    if(confirm("Wollen Sie dieses Angebot wirklich löschen?")){
      this.bs.remove(this.offer.id).subscribe(res => this.router.navigate(["../"],
        {relativeTo:this.route}));
    }
  }

  removeAppointment(id:number){
    this.toastr.success("Erfolgreich", "Termin wurde gelöscht!");
    if(confirm("Wollen Sie diesen Termin wirklich löschen?")){
      this.bs.removeAppointment(id).subscribe(res => this.router.navigate(["../"],
        {relativeTo:this.route}));
    }
  }

  setComment(offer:Offer){
    const commentText = document.getElementById('comment-text') as HTMLInputElement | null;
    const commentValue = commentText?.value;
    const commentUser = document.getElementById('comment-user') as HTMLInputElement | null;
    const User = commentUser?.value;
    const comment = commentValue+" von "+User;
    offer.comment = comment;
    this.bs.update(offer).subscribe();
  }

  removeComment(offer: Offer){
    this.bs.update(offer).subscribe();
  }

  requestAppointment(offer:Offer, appointment:Appointment, id:number){
    offer.status = "Antwort";
    this.toastr.success("Angefragt", "Termin wurde erfolgreich angefragt");
    appointment.status = "Angefragt";
    appointment.user_id = id;
    this.bs.updateAppointment(appointment).subscribe();
    this.bs.update(offer).subscribe();
  }

  acceptAppointment(offer:Offer, appointment:Appointment){
    offer.status = "Angenommen";
    this.toastr.success("Angenommen", "Termin wurde erfolgreich angenommen");
    appointment.status = "Vergeben";
    for(let ap of offer.appointments){
      if(ap.status != "Vergeben"){
        this.bs.removeAppointment(ap.id);
      }
    }
    this.bs.updateAppointment(appointment).subscribe();
    this.bs.update(offer).subscribe();
  }

  denyAppointment(offer:Offer, appointment:Appointment){
    offer.status = "Abgelehnt";
    this.toastr.success("Done", "Termin wurde erfolgreich durchgeführt");
    appointment.status = "Abgelehnt";
    this.bs.updateAppointment(appointment).subscribe();
    this.bs.update(offer).subscribe();
  }

  offerDoneWell(offer: Offer, appointment:Appointment){
    offer.status = "Erfolgreich";
    this.toastr.success("Done", "Termin wurde erfolgreich durchgeführt");
    appointment.status = "Durchgeführt";
    this.bs.updateAppointment(appointment).subscribe();
    this.bs.update(offer).subscribe();
  }

  offerDoneBad(offer: Offer, appointment:Appointment){
    offer.status = "Unerfolgreich";
    this.toastr.success("Error", "Es gab ein Problem bei der Durchführung");
    appointment.status = "Versäumt";
    this.bs.updateAppointment(appointment).subscribe();
    this.bs.update(offer).subscribe();
  }

  getDates(date:Date){
    return new Date(date);
  }

}
