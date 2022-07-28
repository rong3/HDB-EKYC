import React from "react";
import Head from "next/head";
import NonLayout from "../shared/packages/layout/non-layout";

export default function NotFoundException() {
    return (
        <React.Fragment>
            <Head>
                <title>404 - Not Found</title>
            </Head>
            <NonLayout>
                <section className="flexbox-container">
                    <div className="col-12 d-flex align-items-center justify-content-center">
                        <div className="col-md-4 col-10 p-0">
                            <div className="card-header bg-transparent border-0">
                                <h3 className="text-uppercase text-center">The page you were looking for doesn't exist</h3>
                            </div>
                        </div>
                    </div>
                </section>
            </NonLayout>
        </React.Fragment>
    );
}
