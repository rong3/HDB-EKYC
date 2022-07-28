import Cookies from 'js-cookie';

export const CookieHelper = {
    setCookie(key, value) {
        Cookies.set(key, value, { sameSite: 'strict' });
    },

    getCookie(key) {
        return Cookies.get(key);
    },

    removeCookie(key) {
        Cookies.remove(key)
    }
}
