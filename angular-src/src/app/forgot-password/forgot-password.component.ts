import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { AuthService } from '../auth.service';

import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  @Input() errors: Error;
  private _success = new Subject<string>();
  successMessage: string;
  private _fail = new Subject<string>();
  failMessage: string;

  email = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {

    this._success.subscribe((message) => this.successMessage = message);
    /*this._success.pipe(
      debounceTime(3000)
    ).subscribe(() => {
      this.successMessage = null//,
        //this.router.navigate(['qrcode'])
    }
    );*/

    this._fail.subscribe((message) => this.failMessage = message);
    this._fail.pipe(
      debounceTime(5000)
    ).subscribe(() => this.failMessage = null);

  }

  forgotPassword(email: string): void {
    this.authService.forgotPassword(email)
      .subscribe(
        string => {
          //this.sessionService.setSession(token);
          this._success.next(`Mail sent, please check your mailbox`);
        },
        error => {
          this.errors = error;
          this._fail.next(`Unknown email`);
        }
      );
  }

}
