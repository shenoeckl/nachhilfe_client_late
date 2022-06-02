import { Component } from '@angular/core';
import {Offer, User, Appointment} from "./shared/offer";
import {AuthenticationService} from "./shared/authentication.service";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styles: []
})

export class AppComponent {

  constructor(private authService: AuthenticationService) {
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  isTutor(){
    return this.authService.isTutor();
  }

  getLoginLabel(){
    if(this.isLoggedIn()){
      return "Logout";
    }else{
      return "Login";
    }
  }


}
