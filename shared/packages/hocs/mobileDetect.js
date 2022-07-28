import { useEffect, useState } from "react";

function withMobileDetect({
    WrappedComponent
}) {
    const WithMobileDetectWrapper = props => {
        const [isMobile, setIsMobile] = useState(null);

        useEffect(() => {
            updateWindowDimensions();
            window.addEventListener("resize", updateWindowDimensions);

            return () => {
                window.removeEventListener("resize", updateWindowDimensions);
            }
        }, [])

        const updateWindowDimensions = () => {
            if (window.innerWidth < 769) {
                setIsMobile({
                    isMobile: true
                });
            } else {
                setIsMobile({
                    isMobile: false
                });
            }
        };

        return <WrappedComponent {...props} {...isMobile} />;
    };
    return WithMobileDetectWrapper;
}

export default function mobileDetectHOC(WrappedComponent) {
    return withMobileDetect({
        WrappedComponent
    });
}