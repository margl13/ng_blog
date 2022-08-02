import {NgModule} from '@angular/core';
import {PostListModule} from "./post-list/PostListModule";
import {CommonMaterialModules} from "../../common/material/CommonMaterialModules";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {PostsService} from "./services/posts.service";
import {SinglePostModule} from "./single-post/SinglePostModule";
import {CreatePostDialogComponent} from "./dialogs/create-post-dialog-component";
import {MatToolbarModule} from "@angular/material/toolbar";


@NgModule({
    imports: [
        PostListModule,
        CommonMaterialModules,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        SinglePostModule,
    ],
    exports: [
        PostListModule
    ],
    declarations: [CreatePostDialogComponent],
    entryComponents: [CreatePostDialogComponent],
    providers: [
    PostsService
    ],
})
export class PostsModule {
}


