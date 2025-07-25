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
  description: 'Revolutionize oil trading with AI & Web3 technology. Trade smarter, faster, and more securely on our decentralized marketplace.',
  keywords: 'oil trading, blockchain, Web3, ICP, cryptocurrency, trading platform',
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
