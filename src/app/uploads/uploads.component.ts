import { Component, OnInit } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent  {

  constructor() { }

  

	fileEvent(fileInput:any){
		let AWSService = (<any>window).AWS;
		console.log(AWSService);
		let file = fileInput.target.files[0];
		//let albumPhotosKey = encodeURIComponent('bubblbookimages')+'/';
		//let photoKey = albumPhotosKey + file.name;

		let key = file.name;

		let imageBank = 'https://s3-eu-west-1.amazonaws.com/bubblbookimages/' ;
		let imageId = key;
		let image = imageBank + key;
		let AWS = new AWSService.S3({
			region: 'eu-west-1',
			accessKeyId:'AKIAIB5CR7EEG47LIZ7A',
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
			console.log(image);
			}
			 return image;
		});
	}

}