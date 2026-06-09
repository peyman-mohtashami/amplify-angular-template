import {Component, inject, input} from '@angular/core';
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {UploadTask} from "../upload-task/upload-task";

@Component({
  selector: 'app-upload-dialog',
  imports: [
    UploadTask
  ],
  templateUrl: './upload-dialog.html',
  styleUrl: './upload-dialog.css',
  styles: `
    :host {
      display: block;
      position: fixed;
      right: 0;
      bottom: 0;
      background: #fff;
      border-radius: 8px 8px 0 0;
      padding: 16px;
      /*max-width: 500px;*/
      box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      /*animation: custom-dialog-enter 1s ease;*/
    }

    @keyframes custom-dialog-enter {
      from {
        transform: scale(0) rotate(360deg);
      }

      to {
        transform: none;
      }
    }`
})
export class UploadDialog {
  dialogRef = inject(DialogRef<UploadDialog>);
  files = (inject(DIALOG_DATA) as { files: any }).files;
}
