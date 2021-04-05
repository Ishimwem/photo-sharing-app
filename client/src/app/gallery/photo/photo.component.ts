import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryService } from '../gallery.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  photoId: string;

  constructor(private route: ActivatedRoute, private galleryService: GalleryService,) { }

  ngOnInit(): void {
    const photoIdFromRoute = this.route.snapshot.paramMap.get('photoId');
    this.photoId = photoIdFromRoute; //this is where you get call getPhoto from backend
  }

}
