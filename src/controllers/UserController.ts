import UserDataProvider from "../providers/UserDataProvider";
import User from "../models/User";
import App from "../App";

export default class UserController {
    private userProviderInstance: UserDataProvider;

    constructor(private app: App) {
        this.userProviderInstance = app.providers.user;
    }

    findAll(onLoad: (err: string, data: User[]) => void) {
        this.userProviderInstance.select({}, onLoad);
    }

    findByNameAndPassword(name: string, password: string, onLoad: (data: any | null) => void) {
        this.userProviderInstance.findOne({name: name, password: password}, (err, data) => {
            const result = data !== undefined ? data : null;
            onLoad(result);
        });
    }

    create(data: any, onCreate: any, onError: (msg: string, code: number) => void) {
        let user = new User(data.name, data.password, data.role, data.id);

        this.userProviderInstance.create(user, (err, newData) => {
            if (err !== null) {
                onError(err.message, 500);
            } else {
                onCreate(newData);
            }
        });
    }

    removeById(id: string, onRemove: any) {
        this.userProviderInstance.delete({id: id}, onRemove);
    }

    updateById(id: string, newData: User, onUpdate: any) {
        this.userProviderInstance.update({id: id}, newData, onUpdate);
    }
}
