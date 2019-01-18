import { Express, Router } from 'express';

import IPathRoute from '../core/IPathRoute';
import UserRoute from './UserRoute';
import ContentRoute from "./ContentRoute";

export default class AppRoutes {
    private routeList: IPathRoute[] = [
        {path: '/user', router: UserRoute},
        {path: '/content', router: ContentRoute}
    ];

    mount(expApp: Express): void {
        this.routeList.forEach((item) => {
            expApp.use(
                item.path,
                item.router.createRouter(Router)
            );
        });
    }
}