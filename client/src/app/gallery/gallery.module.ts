import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { GalleryService } from './gallery.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GalleryComponent } from './gallery.component';

@NgModule({
  declarations: [GalleryComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    NzImageModule,
    NzToolTipModule,
    NzUploadModule,
  ],
  providers: [GalleryService, NzMessageService]
})
export class GalleryModule { }
