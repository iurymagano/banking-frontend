import type { Metadata } from 'next';
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
  title: 'Banco Digital',
  description: 'Acesse o nosso banco',
  icons: {
    icon: 'https://res.cloudinary.com/dlr7micek/image/upload/v1701486538/assets/favicon_mveqhp.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await handleGetUser();
  console.log('🚀 ~ useeeeeeeeeeer:', user);
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${roboto.className} antialiased flex-1 w-full h-full`}>
        <Providers>
          <MainLayout user={user}>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
