
import { Injectable, Output } from '@angular/core';

import { Activity } from './activity';
import { ActivitiesService } from './activities.service';

@Injectable()
export class PicsService {

messages = [
 `you've got mail!`,
 `I've got mail`,
 `hell we all got mail`
 ];
activity: any;
imageURL: any = "https://s3-eu-west-1.amazonaws.com/bubblbookimages/placeholder.png";
fileReader: object;
value = '';
element: any;

  constructor(
     activitiesService : ActivitiesService

    ) {
    console.log (this.imageURL)
   }

  fileEvent(fileInput?:any):any{
    let AWSService = (<any>window).AWS;
    console.log(AWSService); //make sure service is loaded, script added to index.html
    let file = fileInput.target.files[0];
    AWSService.config.accessKeyId = 'AKIAJPKU3ZIFFWGIA7HQ'; //S3 user
    AWSService.config.secretAccessKey = 'WsTVjAprY4dZ7EIdDbR1pKT/S4fxYD3e3YWf+dld'; // s3 user   
    let key = file.name; //e.g. dog.jpg
    let imageBank = 'https://s3-eu-west-1.amazonaws.com/bubblbookimages/' ;
    let imageId = key;
    this.imageURL = imageBank + key;
    let AWS = new AWSService.S3({
      region: 'eu-west-1'   
    });
    let params = {
    Key: key,
    Body: file,
    ContentType: file.type,
    Bucket: 'bubblbookimages',
    ServerSideEncryption: 'AES256'
    };
    console.log(params);    
    AWS.putObject(params, function(err, data){    
      if (err){
      console.log(err.message);
      }
      else {
      console.log('ok!')
      } 

   });

  }
}