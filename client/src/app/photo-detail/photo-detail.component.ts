import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '../photo';
//import { PHOTOS } from '../mock-image';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {

  photoId:any;


  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    const photoIdFromRoute = this.route.snapshot.paramMap.get('photoId');
    //this.photoService.getPhotos()
    //can replace with whatever we get from the backend
    //like pass the id to backend to get photo
    /*this.photo = PHOTOS.find(photo => {
      return photo._id === photoIdFromRoute;
    });*/
    this.photoId = photoIdFromRoute; //this is where you get call getPhoto from backend

  }

}
