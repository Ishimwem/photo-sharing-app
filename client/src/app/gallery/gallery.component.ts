import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo';
import { GalleryService } from './gallery.service';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EMPTY} from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

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
    private messageService: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.getPhotos();
  }

  getPhotos() {
    this.galleryService.getPhotos().pipe(
      tap((photos: Photo[]) => {
        this.photos = photos;
      }),
      catchError((response: any) => {
        this.messageService.error('an error occured when retrieving photos');
        return EMPTY;
      })
    ).subscribe();
  }

  deletePhoto(photoId: string) {
    this.galleryService.deletePhoto(photoId).pipe(
      tap(() => {
        this.messageService.success('photo deleted successfully');
        this.getPhotos();
      }),
      catchError((response: any) => {
        this.messageService.error('an error occured when deleting the photo');
        return EMPTY;
      })
    ).subscribe();

  }

  uploadPhoto(photo: any): any {
    const formData = new FormData();
    formData.append('photo', photo.file);

    this.galleryService.uploadPhoto(formData).pipe(
      tap((response: any) => {
        //this.getPhotos();
        photo.onSuccess(response.file);
      }),
      catchError((response: any) => {
        this.messageService.error('an error occured when uploading the photo');
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
