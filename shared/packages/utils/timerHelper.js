import { debounce } from "lodash";

class TimerHelpers {
    static _timer = {}
    static _debounced = {}

    static runTimer(key, time, callback) {
        if (TimerHelpers._timer[key]) {
            try {
                clearTimeout(TimerHelpers._timer[key])
            } catch (e) {

            }
        }
        TimerHelpers._timer[key] = setTimeout(() => {
            callback();
            TimerHelpers._timer[key] = null;
        }, time)
    }

    static runDebounced(key, time, callback) {
       if(!TimerHelpers._debounced[key]){
           TimerHelpers._debounced[key] = debounce(callback,time)
       }
       return TimerHelpers._debounced[key];
    }
}


export default TimerHelpers;