import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Amplify} from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import {AmplifyAuthenticatorModule} from '@aws-amplify/ui-angular';
import {AuthService} from "./auth/services/auth.service";
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from "@angular/cdk/menu";

Amplify.configure(outputs);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    RouterLink,
    AmplifyAuthenticatorModule,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuItem,
  ],
})
export class AppComponent {

  protected authService = inject(AuthService);

  // constructor() {
  //   Amplify.configure(outputs);
  // }

  protected logout() {
    this.authService.logout();
  }
}
