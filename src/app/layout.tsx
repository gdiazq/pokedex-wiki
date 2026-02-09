import type { Metadata } from 'next';
import { Onest } from 'next/font/google';
import { cookies } from 'next/headers';
import { Providers } from './providers';
import './globals.css';

const onest = Onest({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pokedex Wiki',
  description: 'Explora Pokemon por region, tipo y estadisticas base.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme')?.value || 'dark';

  return (
    <html lang="es" className={theme} style={{ colorScheme: theme }}>
      <body className={`${onest.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
