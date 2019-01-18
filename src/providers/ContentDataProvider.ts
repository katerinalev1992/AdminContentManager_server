import DataProvider from './DataProvider';
import Content from "../models/Content";

export default class ContentDataProvider  extends DataProvider {

  constructor() {
    super('Content');
  }

  select(from: any, onSelect: (err: any, contents: Content[]) => void) {
    this.db_store.find(from, onSelect);
  }

  create(data: Content, onCreate: (err: any, newData: Content) => void) {
    this.db_store.insert(data, onCreate);
  }

  update(from: any, newData: Content) {
    this.db_store.update(from, {$set: newData});
  }

  delete(from: any, onDelete?: (err: any, numRemoved: number) => void) {
    this.db_store.remove(from, {multi: true}, onDelete);
  }

  findOne(from: any, onSelect: (err: any, content: Content) => void) {
    this.db_store.findOne(from, onSelect);
  }

  protected onLoadStore(err: any) {
    if (err !== null) {
      console.error(err);
    }
  }
}
