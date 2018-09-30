import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';

import { Token, User, UserRegistered } from './models';
import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  private authUrlLogin = environment.endpoint + '/api/auth/sign_in';
  private authUrlRegister = environment.endpoint + '/api/auth/register';
  private authUrlForgotPassword = environment.endpoint + '/api/auth/forgot_password';
  private authUrlResetPassword = environment.endpoint + '/api/auth/reset_password';
  
  private user: User;
  private userRegister: UserRegistered;
  constructor(
    private http: HttpClient,
  ) { }

  login(email: string, password: string): Observable<Token> {
    const url = `${this.authUrlLogin}`;
    this.user= {email:email, password :password};
    return this.http.post<Token>(url, this.user, httpOptions ).pipe(
      tap(_ => this.log(`fetched token`)),
      //catchError(this.handleError<Token>(`Log in as email=${email}`))
    );
    
  };

  forgotPassword(email: string): Observable<string> {
    const url = `${this.authUrlForgotPassword}`;
    return this.http.post<string>(url, {email:email}, httpOptions ).pipe(
      tap(_ => this.log(`Mail sent`)),
      //catchError(this.handleError<Token>(`Log in as email=${email}`))
    );
    
  };
  
  register(fullName: string, email: string, password: string): Observable<User> {
    const url = `${this.authUrlRegister}`;
    this.userRegister = {fullName: fullName, email:email, password :password};
    return this.http.post<UserRegistered>(url, this.userRegister, httpOptions ).pipe(
      tap((user: UserRegistered) => this.log(`User Registered`)),
      //catchError(this.handleError<UserRegistered>(`Register email=${email}`))
    );
    
  };

  resetPassword(password: string, confirmpassword: string, token: string): Observable<string> {
    const url = `${this.authUrlResetPassword}`;
    return this.http.post<string>(url, {newPassword: password, verifyPassword : confirmpassword, token : token }, httpOptions ).pipe(
      tap(_ => this.log(`Reset password`)),
      //catchError(this.handleError<Token>(`Log in as email=${email}`))
    );
  }
/*
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  };
*/
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
