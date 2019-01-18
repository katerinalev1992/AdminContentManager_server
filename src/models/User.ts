import {Role} from './Role';
import Util from '../util/Util';

export default class User {
  private id: string;
  private name: string;
  private password: string; // implementation without security
  private role: Role;

  constructor(name: string, password: string, role: Role, id?: string) {
    if (id) {
      this.id = id;
    } else {
      this.id = Util.guid();
    }
    this.name = name;
    this.password = password;
    this.role = role;
  }

  isAdmin(): boolean {
    return this.role === Role.Admin;
  }
}
