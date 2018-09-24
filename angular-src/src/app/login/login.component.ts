import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { SessionService } from '../session.service';
import { FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() errors: Error;
  private _success = new Subject<string>();
  successMessage: string;
  private _fail = new Subject<string>();
  failMessage: string;

  token: string;

  email = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  password = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(3000)
    ).subscribe(() => {
      this.successMessage = null,
        this.router.navigate(['qrcode'])
    }
    );

    this._fail.subscribe((message) => this.failMessage = message);
    this._fail.pipe(
      debounceTime(5000)
    ).subscribe(() => this.failMessage = null);
  }

  login(email: string, password: string): void {
    this.authService.login(email, password)
      .subscribe(
        token => {
          this.sessionService.setSession(token);
          this._success.next(`Connection success`);
        },
        error => {
          this.errors = error;
          this._fail.next(`Connection failed`);
        }
      );
  }

}
