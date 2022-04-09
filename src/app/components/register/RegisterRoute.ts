import {Route} from "@angular/router";
import {LoginComponent} from "../login/LoginComponent";
import {RegisterComponent} from "./register.component";

export const RegisterRoutes: Route[] = [
    {path: 'register', component: RegisterComponent}
];
