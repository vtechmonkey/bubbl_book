
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class PicsService {

  constructor() { }

  message: string = 'hi Sarah';
 
 // @Output() imageURL = new EventEmitter();

  fileEvent(fileInput:any){
    let AWSService = (<any>window).AWS;
    console.log(AWSService);
    let file = fileInput.target.files[0];
    //let albumPhotosKey = encodeURIComponent('bubblbookimages')+'/';
    //let photoKey = albumPhotosKey + file.name;

    let key = file.name;

    let imageBank = 'https://s3-eu-west-1.amazonaws.com/bubblbookimages/' ;
    let imageId = key;
    let imageURL = imageBank + key;
    let AWS = new AWSService.S3({
      region: 'eu-west-1',
      accessKeyId:'AKIAI7CTFEX77DK6EDEA',
      secretAccessKey:'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'
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
      console.log('data');
      console.log(imageURL);
      }
      this.imageURL.emit(this.key);
      
    });

  }
}