import DataProvider from './DataProvider';
import UserDataProvider from './UserDataProvider';
import ContentDataProvider from "./ContentDataProvider";

export default class ApplicationDataProviders {
    private dataProvidersStorage: DataProvider[];

    constructor() {
        this.dataProvidersStorage = this.getProviders()
            .map(provider => new provider());
    }

    get user(): UserDataProvider {
        return this.getInstanceProvider(UserDataProvider);
    }

    get content(): ContentDataProvider {
        return this.getInstanceProvider(ContentDataProvider);
    }

    private getInstanceProvider(typeProvider: any): any | null {
        let items = this.dataProvidersStorage.filter((provider) => {
            if (provider instanceof typeProvider) {
                return provider;
            }
        });
        return items.length > 0 ? items[0] : null;
    }

    private getProviders(): any[] {
        return [
            UserDataProvider,
            ContentDataProvider
        ];
    }
}