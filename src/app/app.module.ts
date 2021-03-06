import { BrowserModule,HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions,JsonpModule  } from '@angular/http';
import { MaterialModule, MdInputModule,MdNativeDateModule,MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';


import { LoginComponent } from './login/login.component';

import { AppComponent } from './app.component';
import { ActivitiesComponent } from './activities/activities.component';

import { HomeComponent } from './home/home.component';
import { CreateBubblbookingComponent } from './create-bubblbooking/create-bubblbooking.component';

import { ActivitiesService } from './activities.service';
import { CategoryService } from './category/category.service';
import { SubCategoryService } from './subCategory/subCategory.service';
import { AuthService } from './auth.service';
import { PicsService } from './pics.service';
import { SearchService } from './search.service';
import { VoteService } from './vote.service';

import { routing, appRoutingProviders } from './app.routing';
import 'hammerjs';
import { HiwComponent } from './hiw/hiw.component';
import { MoreDetailsComponent } from './more-details/more-details.component';
import { SearchComponent } from './search/search.component';

import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { ActivityCreateComponent } from './activity-create/activity-create.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CapitalizePipe } from './capitalize.pipe';
import { VoteComponent } from './vote/vote.component';
import { TimesComponent } from './times/times.component';
import * as $ from 'jquery';
import { MaterializeModule } from 'angular2-materialize';
import { MyCurrencyPipe } from './my-currency.pipe';
import { MyCurrencyFormatterDirective } from './my-currency-formatter.directive';

export function authHttpServiceFactory(http:Http, options: RequestOptions) {
  return new AuthHttp (new AuthConfig({}), http, options);
}

export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      'swipe': {velocity: 0.4, threshold: 20} // override default settings
  }
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
    ActivityCreateComponent,
    MoreDetailsComponent,
    NavbarComponent,
    CapitalizePipe,
    VoteComponent,
    TimesComponent,
    MyCurrencyPipe,
    MyCurrencyFormatterDirective
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    routing,
    MaterialModule,
    MdNativeDateModule,
    MdInputModule,
    BrowserAnimationsModule,
    MaterializeModule,
    
  

  ],
  providers: [
  ActivitiesService,CategoryService,SubCategoryService,appRoutingProviders, SearchService,MyCurrencyPipe,
    MyCurrencyFormatterDirective, AuthService,PicsService, VoteService,
    {
    provide:AuthHttp,
    useFactory:authHttpServiceFactory,
    deps:[Http, RequestOptions],
    },
    { 
    provide: HAMMER_GESTURE_CONFIG, 
    useClass: MyHammerConfig 
    }
  ],

  entryComponents: [
  HiwComponent,
  MoreDetailsComponent
  ],
  bootstrap: [AppComponent]
})



export class AppModule { }

