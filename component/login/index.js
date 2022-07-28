
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../shared/packages/provider/authBase";
import LoadingButton from "../../shared/packages/control/button/loadingButton";
import { useRouter } from 'next/router'
import Utility from "../../shared/packages/utils/common"
import { ROOT } from "../../utils/constant"

const Login = () => {
    const { language } = useSelector((state) => state.app);
    const auth = useAuth();
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (auth.isAuthenticated) {
            Utility.redirect(ROOT)
        }
    }, [])

    let login = () => {
        setIsLoading(true);
        auth.signin().then((res) => {
            setTimeout(() => {
                router.push("/");
                setIsLoading(false);
            }, 2000);
        });
    };

    let logout = () => {
        setIsLoading(true);
        auth.signout().then((res) => {
            setTimeout(() => {
                router.push("/login");
                setIsLoading(false);
            }, 2000);
        });
    };

    return (
        <>
            {
                auth.isAuthenticated ||
                <section className="row flexbox-container">
                    <div className="col-12 d-flex align-items-center justify-content-center">
                        <LoadingButton isLoading={isLoading} onClick={login}>Log in</LoadingButton>
                    </div>
                </section>
            }
        </>
    );
}

export default Login;
