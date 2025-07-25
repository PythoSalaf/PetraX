import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { WalletProvider } from '@/contexts';
import { Navbar, Footer } from '@/components';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
});

export const metadata: Metadata = {
  title: 'PetraX - Oil Trading Platform',
  description: 'Trade oil commodities with blockchain technology on ICP. Connect your wallet and start trading oil using cryptocurrency on our secure decentralized platform.',
  keywords: 'oil trading, blockchain, Web3, ICP, cryptocurrency, trading platform, oil commodities, petroleum trading',
  authors: [{ name: 'PetraX Team' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.className} antialiased`}>
        <WalletProvider>
          <div className="flex flex-col min-h-screen bg-primary">
            <Navbar />
            <main className="flex-1 pt-20">
              {children}
            </main>
            <Footer />
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}
