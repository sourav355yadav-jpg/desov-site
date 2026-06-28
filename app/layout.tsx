import type { Metadata } from 'next';
import { Alice, Anton, Cinzel } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';
import PageTransition from './components/PageTransition';

const alice = Alice({
  subsets: ['latin'],
  variable: '--font-alice',
  display: 'swap',
  weight: ['400'],
});

const anton = Anton({
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
  weight: ['400'],
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Desov — Creative Digital Experiences',
  description:
    'Award-winning creative digital agency. We craft compelling brand identities, smart development, marketing campaigns, and 3D visualization.',
  metadataBase: new URL('https://desovsite.vercel.app'),
  openGraph: {
    title: 'Desov — Creative Digital Experiences',
    description: 'Award-winning creative digital agency.',
    images: ['/og-images/home.png'],
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#FBF9F6',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${alice.variable} ${anton.variable} ${cinzel.variable} lenis`}>
      <body>
        <SmoothScroll>
          <CustomCursor />
          <PageTransition />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
