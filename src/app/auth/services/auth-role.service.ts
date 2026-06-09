import {Injectable, signal} from "@angular/core";
import {fetchAuthSession} from "aws-amplify/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthRoleService {
  role = signal<string | null>(null);


  async getRole(): Promise<string | null> {
    const session = await fetchAuthSession({ forceRefresh: true });

    const groups = session.tokens?.idToken?.payload['cognito:groups'] as string[] || [];
    if (groups.includes('Administrator')) {
      this.role.set('Administrator');
      return this.role();
    }
    this.role.set(null);
    return this.role();
  }

  // async isAdmin(): Promise<boolean> {
  //   const roles = await this.getRoles();
  //   console.log('Class: AuthRoleService, Function: isAdmin, Line 17 roles' , roles);
  //   return true;
  //   // return roles.includes('Administrator');
  // }
}
