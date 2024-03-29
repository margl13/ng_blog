import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {UserDto} from "../dataModel/UserDto";
import {UserData} from "../dataModel/UserData";
import {UserRegister} from "../dataModel/UserRegister";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    constructor(private http: HttpClient) {
    }

    findOne(id: number): Observable<UserDto> {
        return this.http.get('/api/users/' + id).pipe(
           map((user: UserDto) => user)
        )
    }

    findAll(page: number, size: number): Observable<UserData> {
        let params = new HttpParams();

        params = params.append('page', String(page));
        params = params.append('limit', String(size));

        return this.http.get<UserData>('/api/users', {params}).pipe(
            map((userData: any) => userData),
            catchError(err => throwError(err))
        )
    }

    paginateByUserName(page: number, size: number,username: string): Observable<UserData> {
        let params = new HttpParams();

        params = params.append('page', String(page));
        params = params.append('limit', String(size));
        params = params.append('username', username);

        return this.http.get('/api/users', {params}).pipe(
            map((userData: any) => userData),
            catchError(err => throwError(err))
        )
    }

    updateOne(user: UserDto): Observable<UserDto> {
        return this.http.put('api/users/' + user.id, user);
    }

    register(user: UserRegister) {
        return this.http.post<UserRegister>('/api/users/', user).pipe(
            map(user => user)
        )
    }

    uploadProfileImage(formData: FormData): Observable<any> {
        return this.http.post<FormData>('/api/users/upload', formData, {
            reportProgress: true,
            observe: 'events'
        });
    }

}
