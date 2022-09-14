import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./common/auth/services/authService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

    constructor(private router: Router,
                private authService: AuthService

                ) {
    }

    navigateTo(value: any) {
        this.router.navigate(['../', value]);
    }

    logout() {
        this.authService.logout();
    }
}
