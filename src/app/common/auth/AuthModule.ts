import {NgModule} from '@angular/core';
import {AuthService} from "./services/authService";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    imports: [
        HttpClientModule
    ],
    exports: [],
    declarations: [],
    providers: [
        AuthService
    ],
})
export class AuthModule {
}
