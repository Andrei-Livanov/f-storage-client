import React from 'react';
import { Files } from '@/modules/Files';
import { Layout } from '@/layouts/Layout';
import { checkAuth } from '@/utils/checkAuth';
import { FileItem } from '@/api/dto/files.dto';
import { GetServerSidePropsContext, NextPage } from 'next';
import { DashboardLayout } from '@/layouts/DashboardLayout';

import * as Api from '@/api';

interface Props {
  items: FileItem[];
}

const DashboardPage: NextPage<Props> = ({ items }) => {
  return (
    <DashboardLayout>
      <Files items={items} withActions />
    </DashboardLayout>
  );
};

DashboardPage.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Главная">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ('redirect' in authProps) {
    return authProps;
  }

  try {
    const items = await Api.files.getAll();

    return { props: { items } };
  } catch (err) {
    console.log(err);
    return { props: { items: [] } };
  }
};

export default DashboardPage;