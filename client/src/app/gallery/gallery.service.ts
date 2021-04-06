import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs'
import { Photo } from '../photo';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private photoApi = 'api/photos';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getPhotos() {
    return this.http.get<Photo[]>(this.photoApi);
  }

  deletePhoto(photoId: string) {
    return this.http.delete(`${this.photoApi}/${photoId}`);
  }

  uploadPhoto(photo: FormData) {
    return this.http.post(`${this.photoApi}`, photo);
  }
}
