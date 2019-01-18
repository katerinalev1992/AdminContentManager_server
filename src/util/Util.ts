export default class Util {

  /**
   * Generates random id
   * @return id - generated id
   */
  static guid(): string {
    return (Util.s4() + Util.s4() + '-' + Util.s4() + '-' + Util.s4() + '-' +
      Util.s4() + '-' + Util.s4() + Util.s4() + Util.s4()).toString();
  }

  /**
   * Generates random number
   * @return - random string 4 symbols
   */
  static s4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(14)
      .substring(1);
  }
}
