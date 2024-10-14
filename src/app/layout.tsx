import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Roboto } from 'next/font/google';
import './globals.css';
import Providers from '@/components/layouts/providers';
import { handleGetUser } from '@/lib/server/auth';
import { MainLayout } from '@/components/layouts/mainLayout';

const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Banking',
  description: 'Banking App',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await handleGetUser();

  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, 
minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body className={`${roboto.className} antialiased flex-1 w-full h-full`}>
        <Providers>
          <MainLayout user={user}>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
