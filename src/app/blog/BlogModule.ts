import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {PostsModule} from "./posts/PostsModule";
import {CommonMaterialModules} from "../common/material/CommonMaterialModules";
import {RouterModule} from "@angular/router";
import {ConfirmationDialogComponent} from "./dialogs/ConfirmationDialogComponent";


@NgModule({
    imports: [
        PostsModule,
        HttpClientModule,
        CommonMaterialModules
    ],
    providers: [

    ],
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
