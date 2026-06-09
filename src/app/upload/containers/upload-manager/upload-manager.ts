import {Component, inject} from '@angular/core';
import {DropzoneDirective} from "../../directives/dropzone.directive";
import {UploadTask} from "../upload-task/upload-task";
import {UploadService} from "../../services/upload.service";

@Component({
  selector: 'app-upload-manager',
  imports: [
    DropzoneDirective,
    UploadTask
  ],
  templateUrl: './upload-manager.html',
  styleUrl: './upload-manager.css',
})
export class UploadManager {
  // private uploadService = inject(UploadService);

  isHovering: boolean = false;
  files: File[] = [];
  protected maxFiles = 5;
  protected maxSizeMB = 10;
  protected errors: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      console.log('uploadManager adding file: ', files.item(i));
      const f = files.item(i);
      if (f) {
        this.files.push(f);
      }
    }
  }

  // protected async clearAllProgressTracking() {
  //   const promises = this.files.map(f => {
  //     return this.uploadService.delete(f).then(() => this.files.splice(this.files.indexOf(f), 1));
  //   });
  //   await Promise.all(promises);
  // }
}
