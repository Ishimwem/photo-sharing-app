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
    const photos = [{
      uid: '1',
      name: 'image.png',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80',
    },
    {
      uid: '2',
      name: 'image.png',
      status: 'done',
      url:'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1140&q=80',
    },
    {
      uid: '3',
      name: 'image.png',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1588392382834-a891154bca4d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80'
    }, 
    {
      uid: '4',
      name: 'image.png',
      status: 'done', 
      url:'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=658&q=80'
    },
    {
      uid: '5',
      name: 'image.png',
      status: 'done', 
      url:'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8bmF0dXJlfGVufDB8fDB8&auto=format&fit=crop&w=600&q=60'
    }, 
    {
      uid: '6', 
      name: 'image.png',
      status: 'done',
      url:'https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJlfGVufDB8fDB8&auto=format&fit=crop&w=600&q=60'
    }, 
    {
      uid: '7',
      name: 'image.png',
      status: 'done', 
      url: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8bmF0dXJlfGVufDB8fDB8&auto=format&fit=crop&w=600&q=60'
    }, 
    {
      uid: '8',
      name: 'image.png',
      status: 'done', 
      url:'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fG5hdHVyZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
    }, 
    {
      uid: '9',
      name: 'image.png',
      status: 'done', 
      url:'https://images.unsplash.com/photo-1500534623283-312aade485b7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTV8fG5hdHVyZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
    }, 
    {
      uid: '10', 
      name: 'image.png',
      status: 'done',
      url:'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTh8fG5hdHVyZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
    }];

    // return photos;
  }

  deletePhoto(photoId: string) {
    return this.http.delete(`${this.photoApi}/${photoId}`);
  }

  uploadPhoto(photo: FormData) {
    console.log("getting into upload photo")
    return this.http.post(`${this.photoApi}`, photo);
  }
}
