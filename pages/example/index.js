import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import CommonLayout from "../../shared/packages/layout/root-layout.package";
import { EXAMPLE_PAGE } from "../../utils/constant";
import ExampleComponent from "../../component/example/exampleComponent"
// import { wrapper } from "../../redux/store"
// import { connect } from "react-redux";

export default function ExamplePage(props) {
    const { t } = useTranslation('common');
    return (
        <React.Fragment>
            <Head>
                <title>{t('mainMenu.dashboard')}</title>
            </Head>
            <ExampleComponent {...props} />
        </React.Fragment>
    );
}

export async function getServerSideProps(router) {
    try {
        const { id } = router.query;
        console.log("SSR Example-Page id: " + id);
        return {
            props: {
                id: id ?? null,
            }
        };
    }
    catch (e) {
    }
}

//TODO: find a solution to connect SSR to redux store
// export const getServerSideProps = wrapper.getServerSideProps(async ({ req, res, store, router }) => {
//     // const state = store.getState();
//     const { id } = router.query;
//     console.log("SSR Example-Page id: " + id);
//     console.log('state', state);
//     return {
//         props: {
//             id: id ?? null,
//         }
//     };
// });

ExamplePage.Layout = CommonLayout;
ExamplePage.Title = "Example";
ExamplePage.Href = EXAMPLE_PAGE;
