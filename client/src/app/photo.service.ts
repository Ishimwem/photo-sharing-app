import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import { Photo } from './photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private photosUrl = 'api/photos';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  getPhotos(): Observable<Photo[]> {
    console.log("getting in getPhotos in services");
    return this.http.get<Photo[]>(this.photosUrl)
    .pipe(
      tap(_ => console.log('Fetched photos')),
      catchError(this.handleError<Photo[]>('getPhotos', []))
    );
  }



  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
