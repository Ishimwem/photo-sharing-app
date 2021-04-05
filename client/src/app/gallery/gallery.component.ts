import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo';
import { GalleryService } from './gallery.service';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EMPTY, Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  photos: Photo[];
  inProgress: boolean = false;


  constructor(
    private galleryService: GalleryService,
    private messageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.getPhotos();
  }

  getPhotos() {
    console.log("getting in getPhotos in components");
    this.galleryService.getPhotos().pipe(
      tap((photos: Photo[]) => {
        this.photos = photos;
        console.log(this.photos);
      }),
      catchError((response: any) => {
        console.log('got an error'); // TODO: put better error handling
        return EMPTY;
      })
    ).subscribe();
  }

  deletePhoto(photoId: string) {
    console.log('got into handleDelete');
    this.galleryService.deletePhoto(photoId).pipe(
      tap(() => {
        this.messageService.success('photo deleted successfully');
        this.getPhotos();
      }),
      catchError((response: any) => {
        this.messageService.error('an error occured when deleting the photo');
        console.log('got an error'); // TODO: put better error handling: use error message??
        return EMPTY;
      })
    ).subscribe();

  }

  handlePreview() {
    console.log('got into handlePreview');

  }

  uploadPhoto(photo: any): any {
    console.log('got into handleUpload');
    // console.log({photo});
    console.log(photo.file);
    const formData = new FormData();
    formData.append('photo', photo.file);

    this.galleryService.uploadPhoto(formData).pipe(
      tap((response: any) => {
        console.log(response);
        //this.getPhotos();
        photo.onSuccess(response.file);
      }),
      catchError((response: any) => {
        console.log('got an error'); // TODO: put better error handling
        return EMPTY;
      })
    ).subscribe();

  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status === 'uploading') {
      this.inProgress = true
    }
    if (info.file.status === 'done') {
      this.inProgress = false;
      this.messageService.success(`${info.file.name} file uploaded successfully`);
      this.getPhotos();
    } else if (info.file.status === 'error') {
      this.inProgress = false;
      this.messageService.error(`${info.file.name} file upload failed.`);
    }
  }


}
