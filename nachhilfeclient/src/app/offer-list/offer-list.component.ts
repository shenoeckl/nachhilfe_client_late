import {Component, OnInit} from '@angular/core';
import {Offer, Appointment, User} from "../shared/offer";
import {NachhilfeStoreService} from "../shared/nachhilfe-store.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'bs-offer-list',
  templateUrl: './offer-list.component.html',
  styles: [
  ]
})
export class OfferListComponent implements OnInit {

  offers: Offer[] = [];

  constructor(private bs:NachhilfeStoreService,
              private router: Router,
              private route:ActivatedRoute) { }


  ngOnInit(): void {
    this.bs.getOfferByStatus("Offen").subscribe(res => {
      this.offers = res;
    });
  }

  offerSelected(offer:Offer){
    this.router.navigate(['../offers', offer.id], {relativeTo: this.route});
  }

}
