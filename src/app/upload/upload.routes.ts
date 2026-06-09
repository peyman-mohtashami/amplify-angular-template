import {Routes} from "@angular/router";
import {UploadList} from "./containers/upload-list/upload-list";
import {UploadNew} from "./containers/upload-new/upload-new";
import {Upload} from "./containers/upload/upload";
import {UploadListResolver} from "./services/upload-list.resolver";

export const uploadRoutes: Routes = [
  {
    path: '',
    component: UploadList,
    resolve: {
      uploads: UploadListResolver
    }
  },
  {
    path: 'new',
    component: UploadNew,
  },
  {
    path: ':id',
    component: Upload,
  }
];
