import React from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

interface Props extends AppProps {
  Component: AppProps['Component'] & {
    getLayout: (page: React.ReactElement) => React.ReactNode;
  };
}

export default function App({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout || ((page: React.ReactNode) => page);

  return getLayout(<Component {...pageProps} />);
}
