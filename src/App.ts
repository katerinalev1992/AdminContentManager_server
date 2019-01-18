import * as express from 'express';
import { Express, Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import IApplicationConfiguration from './core/IApplicationConfiguration';
import AppRoutes from './routes/ApplicationRoute';
import ApplicationDataProviders from './providers/ApplicationDataProviders';

export default class App {
    private static app: App;

    private expApp: Express;

    private dataProviders: ApplicationDataProviders;

    public static getInstance(): App {
        return App.app;
    }

    constructor(private config: IApplicationConfiguration) {
        this.config = config;
        this.expApp = express();
        App.app = this;
    }

    run(): void {
        this.expApp.use(bodyParser.json({limit: '50mb'}));
        this.expApp.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
        this.expApp.use(cors());
        this.expApp.use((req: Request, res: Response, next: NextFunction) => {
            res.contentType('application/json');
            next();
        });
        this.dataProviders = new ApplicationDataProviders();

        let appRouter = new AppRoutes();
        appRouter.mount(this.expApp);

        this.expApp.listen(this.config.port, (err:any) => {
            if (err !== undefined) {
                console.log(err);
            } else {
                console.log("Server run on port: " + this.config.port);
            }
        });
    }
    get providers(): ApplicationDataProviders {
        return this.dataProviders;
    }
}