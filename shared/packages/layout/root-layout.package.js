import React, { useEffect } from "react";
import { masterConfig } from "../../../config/master"
import Head from "next/head";
import withAuth from "../hocs/authHOC";

const CommonLayout = ({ children }) => {
    const commonProps = {}
    return (
        <React.Fragment>
            {React.cloneElement(masterConfig.themeNavbar, { ...commonProps })}
            <div className="app-content content">
                <div className="content-overlay" />
                <div className="content-wrapper p-0">{children}</div>
            </div>
        </React.Fragment>
    );
}
export default withAuth(CommonLayout);