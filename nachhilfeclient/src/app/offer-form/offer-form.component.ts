import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NachhilfeStoreService} from "../shared/nachhilfe-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OfferFactory} from "../shared/offer-factory";
import {OfferFormErrorMessages} from "./offer-form-error-messages";
import {Offer, User, Appointment} from "../shared/offer";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-offer-form',
  templateUrl: './offer-form.component.html',
  styles: [
  ]
})
export class OfferFormComponent implements OnInit {

  //Variablen aus dem Formular
  offerForm: FormGroup;
  offer = OfferFactory.empty();
  errors: {[key:string]:string} = {};
  isUpdatingAppointments = false;
  isUpdatingOffer = false;
  appointments: FormArray;

  constructor(private fb:FormBuilder,
              private bs:NachhilfeStoreService,
              private route: ActivatedRoute,
              private authService: AuthenticationService,
              private router: Router)
  {
    this.offerForm = this.fb.group({});
    this.appointments = this.fb.array([]);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    if(id){
      //Angebot updaten
      this.isUpdatingOffer = true;
      this.bs.getSingle(id).subscribe(offer=>{
        this.offer = offer;
        this.initOffer();
      });
    }
    this.initOffer();
  }

  initOffer(){
    this.buildAppointmentsArray();
    this.offerForm = this.fb.group({
      id: this.offer.id,
      //status: this.offer.status,
      title: [this.offer.title, [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      description: [this.offer.description, [Validators.minLength(10), Validators.maxLength(200)]],
      subject: this.offer.subject,
      appointments: this.appointments
    });
    this.offerForm.statusChanges.subscribe(()=>{
      this.updateErrorMessages();
    });
  }

  buildAppointmentsArray(){
    if(this.offer.appointments){
      this.appointments = this.fb.array([]);
      for (let ap of this.offer.appointments){
        let fg = this.fb.group({
          id: new FormControl(ap.id),
          //status: new FormControl(ap.status),
          label: new FormControl(ap.label,[Validators.required]),
          starttime: new FormControl(ap.starttime, [Validators.required]),
          endtime: new FormControl(ap.endtime, [Validators.required]),
          //user_id: new FormControl(ap.user_id)
        });
        this.appointments.push(fg);
      }
    }
  }

  /*addAppointmentControl(){
    this.appointments.push(this.fb.group({id:0, status:null, label:null, user_id:0,starttime: "", endtime: ""}))
  }*/
  addAppointmentControl(){
    this.appointments.push(this.fb.group({id:0, label:null, starttime: "", endtime: ""}))
  }

  updateErrorMessages(){
    this.errors = {};
    for (const message of OfferFormErrorMessages){
      const control = this.offerForm.get(message.forControl);
      if(control && control.dirty && control.invalid && control.errors
         && control.errors[message.forValidator] && !this.errors[message.forControl]){
        this.errors[message.forControl] = message.text;
      }
    }
  }

  submitForm(){
    this.offerForm.value.appointments = this.offerForm.value.appointments.filter(
      (appointment: { label: string; }) => appointment.label
    );

    const offer: Offer = OfferFactory.fromObject(this.offerForm.value);
    offer.user_id = this.authService.getCurrentUserId();
    offer.status = "Offen";
    for(let ap of offer.appointments){
      ap.user_id = this.authService.getCurrentUserId();
      ap.status = "Offen";
    }
    console.log(offer);
    if(this.isUpdatingOffer ){
      this.bs.update(offer).subscribe(res=>{
        this.router.navigate(["../../offers/",offer.id], {relativeTo: this.route});
      });
    }else{

      offer.user_id = this.authService.getCurrentUserId();
      offer.status = "Offen";
      for(let ap of offer.appointments){
        ap.user_id = this.authService.getCurrentUserId();
        ap.status = "Offen";
      }
      console.log("hallo");
      console.log(offer);
      this.bs.create(offer).subscribe(res=>{
        console.log(offer);
        this.offer = OfferFactory.empty();
        this.offerForm.reset(offer);
        this.router.navigate(["../offers"], {relativeTo: this.route});
      });
    }
  }

  getUserId():number{
    return this.authService.getCurrentUserId();
  }

}
