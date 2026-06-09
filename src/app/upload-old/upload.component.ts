import { Component } from '@angular/core';
import { uploadData } from "aws-amplify/storage";

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  fileName = '';

  async onFileSelected(event: any) {
    // const fileReader = new FileReader();

    const file:File = event.target.files[0];

    await uploadData({
      path: `uploads/${file.name}`,
      data: file,
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
        onProgress: ({ transferredBytes, totalBytes }) => {
          if (totalBytes) {
            console.log(
              `Upload progress ${Math.round(
                (transferredBytes / totalBytes) * 100
              )} %`
            );
          }
        },
      }
    }).result;

    // if (file) {
    //   fileReader.readAsArrayBuffer(file);
    //   this.fileName = file.name;
    //
    //   fileReader.onload = async (evt) => {
    //     console.log("Complete File read successfully!", evt.target?.result);
    //     try {
    //       uploadData({
    //         data: event.target.result,
    //         path: `uploads/${file.name}`,
    //         // path: file.name,
    //         options: {
    //           // Specify a target bucket using name assigned in Amplify Backend
    //           // bucket: 'amplifyTestBucket',
    //
    //           // Alternatively, provide bucket name from console and associated region
    //           // bucket: {
    //           //   bucketName: 'genie-dev-upload-us-east-1',
    //           //   region: 'us-east-1'
    //           // },
    //           metadata: {
    //             customKey: 'customValue',
    //           },
    //           onProgress: ({ transferredBytes, totalBytes }) => {
    //             if (totalBytes) {
    //               console.log(
    //                 `Upload progress ${Math.round(
    //                   (transferredBytes / totalBytes) * 100
    //                 )} %`
    //               );
    //             }
    //           },
    //         }
    //       });
    //     } catch (e) {
    //       console.log("error", e);
    //     }
    //   };

      // const formData = new FormData();
      //
      // formData.append("thumbnail", file);
      //
      // const upload$ = this.http.post("/api/thumbnail-upload", formData);
      //
      // upload$.subscribe();
    // }
  }


  // protected uploadFile() {
  //   const fileReader = new FileReader();
  //   fileReader.readAsArrayBuffer(file.files[0]);
  //
  //   fileReader.onload = async (event) => {
  //     console.log("Complete File read successfully!", event.target.result);
  //     try {
  //       await uploadData({
  //         data: event.target.result,
  //         path: file.files[0].name
  //       });
  //     } catch (e) {
  //       console.log("error", e);
  //     }
  //   };
  // }
}
