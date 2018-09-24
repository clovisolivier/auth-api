import { Component } from '@angular/core';

import { SessionService } from './session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private sessionService: SessionService,
    private router: Router,
  ) {
    //If user is logged, auto redirection to qrcode
    if(sessionService.isLoggedIn()){
      this.router.navigate(['qrcode']);
    }
  }

  title = 'QR Code';
  
  logout(){
    console.log('Logout');
    this.sessionService.logout();
    this.router.navigate(['login']);
  }
  

}
