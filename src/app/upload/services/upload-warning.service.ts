import { Injectable } from '@angular/core';
import { UploadWarningSetting } from '../models/upload.model';

@Injectable({ providedIn: 'root' })
export class UploadWarningService {
  getWarningSettings(): UploadWarningSetting[] {
    return [
      {
        title: 'Unknown Organism',
        message: "Organism 'Unknown' is not recognized in taxonomy database",
        code: 5001,
        checked: true,
      },
    ];
  }
}
