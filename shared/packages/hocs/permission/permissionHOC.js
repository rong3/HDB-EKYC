import withPermissionRedirect from '../permission/permissonRedirect';

/**
 * Require the user to be authenticated in order to render the component.
 * If the user isn't authenticated, forward to the given URL.
 */
export default function withPermission(WrappedComponent) {
    return withPermissionRedirect({
        WrappedComponent
    });
}