import withAuthRedirect from './authRedirect';
import { LOGIN_SERVICE } from "../globalConstant/common"

/**
 * Require the user to be authenticated in order to render the component.
 * If the user isn't authenticated, forward to the given URL.
 */
export default function withAuth(WrappedComponent, location = LOGIN_SERVICE) {
    return withAuthRedirect({
        WrappedComponent,
        location,
        expectedAuth: true
    });
}