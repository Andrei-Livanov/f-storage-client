import { ReactElement } from 'react';
import { Button } from 'antd';
import { User } from '@/api/dto/auth.dto';
import { Layout } from '@/layouts/Layout';
import { checkAuth } from '@/utils/checkAuth';
import { GetServerSidePropsContext } from 'next';
import styles from '@/styles/Profile.module.scss';
import { NextPageWithLayout } from '@/pages/_app';

import * as Api from '@/api';

interface Props {
  userData: User;
}

const DashboardProfilePage: NextPageWithLayout<Props> = ({ userData }) => {
  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      Api.auth.logout();
      location.href = '/';
    }
  };

  return (
    <main>
      <div className={styles.root}>
        <h1>Мой профиль</h1>
        <br />
        <p>
          ID: <b>{userData.id}</b>
        </p>
        <p>
          Полное имя: <b>{userData.fullName}</b>
        </p>
        <p>
          E-Mail: <b>{userData.email}</b>
        </p>
        <br />
        <Button onClick={onClickLogout} type="primary" danger>
          Выйти
        </Button>
      </div>
    </main>
  );
};

DashboardProfilePage.getLayout = (page: ReactElement) => {
  return <Layout title="Dashboard / Профиль">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ('redirect' in authProps) {
    return authProps;
  }

  const userData = await Api.auth.getMe();

  return { props: { userData } };
};

export default DashboardProfilePage;
