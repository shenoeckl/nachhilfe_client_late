import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import {User} from "../shared/user";
import {NachhilfeStoreService} from "../shared/nachhilfe-store.service";
import {Appointment, Offer} from "../shared/offer";
import {Observable} from "rxjs";


interface Response {
  access_token: string;
}

@Component({
  selector: 'bs-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})


export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  //Angebote unterschiedlich gefiltert
  offers: Offer[] = [];
  currentOffers: Offer[] = [];
  pendingOffers: Offer[] = [];
  comingOffers: Offer[] = [];
  pastOffers: Offer[] = [];
  saveOffers: Offer[] = [];

  //Termine der Studenten
  appointments: Appointment[] = [];
  saveAppointments: Offer[] = [];
  comingApOffers: Offer[] = [];
  pendingApOffers: Offer[] = [];
  deniedApOffers: Offer[] = [];
  DonePastApOffers: Offer[] = [];
  pastApOffers: Offer[] = [];


  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private bs: NachhilfeStoreService,
    private router: Router,
    private route:ActivatedRoute

  ) {

    this.loginForm = this.fb.group({});

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });

    //Aktuelle Angebote
    this.getStatusOffers("Offen");
    this.getStatusOffers("Antwort");
    this.getStatusOffers("Angenommen");
    this.getStatusOffers("Abgelehnt");
    this.getStatusOffers("Erfolgreich");
    this.getStatusOffers("Unerfolgreich");
    //Studenten ANgebote
    this.getStudentOffers("Antwort", this.authService.getCurrentUserId());
    this.getStudentOffers("Angenommen", this.authService.getCurrentUserId());
    this.getStudentOffers("Abgelehnt", this.authService.getCurrentUserId());
    this.getStudentOffers("Erfolgreich durchgefuhrt", this.authService.getCurrentUserId());
    this.getStudentOffers("Nicht durchgefuhrt", this.authService.getCurrentUserId());

  }

  login() {
    const val = this.loginForm.value;
    if (val.username && val.password) {
      this.authService.login(val.username, val.password).subscribe((
        res: any) => {
        console.log(res);
        this.authService.setSessionStorage((res as Response).access_token);
        this.router.navigateByUrl("/");
      });
    }
  }


  logout() {
    this.authService.logout();
  }

  isLoggedIn () {
    return this.authService.isLoggedIn();
  }

  isTutor () {
    return this.authService.isTutor();
  }

  getUserId():number{
    return this.authService.getCurrentUserId();
  }

  getUserName():string{
    return this.authService.getCurrentUserName();
  }

  getUserEmail():string{
    return this.authService.getCurrentUserEmail();
  }

  getUserDescription():string{
    return this.authService.getCurrentUserDescription();
  }

  getUserEducation():string{
    return this.authService.getCurrentUserEducation();
  }

  getStudentOffers(status:string, id:number){
    this.bs.getOfferByStatus(status).subscribe(res=>{
      this.saveAppointments = res;
      for (let offer of this.saveAppointments){
        if(status == "Antwort"){
          for (let ap of offer.appointments){
            if(ap.status == "Angefragt" && ap.user_id == id)
              this.pendingApOffers.push(offer);
          }
        }
        if(status == "Angenommen"){
          for (let ap of offer.appointments){
            if(ap.status == "Vergeben" && ap.user_id == id)
              this.comingApOffers.push(offer);
          }
        }
        if(status == "Abgelehnt"){
          for (let ap of offer.appointments){
            if(ap.status == "Abgelehnt" && ap.user_id == id)
              this.deniedApOffers.push(offer);
          }
        }
        if(status == "Erfolgreich durchgeführt"){
          for (let ap of offer.appointments){
            if(ap.status == "Durchgefuhrt" && ap.user_id == id)
              this.DonePastApOffers.push(offer);
          }
        }
        if(status == "Nicht durchgefuhrt"){
          for (let ap of offer.appointments){
            if(ap.status == "Versaumt" && ap.user_id == id)
              this.pastApOffers.push(offer);
          }
        }

      }
      this.saveAppointments = [];
    });
  }

  getStatusOffers(status:string){
    this.bs.getOfferByStatus(status).subscribe(res=>{
      this.saveOffers = res;
      for (let offer of this.saveOffers){
        if(this.authService.getCurrentUserId() == offer.user_id){
          if(offer.status == "Offen") {
            this.currentOffers.push(offer);
          }
          if(offer.status == "Antwort") {
            this.pendingOffers.push(offer);
          }
          if(offer.status == "Vergeben") {
            this.comingOffers.push(offer);
          }
          if(offer.status == "Erfolgreich"){
            this.pastOffers.push(offer);
          }
          if(offer.status == "Unerfolgreich"){
            this.pastOffers.push(offer);
          }
        }
      }
    });
  }



}
