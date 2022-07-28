import { useAccessControlContext } from '../../provider/accessGateway';
import React from "react";
import Utility from "../../../packages/utils/common"
import { FORBIDDEN } from "../../../../utils/constant"
import { masterConfig } from "../../../../config/master"
import { TYPELAYOUT } from "../../globalConstant/common"

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
export default function withPermissionRedirect({
    WrappedComponent,
}) {
    const WithPermissionRedirectWrapper = props => {
        const { isForbidden } = useAccessControlContext();
        if (isForbidden && masterConfig.type === TYPELAYOUT.WEB_APP) {
            Utility.redirect(FORBIDDEN);
            return <></>;
        } else {
            return <WrappedComponent {...props} />;
        }
    };
    return WithPermissionRedirectWrapper;
}