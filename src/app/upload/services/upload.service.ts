import {inject, Injectable} from '@angular/core';
import {generateClient} from "aws-amplify/data";
import type { Schema } from '../../../../amplify/data/resource';
import {remove} from "aws-amplify/storage";
import {AuthService} from "../../auth/services/auth.service";
import {Params} from "@angular/router";
import {UploadRecord} from "../models/upload.model";
// import {UploadRecord} from "../models/upload.model";


const client = generateClient<Schema>();
// type UploadRecord =
//   NonNullable<
//     Awaited<ReturnType<typeof client.models.Upload.create>>['data']
//   >;

@Injectable({ providedIn: 'root' })
export class UploadService {

  private authService = inject(AuthService);

  getWithQuery(queryParams?: Params) {
    return client.models.Upload.list();
  }

  async update(item: UploadRecord) {
    await client.models.Upload.update(item)
  }

  async add(file: File) {
    const upload = {
      siteId: 'site-A',
      releaseId: '0.0',
      name: file.name,
      status: 'uploading',
      type: file.type,
      uploadedBy: this.authService.user()?.username ?? 'Peyman',
    };

    // const result = await client.models.Upload.create(upload);
    // const d: UploadRecord | null = result.data;
    // const f = d?.id;
    // if (result) {
    //   return result.data;
    // }
    // return null;
    return await client.models.Upload.create(upload);
  }

  // getById(id: string) {
  //   return client.models.Upload.get({ id });
  //   // return undefined;
  //   // return this.appUploadDataItems().find((item) => item.id === id);
  // }

  async delete(item: UploadRecord): Promise<void> {
    try {
      console.log('Class: UploadService, Function: delete, Line 110 ' , );
      await remove({
        path: `uploads/${item.name}`,
        // path: 'album/2024/1.jpg',
        // Alternatively, path: ({identityId}) => `album/${identityId}/1.jpg`
        // bucket: 'assignedNameInAmplifyBackend', // Specify a target bucket using name assigned in Amplify Backend
      });
      console.log('Class: UploadService, Function: delete, Line 108 id' , item.id);
      await client.models.Upload.delete(item);
      console.log('Class: UploadService, Function: delete, Line 119 ' , );
    } catch (error) {
      console.log('Error ', error);
    }
  }

  // async uploadFile(file: File) {
  //   await uploadData({
  //     path: `uploads/${file.name}`,
  //     data: file,
  //     options: {
  //       // bucket: 'amplifyTestBucket',
  //       // Alternatively, provide bucket name from console and associated region
  //       // bucket: {
  //       //   bucketName: 'genie-dev-upload-us-east-1',
  //       //   region: 'us-east-1'
  //       // },
  //       metadata: {
  //         customKey: 'customValue',
  //       },
  //       onProgress: ({transferredBytes, totalBytes}) => {
  //         if (totalBytes) {
  //           console.log(
  //             `Upload progress ${Math.round(
  //               (transferredBytes / totalBytes) * 100
  //             )} %`
  //           );
  //         }
  //       },
  //     }
  //   }).result;
  // }
}
