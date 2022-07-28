import React from "react";
import Head from "next/head";
import NonLayout from "../shared/packages/layout/non-layout";

export default function AuthorizationDeny() {
    return (
        <React.Fragment>
            <Head>
                <title>401 - Authorization</title>
            </Head>
            <NonLayout>
                <section className="flexbox-container">
                    <div className="col-12 d-flex align-items-center justify-content-center">
                        <div className="col-md-4 col-10 p-0">
                            <div className="card-header bg-transparent border-0">
                                <h2 className="error-code text-center mb-2">401</h2>
                                <h3 className="text-uppercase text-center">Không có quyền truy cập trang này</h3>
                            </div>
                        </div>
                    </div>
                </section>
            </NonLayout>
        </React.Fragment>
    );
}
