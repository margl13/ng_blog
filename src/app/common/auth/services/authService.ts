import {Injectable} from '@angular/core';
import {UserLogin} from "../../../user/dataModel/UserLogin";
import {map, switchMap, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {UserRegister} from "../../../user/dataModel/UserRegister";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Observable, of} from "rxjs";


export const AUTH_TOKEN = 'blog-token';

@Injectable({
    providedIn: "root"
})
export class AuthService {
    constructor(private http: HttpClient,
                private jwtHelper: JwtHelperService) {
    }

    login(loginForm: UserLogin) {
        return this.http.post<any>('/api/auth/login', {email: loginForm.email, password: loginForm.password}).pipe(
            map((token) => {
                console.log(token);
                localStorage.setItem(AUTH_TOKEN, token.access_token)
                return token;
            })
        )
    }

    logout() {
        localStorage.removeItem(AUTH_TOKEN);
    }



    isAuthenticated(): boolean {
        const token = localStorage.getItem(AUTH_TOKEN);
        if (!token) {
            return false;
        }
        try {
            return !this.jwtHelper.isTokenExpired(token)
        } catch (e) {
            return false
        }
    }

    getIdOfUser(): Observable<number> {
        return of(localStorage.getItem(AUTH_TOKEN)).pipe(
            switchMap((jwt: any) => of(this.jwtHelper.decodeToken(jwt)).pipe(
                    tap((jwt) => console.log(jwt)),
                map((jwt: any) => jwt.user.id)
            )
            ));
    }
}





