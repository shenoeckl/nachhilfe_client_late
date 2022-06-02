import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Appointment, Offer, User} from "./offer";

@Injectable({
  providedIn: 'root'
})

export class NachhilfeStoreService {

  private api = 'http://nachhilfe22.s1910456013.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {

  }

  getAll():Observable<Array<Offer>>{
    return this.http.get<Array<Offer>>(`${this.api}/offers`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingle(id:number):Observable<Offer>{
    return this.http.get<Offer>(`${this.api}/offers/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(offer:Offer):Observable<any>{
    return this.http.post(`${this.api}/offers`, offer)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update(offer:Offer):Observable<any>{
    return this.http.put(`${this.api}/offers/${offer.id}`, offer)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id:number):Observable<any>{
    return this.http.delete(`${this.api}/offers/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  removeAppointment(id:number):Observable<any>{
    return this.http.delete(`${this.api}/appointments/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error:Error | any): Observable<any>{
    return throwError(error);
  }

  getAllSearch(searchTerm: string):Observable<Array<Offer>>{
    return this.http.get<Array<Offer>>(`${this.api}/offers/search/${searchTerm}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getUser(id:number):Observable<User>{
    return this.http.get<User>(`${this.api}/users/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //Alles zu Offer
  getOfferByStatus(status:string):Observable<Array<Offer>>{
    return this.http.get<Array<Offer>>(`${this.api}/offers/status/${status}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getOffersByUser(userId:number){
    return this.http.get<Array<Offer>>(`${this.api}/offers/user/${userId}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //Alle Appointment Funktionen
  getAppointmentByStatus(status:string):Observable<Array<Appointment>>{
    return this.http.get<Array<Appointment>>(`${this.api}/appointments/status/${status}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAppointmentsOfStudent(userId:number){
    return this.http.get<Array<Appointment>>(`${this.api}/appointments/user/${userId}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateAppointment(appointment:Appointment):Observable<any>{
    return this.http.put(`${this.api}/appointments/${appointment.id}`, appointment)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

}
