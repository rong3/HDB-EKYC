import { useAuth } from '../provider/authBase';
import React from "react";
import Utility from "../../packages/utils/common"
import { masterConfig } from "../../../config/master"
import { TYPELAYOUT } from "../globalConstant/common"

/**
 * Support client-side conditional redirecting based on the user's
 * authenticated state.
 *
 * @param WrappedComponent The component that this functionality
 * will be added to.
 * @param LoadingComponent The component that will be rendered while
 * the auth state is loading.
 * @param expectedAuth Whether the user should be authenticated for
 * the component to be rendered.
 * @param location The location to redirect to.
 */
export default function withAuthRedirect({
    WrappedComponent,
    expectedAuth,
    location
}) {
    const WithAuthRedirectWrapper = props => {
        const { isAuthenticated, signout } = useAuth();
        if (masterConfig.type === TYPELAYOUT.WEB_APP) {
            if (typeof window !== 'undefined' && expectedAuth !== isAuthenticated) {
                const currentLocation = window.location.href;
                console.log('>>>>>>>>>>>>>>>>redirectLoginLocation ', currentLocation);
                signout();
                Utility.redirect(location);
                return <></>;
            } else {
                return <WrappedComponent {...props} />;
            }
        }
        else {
            return <WrappedComponent {...props} />;
        }
    };
    return WithAuthRedirectWrapper;
}