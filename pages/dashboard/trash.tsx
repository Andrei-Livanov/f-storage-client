import React from 'react';
import { Files } from '@/modules/Files';
import { Layout } from '@/layouts/Layout';
import { checkAuth } from '@/utils/checkAuth';
import { FileItem } from '@/api/dto/files.dto';
import { GetServerSidePropsContext } from 'next';
import { NextPageWithLayout } from '@/pages/_app';
import { DashboardLayout } from '@/layouts/DashboardLayout';

import * as Api from '@/api';

interface Props {
  items: FileItem[];
}

const DashboardTrash: NextPageWithLayout<Props> = ({ items }) => {
  return (
    <DashboardLayout>
      <Files items={items} />
    </DashboardLayout>
  );
};

DashboardTrash.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Корзина">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ('redirect' in authProps) {
    return authProps;
  }

  try {
    const items = await Api.files.getAll('trash');

    return { props: { items } };
  } catch (err) {
    console.log(err);
    return { props: { items: [] } };
  }
};

export default DashboardTrash;
