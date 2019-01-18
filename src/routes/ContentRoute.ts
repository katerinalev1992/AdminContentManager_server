import { Request, Response } from 'express';

import App from '../App';
import IApplicationRoute from '../core/IApplicationRoute';
import ContentController from "../controllers/ContentController";

const ContentRoute: IApplicationRoute = {
    createRouter(router) {
        let app = App.getInstance();
        let ContentCtrl = new ContentController(app);

        return router()
            .get('/', (req: Request, res: Response) => {
                ContentCtrl.findAll((err: any, data: any) => {
                    res.send({contents: data});
                });
            })
            .post('/add', (req: Request, res: Response) => {
                if (!req.body) {
                    res.send({msg:"Empty body request", code: 400});
                } else {
                    ContentCtrl.create(req.body, (newData: any) => {
                        res.send({contentCreated: newData});
                    }, (msg, code) => {
                        res.send({message: msg, code: code});
                    });
                }
            })
            .post('/login', (req: Request, res: Response) => {
                if (!req.body) {
                    res.send({msg:"Empty body request", code: 400});
                } else {
                    // AuthCtrl.login(req, res);
                }
            })
            .post('/update/:id', (req: Request, res: Response) => {
                if (!req.body) {
                    res.send({msg:"Empty body request", code: 400});
                } else {
                    ContentCtrl.updateById(req.params.id, req.body);
                    res.send({responseCode: 200});

                }
            })
            .delete('/delete/:id', (req: Request, res: Response) => {
                ContentCtrl.removeById(req.params.id, (data: any) => {
                    res.send({responseCode: 200});
                });
            })
            .get(
                '/logout',
                // AuthCtrl.logout
            );
    }
};

export default ContentRoute;