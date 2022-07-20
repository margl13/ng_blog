import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostDto} from "../dataModel/PostDto";
import {CreatePostDto} from "../dataModel/CreatePostDto";
import {EditPostDto} from "../dataModel/EditPostDto";

@Injectable({
    providedIn: "root"
})
export class PostsService {

    constructor(private http: HttpClient) {
    }

    public findAll(): Observable<PostDto[]> {
        return this.http.get('/api/posts/') as Observable<PostDto[]>;
    }

    createPost(cretePostDto: CreatePostDto): Observable<PostDto> {
        return this.http.post('/api/posts/', cretePostDto) as Observable<PostDto>
    }

    findOnePost(id: number): Observable<PostDto>{
        return this.http.get<PostDto>('/api/posts/' + id)
    }

    public edit(editPostDto: EditPostDto): Observable<PostDto> {
        return this.http.put('/api/posts/' + editPostDto.id, editPostDto) as Observable<PostDto>;
    }

    public delete(postId: number): Observable<any> {
        return this.http.delete('/api/posts/' + '/' + postId);
    }

}

