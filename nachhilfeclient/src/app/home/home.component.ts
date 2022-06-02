import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Offer} from "../shared/offer";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private route:ActivatedRoute,
              private authservice: AuthenticationService) { }

  ngOnInit(): void {
  }

  offerSelected(offer:Offer){
    this.router.navigate(['../offers', offer.id], {relativeTo: this.route});
  }

  isLoggedIn(){
    return this.authservice.isLoggedIn();
  }

  getUserName(){
    return this.authservice.getCurrentUserName();
  }

}
