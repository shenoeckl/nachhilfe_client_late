import {Component, Input, OnInit} from '@angular/core';
import {Appointment, Offer, User} from "../shared/offer";
import {NachhilfeStoreService} from "../shared/nachhilfe-store.service";

@Component({
  selector: 'bs-appointment-list',
  templateUrl: './appointment-list.component.html',
  styles: [
  ]
})
export class AppointmentListComponent implements OnInit {

  appointments: Appointment[] = [];

  constructor(private bs: NachhilfeStoreService) { }

  ngOnInit(): void {
    this.bs.getAppointmentByStatus("Offen").subscribe(res => {
      this.appointments = res;
      this.bs.getAppointmentByStatus("Antwort").subscribe(res => {
        for(let offer of res){
          this.appointments.push(offer);
        }
      });
    });
  }

}
