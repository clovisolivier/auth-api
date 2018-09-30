import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


import { AuthService } from '../auth.service';
import { SessionService } from '../session.service';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  @Input() errors: Error;
  private _success = new Subject<string>();
  successMessage: string;
  private _fail = new Subject<string>();
  failMessage: string;

  password = new FormControl('', [
    Validators.required,
  ]);

  confirmPassword = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
  ) { }

  ngOnInit() {
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(3000)
    ).subscribe(() => {
      this.successMessage = null
      // this.router.navigate(['qrcode'])
    }
    );

    this._fail.subscribe((message) => this.failMessage = message);
    this._fail.pipe(
      debounceTime(5000)
    ).subscribe(() => this.failMessage = null);
  }

  reset( password: string, confirmpassword: string): void {
    console.log(password, confirmpassword);
    this.authService.resetPassword(password, confirmpassword, this.getToken())
      .subscribe(
        user => {
          //  this.sessionService.setSession(token);
          this._success.next(`User registered !`);
        },
        error => {
          this.errors = error;
          this._fail.next(`Registration failed !`);
        }
      );
  }

  getToken(): string{
    //TODO
    return '';
  }

}
