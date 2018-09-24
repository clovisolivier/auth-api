import { Injectable } from '@angular/core';

import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  public setSession(authResult) {
    localStorage.setItem('token', btoa(authResult.token));
  }

  logout() {
    localStorage.removeItem("token");
  }

  public isLoggedIn() {
    return (this.getSession()!=null);
  }

  getSession(){
    let token = localStorage.getItem('token');
    if (token!=null){
      return atob(token);
    }else{
      return null;
    }
      
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
