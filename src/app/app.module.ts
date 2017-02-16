import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule,JsonpModule  } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';

import { AUTH_PROVIDERS } from 'angular2-jwt';

 import { LoginComponent } from './login/login.component';

import { AppComponent } from './app.component';
import { ActivitiesComponent } from './activities/activities.component';
import {ActivitiesService} from './activities.service';
import { HomeComponent } from './home/home.component';
import { CreateBubblbookingComponent } from './create-bubblbooking/create-bubblbooking.component';
import {AuthService } from './auth.service';

import { routing, appRoutingProviders } from './app.routing';
import 'hammerjs';
import { HiwComponent } from './hiw/hiw.component';
<<<<<<< HEAD
import { SearchComponent } from './search/search.component';
import { CategoryComponent } from './category/category.component';
=======
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
>>>>>>> 87a2a08a560cda03a3bf9682017c982ead129b36

@NgModule({
  declarations: [
    AppComponent,
    ActivitiesComponent,
    HomeComponent,
    CreateBubblbookingComponent,
    LoginComponent,
    HiwComponent,
<<<<<<< HEAD
    SearchComponent,
    CategoryComponent
=======
    ActivityDetailsComponent
>>>>>>> 87a2a08a560cda03a3bf9682017c982ead129b36
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    routing,
    MaterialModule.forRoot()
  ],
  providers: [ActivitiesService,appRoutingProviders,AuthService,AUTH_PROVIDERS],
  entryComponents: [
  HiwComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
