import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {PostDto} from "./dataModel/PostDto";
import {PostResource} from "./PostResource";
import {CreatePostDto} from "./dataModel/createPostDto";
import {EditPostDto} from "./dataModel/EditPostDto";

@Injectable()
export class PostService {

    constructor(private postResource: PostResource) {
    }

    public getAllPOstItems(): Observable<PostDto[]> {
        return this.postResource.findAll();
    }

    public createPost(createPostDto: CreatePostDto): Observable<PostDto> {
        return this.postResource.create(createPostDto);
    }

    public editPost(editPostDto: EditPostDto): Observable<PostDto> {
        return this.postResource.edit(editPostDto);
    }

    public deletePost(postId: number): Observable<void> {
        return this.postResource.delete(postId)
    }
}
