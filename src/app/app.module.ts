import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions,JsonpModule  } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
 import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';

import { LoginComponent } from './login/login.component';

import { AppComponent } from './app.component';
import { ActivitiesComponent } from './activities/activities.component';

import { HomeComponent } from './home/home.component';
import { CreateBubblbookingComponent } from './create-bubblbooking/create-bubblbooking.component';

import {ActivitiesService} from './activities.service';
import {AuthService } from './auth.service';
import { PicsService } from './pics.service';

import { routing, appRoutingProviders } from './app.routing';
import 'hammerjs';
import { HiwComponent } from './hiw/hiw.component';

import { SearchComponent } from './search/search.component';

import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { ActivityCreateComponent } from './activity-create/activity-create.component';

export function authHttpServiceFactory(http:Http, options: RequestOptions) {
  return new AuthHttp (new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    ActivitiesComponent,
    HomeComponent,
    CreateBubblbookingComponent,
    LoginComponent,
    HiwComponent,
    SearchComponent,
    ActivityDetailsComponent,
    ActivityCreateComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    routing,
    MaterialModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [ActivitiesService,appRoutingProviders,AuthService, PicsService, {
  provide:AuthHttp,
  useFactory:authHttpServiceFactory,
  deps:[Http, RequestOptions]
}],

  entryComponents: [
  HiwComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
