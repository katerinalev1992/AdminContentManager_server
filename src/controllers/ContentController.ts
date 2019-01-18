import App from "../App";
import ContentDataProvider from "../providers/ContentDataProvider";
import Content from "../models/Content";

export default class ContentController {
    private contentProviderInstance: ContentDataProvider;

    constructor(private app: App) {
        this.contentProviderInstance = app.providers.content;
    }

    findAll(onLoad: (err: string, data: Content[]) => void) {
        this.contentProviderInstance.select({}, onLoad);
    }

    findByName(name: string, onLoad: (data: Content | null) => void, onError: (msg: string, code: number) => void) {
        this.contentProviderInstance.findOne({name: name}, (err, data) => {
            if (err) {
                onError(err.message, 500);
            } else {
                const result = data !== undefined ? data : null;
                onLoad(result);
            }
        });
    }

    create(data: any, onCreate: any, onError: (msg: string, code: number) => void) {
        const content = new Content(data.image, data.tooltip, data.id);
        this.contentProviderInstance.create(content, (err, newData) => {
            if (err !== null) {
                onError(err.message, 500);
            } else {
                onCreate(newData);
            }
        });

    }

    removeById(id: string, onRemove: any) {
        this.contentProviderInstance.delete({id: id}, onRemove);
    }

    updateById(id: string, newData: Content) {
        this.contentProviderInstance.update({id: id}, newData);
    }
}
