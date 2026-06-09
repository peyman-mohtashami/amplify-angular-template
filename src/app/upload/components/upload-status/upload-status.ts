import { Component, input } from '@angular/core';
import {AppUploadDataItem, Upload, UploadStatus} from '../../models/upload.model';

@Component({
  selector: 'app-upload-status',
  templateUrl: './upload-status.html',
})
export class UploadStatusComponent {
  data = input.required<Upload>();

  protected readonly UploadStatus = UploadStatus;
}
