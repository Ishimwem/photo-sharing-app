import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo';
//import { PHOTOS } from '../mock-image';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  photos: any;

  constructor(
    private photoService: PhotoService
  ) {  }

  ngOnInit(): void {
    this.getPhotos();    

  }

  getPhotos(): void {
    console.log("getting in getPhotos in components");
    this.photoService.getPhotos()
    .subscribe(photos => this.photos = photos);
  }


}
