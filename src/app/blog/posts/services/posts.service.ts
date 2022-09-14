import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {PostDto} from "../dataModel/PostDto";
import {CreatePostDto} from "../dataModel/CreatePostDto";
import {EditPostDto} from "../dataModel/EditPostDto";
import {UserData} from "../../../user/dataModel/UserData";
import {catchError, map, tap} from "rxjs/operators";
import {PostData} from "../dataModel/PostData";

@Injectable({
    providedIn: "root"
})
export class PostsService {

    constructor(private http: HttpClient) {
    }

    findAll(page: number, limit: number): Observable<any> {
        let params = new HttpParams();

        params = params.append('page', String(page));
        params = params.append('limit', String(limit));

        return this.http.get<PostData>('/api/posts', {params}).pipe(
            tap((a => console.log(a)))
        );
    }

    findByUserId(userId: number, page: number, limit: number): Observable<PostData> {
        let params = new HttpParams();

        params = params.append('page', String(page));
        params = params.append('limit', String(limit));

        return this.http.get<PostData>('/api/posts/user/' + String(userId), {params});
    }

    findOnePost(id: number): Observable<PostDto>{
        return this.http.get<PostDto>('/api/posts/' + id);
    }

    public edit(editPostDto: EditPostDto): Observable<PostDto> {
        return this.http.put<PostDto>('/api/posts/' + editPostDto.id, editPostDto) as Observable<PostDto>;
    }

    public delete(postId: number): Observable<any> {
        return this.http.delete('/api/posts/' + '/' + postId);
    }

    create(createPostDto: CreatePostDto): Observable<PostDto> {
        return this.http.post('/api/posts/', createPostDto) as Observable<PostDto>;
    }

    uploadImage(formData: FormData): Observable<any> {
        return this.http.post<FormData>('/api/posts/image/upload', formData, {
            reportProgress: true,
            observe: "events"
        });
    }

}

