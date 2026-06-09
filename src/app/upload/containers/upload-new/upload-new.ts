import {Component} from '@angular/core';
import {UploadManager} from "../upload-manager/upload-manager";

@Component({
  selector: 'app-upload-new',
  imports: [
    UploadManager
  ],
  templateUrl: './upload-new.html',
  styleUrl: './upload-new.css',
})
export class UploadNew {
}
