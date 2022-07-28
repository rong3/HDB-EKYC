import moment from "moment";
import {isNil} from "lodash";

export default class dateUtils {
  static diffDate(start, end, type) {
    let from = moment(start).startOf('day');
    let to = moment(end).startOf('day');
    if (type === 'day') {
      return to.diff(from, 'days');
    }
    if (type === 'month') {
      return Math.round(to.diff(from, 'months', true) * 100) / 100;
    }
    if (type === 'ceilmonth') {
      return Math.ceil(to.diff(from, 'months', true));
    }
    if (type === 'year') {
      return Math.round(to.diff(from, 'years', true) * 100) / 100;
    }
    if (type === 'ceilyear') {
      return Math.ceil(to.diff(from, 'years', true));
    }
    return 0;
  }

  addDate(date, val, unit) {
    return moment(date).add(val, unit).format();
  }

  static isInvalidDate(value) {
    return (isNil(value) || value === 'Invalid date')
  }
}