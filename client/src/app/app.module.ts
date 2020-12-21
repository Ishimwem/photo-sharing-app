import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryComponent } from './gallery/gallery.component';
import { PhotoDetailComponent } from './photo-detail/photo-detail.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';  
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    GalleryComponent,
    PhotoDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,  
    MatIconModule,  
    MatButtonModule,  
    RouterModule.forRoot([
      { path: '', component: GalleryComponent },
      { path: 'photos/:photoId', component: PhotoDetailComponent }
    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
