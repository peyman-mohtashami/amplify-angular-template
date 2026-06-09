import {Component, inject, Input, signal} from '@angular/core';
import {UploadService} from "../../services/upload.service";
import {uploadData} from "aws-amplify/storage";
import {UploadRecord} from "../../models/upload.model";

@Component({
  selector: 'app-upload-task',
  imports: [],
  templateUrl: './upload-task.html',
  styleUrl: './upload-task.css',
})
export class UploadTask {
  private uploadService = inject(UploadService);

  @Input() file!: File;

  uploadState = signal({status: 'progress', transferredBytes: 0, totalBytes: 1 })

  constructor() {  }

  async ngOnInit() {
    await this.startUpload();
  }

  async startUpload() {
    console.log('uploading file', this.file);

    const item = (await this.uploadService.add(this.file)).data;
    if (!item) return;

    await uploadData({
      path: `uploads/${this.file.name}`,
      data: this.file,
      options: {
        // bucket: 'amplifyTestBucket',
        // Alternatively, provide bucket name from console and associated region
        // bucket: {
        //   bucketName: 'genie-dev-upload-us-east-1',
        //   region: 'us-east-1'
        // },
        metadata: {
          customKey: 'customValue',
        },
        onProgress: ({transferredBytes, totalBytes}) => {
          console.log('Class: UploadTask, Function: onProgress, Line 81 transferredBytes, totalBytes' , transferredBytes, totalBytes);
          this.uploadState.set({status: 'progress', transferredBytes, totalBytes: totalBytes ?? 1 });
          // this.transferredBytes = transferredBytes;
          // this.totalBytes = totalBytes ?? 1;
          // if (totalBytes) {
          //   console.log(
          //     `Upload progress ${Math.round(
          //       (transferredBytes / totalBytes) * 100
          //     )} %`
          //   );
          // }
        },
      }
    }).result;

    const updatedItem = {...item, status: 'validating'}
    await this.uploadService.update(updatedItem);
    // await this.uploadFile(file);


    // update db
    // await this.uploadService.add(this.file);
    // await this.uploadService.add({
    //   name: file.name, //`File-${Date.now()}`,
    //   status: 'uploading',//'pending',//UploadStatus.Pending,
    //   // uploadProgress: 0,
    //   // validationProgress: 0,
    //   // validatedAt: undefined,
    //   // checked: false,
    //   // id: 0,
    //   // releaseVersion: undefined,
    //   sha: file.size,
    //   type: file.type,//"txt",
    //   // uploadedAt: "",
    //   uploadedBy: this.authService.user()?.username,
    //   // viewed: undefined,
    //
    // });
    // // uploadFile
    // await this.uploadService.uploadFile(file);
    // // show progress


    let safeName = this.file.name.replace(/([^a-z0-9.]+)/gi, '');   // file name stripped of spaces and special chars
    let timestamp = Date.now();                                     // ex: '1598066351161'
    const uniqueSafeName = timestamp + '_' + safeName;
    // const path = 'uploads/' + uniqueSafeName;                       // Firebase storage path
    // const ref = this.storage.ref(path);                             // reference to storage bucket
    //
    // this.task = this.storage.upload(path, this.file);
    // this.percentage = this.task.percentageChanges();                // progress monitoring
    // this.snapshot = this.task.snapshotChanges().pipe(               // emits a snapshot of the transfer progress every few hundred milliseconds
    //   tap(console.log),
    //   finalize(async () => {                                      // after the observable completes, get the file's download URL
    //     this.downloadURL = await ref.getDownloadURL().toPromise();
    //
    //     this.db.collection('files').doc(uniqueSafeName).set({
    //       storagePath: path,
    //       downloadURL: this.downloadURL,
    //       originalName: this.file.name,
    //       timestamp: timestamp
    //     })
    //       .then(function () {
    //         console.log('document written!');
    //       })
    //       .catch(function (error) {
    //         console.error('Error writing document:', error);
    //       });
    //   }),
    // );
  }

  // async onFileSelected(event: any) {
  //   const file:File = event.target.files[0];
  //
  //   // update db
  //   await this.uploadService.add({
  //     name: file.name, //`File-${Date.now()}`,
  //     status: 'uploading',//'pending',//UploadStatus.Pending,
  //     // uploadProgress: 0,
  //     // validationProgress: 0,
  //     // validatedAt: undefined,
  //     // checked: false,
  //     // id: 0,
  //     // releaseVersion: undefined,
  //     sha: file.size,
  //     type: file.type,//"txt",
  //     // uploadedAt: "",
  //     uploadedBy: this.authService.user()?.username,
  //     // viewed: undefined,
  //
  //   });
  //   // uploadFile
  //   await this.uploadService.uploadFile(file);
  //   // show progress
  // }

  isActive() {
    const {transferredBytes, totalBytes, status} = this.uploadState();
    return (status === 'running' && transferredBytes < totalBytes);
  }

  // protected async handleFileRemoved(file: File) {
  //   await this.uploadService.delete(file);
  //   this.removeEvent.emit(file);
  // }
}
