'use client';
import React from 'react';

import { Inter } from 'next/font/google';
import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App as AntApp } from 'antd';
import viVN from 'antd/es/locale/vi_VN';

import '../styles/index.css';
import '../config/antdRender';

const inter = Inter({ subsets: ['latin'] });

const queryClient = new QueryClient({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <AntApp>
            <ConfigProvider
              locale={viVN}
              theme={{
                token: {
                  colorPrimaryHover: '#3950a2',
                },
                components: {
                  Button: {
                    defaultBg: '#e2e6ea',
                    defaultHoverBg: '#d6d9dc',
                    defaultHoverBorderColor: '#d6d9dc',
                    defaultHoverColor: '#607080',

                    colorBorder: 'transparent',
                    colorPrimary: '#435ebe',
                    borderRadius: 4,

                    borderColorDisabled: '#d3d3d3',
                  },
                  Form: {
                    labelFontSize: 16,
                  },

                  Input: {
                    activeBorderColor: '#a1afdf',
                    activeShadow: '0 0 0 .25rem rgba(67,94,190,.25)',
                    hoverBorderColor: '#dce7f1',
                  },
                  DatePicker: {
                    activeShadow: '0 0 0 .15rem rgba(67,94,190,.25)',
                  },
                  InputNumber: {
                    activeBorderColor: '#a1afdf',
                    activeShadow: '0 0 0 .25rem rgba(67,94,190,.25)',
                    hoverBorderColor: '#dce7f1',
                  },
                },
              }}
            >
              {children}
            </ConfigProvider>
          </AntApp>
        </QueryClientProvider>
      </body>
    </html>
  );
}
