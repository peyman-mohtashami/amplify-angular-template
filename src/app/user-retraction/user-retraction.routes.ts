import {Routes} from "@angular/router";
import {UserRetractionList} from "./containers/user-retraction-list/user-retraction-list";
import {UserRetractionNew} from "./containers/user-retraction-new/user-retraction-new";
import {UserRetraction} from "./containers/user-retraction/user-retraction";

export const userRetractionRoutes: Routes = [
  {
    path: '',
    component: UserRetractionList,
  },
  {
    path: 'new',
    component: UserRetractionNew,
  },
  {
    path: ':id',
    component: UserRetraction,
  }
];
