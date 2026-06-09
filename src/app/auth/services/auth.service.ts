import {inject, Injectable, signal} from "@angular/core";
import {fetchAuthSession, getCurrentUser, GetCurrentUserOutput} from "aws-amplify/auth";
import {Hub} from "aws-amplify/utils";
import {AuthenticatorService} from "@aws-amplify/ui-angular";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticator = inject(AuthenticatorService);

  readonly user = signal<{username: string | undefined, role: string | null} | null>(null);

  constructor() {
    this.init().then();

    Hub.listen('auth', async ({ payload }) => {
      switch (payload.event) {
        case 'signedIn':
          const user = await getCurrentUser();
          const role = await this.getRole();
          this.user.set({username: user.signInDetails?.loginId, role});
          break;

        case 'signedOut':
          this.user.set(null);
          break;
      }
    });
  }

  private async init() {
    try {
      const user = await getCurrentUser();
      const role = await this.getRole();
      this.user.set({username: user.signInDetails?.loginId, role});
    } catch {
      this.user.set(null);
    }
  }

  async getRole() {
    const session = await fetchAuthSession();
    const groups = session.tokens?.idToken?.payload['cognito:groups'] as string[] || [];
    if (groups.includes('Administrator')) {
      return 'Administrator';
    } else if (groups.includes('Publisher')) {
      return 'Publisher';
    } else if (groups.includes('Contributor')) {
      return 'Contributor';
    } else {
      return null;
    }
  }

  logout() {
    this.authenticator.signOut();
  }
}
