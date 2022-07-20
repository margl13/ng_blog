import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {PostsModule} from "./posts/PostsModule";
import {CommonMaterialModules} from "../common/material/CommonMaterialModules";
import {ConfirmationDialogComponent} from "./dialogs/confirmationDialogComponent";


@NgModule({
    imports: [
        PostsModule,
        HttpClientModule,
        CommonMaterialModules
    ],
    providers: [],
    exports: [
        PostsModule,
        CommonMaterialModules
    ],
    declarations: [ConfirmationDialogComponent],
    entryComponents: [ConfirmationDialogComponent
    ]

})
export class BlogModule {
}
