import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from "jwt-decode";
import { Observable } from 'rxjs';


interface Token {
  exp: number;
  user: {
    id: string;
    role: string;
    name: string;
    email: string;
    description: string;
    education: string;
  }
}

@Injectable()
export class AuthenticationService {

  private api = 'http://nachhilfe22.s1910456013.student.kwmhgb.at/api/auth';


  constructor(private http: HttpClient) {  }


  login(email: string, password: string) : Observable<any> {
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }

  public getCurrentUserId() {
    return Number.parseInt(<string>sessionStorage.getItem("userId"));
  }

  public getCurrentUserName():string {
    return <string>sessionStorage.getItem("userName");
  }

  public getCurrentUserEmail() {
    return <string>sessionStorage.getItem("userEmail");
  }

  public getCurrentUserDescription() {
    return <string>sessionStorage.getItem("userDescription");
  }

  public getCurrentUserEducation() {
    return <string>sessionStorage.getItem("userEducation");
  }

  public setSessionStorage(token: string) {
    console.log("storing token");
    const decodedToken = jwtDecode(token) as Token;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", decodedToken.user.id);
    sessionStorage.setItem("userName", decodedToken.user.name);
    sessionStorage.setItem("userRole", decodedToken.user.role);
    sessionStorage.setItem("userEducation", decodedToken.user.education);
    sessionStorage.setItem("userDescription", decodedToken.user.description);
    sessionStorage.setItem("userEmail", decodedToken.user.email);

  }

  logout() {
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("userDescription");
    sessionStorage.removeItem("userEducation");
    console.log("Logged out");
  }

  public isLoggedIn() {
    if (sessionStorage.getItem("token")) {
      let token : string = <string> sessionStorage.getItem("token");
      //console.log(jwtDecode(token));
      const decodedToken = jwtDecode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if (expirationDate < new Date()) {
        console.log("token expired");
        sessionStorage.removeItem("token");
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  public isTutor(){
    if (sessionStorage.getItem("userRole")=="tutor") {
      return true;
    } else {
      return false;
    }
  }

  public isStudent(){
    if (sessionStorage.getItem("userRole")=="student") {
      return true;
    } else {
      return false;
    }
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

}
