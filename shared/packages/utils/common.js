import i18n from '../../../locales/index';

export default class Utility {
  static redirect(location) {
    if (Utility.isBrowser()) {
      window.location.href = location;
    }
  }

  static isBrowser() {
    return typeof window !== 'undefined';
  }

  static isInFrame() {
    return window.location !== window.parent.location
  }

  static trimObjValues(obj) {
    return Object.keys(obj).reduce((acc, curr) => {
      acc[curr] = typeof obj[curr] == 'string' ? obj[curr].trim() : obj[curr];
      return acc;
    }, {});
  }
  static trans(key) {
    return i18n.t(`${key}`);
  }
}
