import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryComponent } from './gallery/gallery.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';  
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { PlusOutline, UploadOutline, DeleteOutline } from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PhotoComponent } from './gallery/photo/photo.component';
import { NzMessageModule } from 'ng-zorro-antd/message';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    GalleryComponent,
    PhotoComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,  
    MatIconModule,  
    MatButtonModule,
    MatGridListModule,
    NzLayoutModule,
    NzButtonModule,
    NzGridModule,
    NzToolTipModule,
    NzImageModule,
    NzUploadModule,
    NzMessageModule,
    NzIconModule.forChild([PlusOutline, UploadOutline, DeleteOutline]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
