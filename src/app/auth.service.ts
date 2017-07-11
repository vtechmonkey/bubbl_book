import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';


declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  // Configure Auth0
 lock = new Auth0Lock('pwDyOusCeQTYNKMtHMgjVy8y89TQtASm', 'vtechmonkey.eu.auth0.com', {
 //https://auth0.com/docs/libraries/lock/v10/ui-customization
//   theme: {
//      },
//    languageDictionary: {
//     title: "Bubblbook"   
//   }
 });

  //Store profile object in auth class 
 userProfile: Object;


  constructor() {
    //set userProfile attribute of already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));

    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
       

       //fetch profile information
      // this.lock._getUserInfo(authResult.idToken, (error, profile)=>{
      //   if(error){
      //     //handle error
      //     alert(error);
      //     return;
      //   }

      //fetch profile information  //getProfile to be depreciated
      this.lock.getProfile(authResult.idToken, (error, profile)=>{
        if(error){
          //handle error
          alert(error);
          return;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;       
      });
    });
  console.log(this.userProfile);
 
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token and profile from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
  }
}