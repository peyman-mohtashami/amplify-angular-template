import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {UploadService} from "./upload.service";
import {Upload} from "../models/upload.model";

@Injectable({providedIn: 'root'})
export class UploadListResolver implements Resolve<Upload[]> {
  private entityService = inject(UploadService);

  async resolve(route: ActivatedRouteSnapshot) {
    const result = await this.entityService.getWithQuery(route.queryParams);
    return result.data;
  }
}
