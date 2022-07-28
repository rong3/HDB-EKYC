import React, { useEffect, useState } from 'react';
import { useAuth } from "../provider/authBase";
import { authenticationConstant } from "../globalConstant/authenticationConstant"
import { CookieHelper } from "../utils/cookie"
import { TYPELAYOUT } from "../globalConstant/common"
import { masterConfig } from "../../../config/master"

const AccessControlContext = React.createContext({});

export const AccessControlProvider = ({ children, deniedPermissions = [], moduleName }) => {
    const { isAuthenticated, signout } = useAuth();
    const [permissions, setPermission] = useState(null)
    const [isForbidden, setIsForbidden] = useState(false)

    const permissionGate = (userPermissions, deniedPermissions = []) => {
        let isNotAllowed = false;
        //pre-check validation role to the output
        isNotAllowed = false;
        if (masterConfig.type === TYPELAYOUT.LANDING_PAGE) {
            isNotAllowed = false;
        }
        setIsForbidden(isNotAllowed)
    }

    useEffect(() => {
        if (isAuthenticated) {
            const token = CookieHelper.getCookie(authenticationConstant.tokenKey);
            if (token) {
                //pre-execute function top get role list , department, or something...
                //TODO: add to localstorage the permissions
                setPermission([])
                permissionGate([]);
            }
            else {
                if (masterConfig.type === TYPELAYOUT.WEB_APP) {
                    signout();
                }
            }
        }
        else {
            setIsForbidden(true);
        }
    }, [children])

    return (
        <AccessControlContext.Provider
            value={{
                isForbidden,
                permissions,
                setPermission
            }}
        >
            {
                children
            }
        </AccessControlContext.Provider>
    );
};

export function useAccessControlContext() {
    return React.useContext(AccessControlContext);
}

export function usePermission() {
    const context = useAccessControlContext();
    const allows = (permissionCode) => {
        if (masterConfig.type === TYPELAYOUT.LANDING_PAGE) {
            return true;
        }
        return true;
    }
    return [allows]
}