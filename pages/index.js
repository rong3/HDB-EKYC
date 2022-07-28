import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import CommonLayout from "../shared/packages/layout/root-layout.package";
import Utility from "../shared/packages/utils/common";

function HomePage() {
  const { t } = useTranslation('common');
  return (
    <React.Fragment>
      <Head>
        <title>{t('mainMenu.dashboard')}</title>
      </Head>
      <h3 className="text-center">DASHBOARD</h3>
      <h5 className="text-center">The env is {process.env.SERVICE_HOST}</h5>
    </React.Fragment>
  );
}

HomePage.Layout = CommonLayout;
HomePage.Title = Utility.trans('mainMenu.dashboard');
export default HomePage;
