import type {Metadata} from 'next';
import { Plus_Jakarta_Sans, Playfair_Display, Caveat } from 'next/font/google';
import './globals.css';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serifFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const scriptFont = Caveat({
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LEASHED - Professional Pet Care Education',
  description:
    'Industry-leading education and training for those who want to turn their love for animals into a professional career. Real Skills. Meaningful Careers.',
  openGraph: {
    title: 'LEASHED - Professional Pet Care Education',
    description:
      'Industry-leading education and training for those who want to turn their love for animals into a professional career.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LEASHED - Professional Pet Care Education',
    description:
      'Industry-leading education and training for those who want to turn their love for animals into a professional career.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${sansFont.variable} ${serifFont.variable} ${scriptFont.variable}`}>
      <body className="font-sans antialiased text-[#161c18] bg-[#fbf9f5] selection:bg-[#d9b589]/40 selection:text-[#131b15]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
