import React, { useEffect } from "react";

const NonLayout = ({ children }) => {
    const commonProps = {}
    return (
        <React.Fragment>
            <div className="app-content content">
                <div className="content-overlay" />
                <div className="content-wrapper p-0">{children}</div>
            </div>
        </React.Fragment>
    );
}
export default NonLayout;