import React, { useEffect, useState } from "react";
import { getUserDetails } from "../../../services";
import { authenticationConstant } from "../globalConstant/authenticationConstant"
import { CookieHelper } from "../utils/cookie"
import { TYPELAYOUT } from "../globalConstant/common"
import { masterConfig } from "../../../config/master"

export function useProvideAuth(props) {
    const [user, setUser] = useState(null);
  
    const checkTokenMiddleWare = () => {
        if (masterConfig.type === TYPELAYOUT.WEB_APP) {
            const token = CookieHelper.getCookie(authenticationConstant.tokenKey);
            if (token) {
                setUser(null);
                return true
            }
            else {
                setUser([]);
                return false
            }
        }
        else {
            setUser(null);
            return true;
        }
    }

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return checkTokenMiddleWare();
    });


    // signin method: It can either return a promise or execute a callback function.
    // You can prefer to keep this in userServices.js
    const signin = (id) => {
        console.log("SS:: PrivateRoute > useProviderAuth > signin() called...");
        return new Promise((resolve, reject) => {
            try {
                // do db call or API endpoint axios call here and return the promise.
                getUserDetails(2)
                    .then((res) => {
                        console.log("useProvideAuth > signin > getUserDetails > res=", res);
                        CookieHelper.setCookie(authenticationConstant.tokenKey, Math.random());
                        setUser(res);
                        setIsAuthenticated(true)
                        resolve(res);
                    })
                    .catch((err) => {
                        console.log("useProvideAuth > signin > getUserDetails > err=", err);
                        setUser([]);
                        setIsAuthenticated(false)
                        reject("signin error!");
                    });
            } catch (error) {
                console.error("signin error!==", error);
                setIsAuthenticated(false);
                reject("signin error!");
            }
        });
    };
    const signout = () => {
        return new Promise((resolve, reject) => {
            try {
                // do API endpoint axios call here and return the promise.
                setUser(null);
                setIsAuthenticated(false)
                CookieHelper.removeCookie(authenticationConstant.tokenKey);
                resolve(true);
            } catch (error) {
                console.error("signout error!==", error);
                reject("signout error!");
            }
        });
    };

    return {
        user,
        isAuthenticated,
        signin,
        signout,
    };
}
