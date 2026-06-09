import {Routes} from "@angular/router";
import {SubmissionList} from "./containers/submission-list/submission-list";
import {SubmissionNew} from "./containers/submission-new/submission-new";
import {Submission} from "./containers/submission/submission";

export const submissionRoutes: Routes = [
  {
    path: '',
    component: SubmissionList,
  },
  {
    path: 'new',
    component: SubmissionNew,
  },
  {
    path: ':id',
    component: Submission,
  }
];
