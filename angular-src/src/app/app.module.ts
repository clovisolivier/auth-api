import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, 
  MatCheckboxModule, 
  MatToolbarModule,
  MatInputModule,
  MatSidenavModule,
  MatMenuModule,
  MatIconModule
} from '@angular/material';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { QrCodeComponent } from './qr-code/qr-code.component';

import { HttpClientModule } from '@angular/common/http';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { MomentModule } from 'ngx-moment';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QrCodeComponent,
    RegisterComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatToolbarModule,
    MatInputModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxQRCodeModule,
    MomentModule,
    MatMenuModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
