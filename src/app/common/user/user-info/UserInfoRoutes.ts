import {Route} from '@angular/router';
import {UserInfoComponent} from "./user-info.component";

export const UserInfoRoutes: Route[] = [
    {
        path: 'users', children: [
            {
                path: ':id', component: UserInfoComponent
            }
        ]
    }
  ]
