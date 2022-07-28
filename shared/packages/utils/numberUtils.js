import {isString, isNil, isEmpty} from 'lodash';

export default class NumberUtils {
  static  _currencyFormat = new Intl.NumberFormat('en-US');

  static parseFloat(data, def) {
    let val = parseFloat(data);
    return isNaN(val) ? def : val;
  }

  static currencyToFloat(data, def) {
    const val = parseFloat(data.replace(/[,]+/g,""));
    return isNaN(val) ? def : val;
  }

  static parseInt(data, def) {
    let val = parseInt(data);

    return isNaN(val) ? def : val;
  }

  static uuid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  static randomId(length, salt) {
    const saltString = salt.toString()
    const result = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length - saltString.length; i++) {
      result.push(characters.charAt(Math.floor(Math.random() *
        charactersLength)));
    }
    return saltString + result.join('');
  }

  static formatNumber(value, draft) {
    let rs = (!isNil(value) && value !== '') ? NumberUtils._currencyFormat.format(value) : ''
    if (!!draft && value && isString(value) && value.length > 0 && value.endsWith(".")) {
      rs += ".";
    }
    return rs;
    // return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  static range(start, end) {
    const rs = [];
    for (let i = start; i <= end; i++) {
      rs.push(i);
    }
    return rs;
  }

  static rangeVal(start, end, callback) {
    const rs = [];
    for (let i = start; i <= end; i++) {
      rs.push(callback ? callback(i) : i);
    }
    return rs;
  }
}