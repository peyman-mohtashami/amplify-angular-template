import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'uploads',
    loadChildren: () =>
      import('./upload/upload.routes').then((m) => m.uploadRoutes),
  },
  {
    path: 'submissions',
    loadChildren: () =>
      import('./submission/submission.routes').then((m) => m.submissionRoutes),
  },
  {
    path: 'user-retractions',
    loadChildren: () =>
      import('./user-retraction/user-retraction.routes').then((m) => m.userRetractionRoutes),
  },
  {
    path: '',
    redirectTo: 'uploads',
    pathMatch: 'full'
  }
];
