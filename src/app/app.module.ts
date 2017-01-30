import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule,JsonpModule  } from '@angular/http';

import { AUTH_PROVIDERS } from 'angular2-jwt';

 import { LoginComponent } from './login/login.component';

import { AppComponent } from './app.component';
import { ActivitiesComponent } from './activities/activities.component';
import {ActivitiesService} from './activities.service';
import { HomeComponent } from './home/home.component';
import { CreateBubblbookingComponent } from './create-bubblbooking/create-bubblbooking.component';
import {AuthService } from './auth.service';

import { routing, appRoutingProviders } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    ActivitiesComponent,
    HomeComponent,
    CreateBubblbookingComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    routing
  ],
  providers: [ActivitiesService,appRoutingProviders,AuthService,AUTH_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
