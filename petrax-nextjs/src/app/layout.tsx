import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { WalletProvider } from '@/contexts';
import { Navbar, Footer } from '@/components';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PetraX - Oil Trading Platform',
  description: 'Revolutionize oil trading with AI & Web3 technology. Trade smarter, faster, and more securely on our decentralized marketplace.',
  keywords: 'oil trading, blockchain, Web3, ICP, cryptocurrency, trading platform',
  authors: [{ name: 'PetraX Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <WalletProvider>
          <div className="flex flex-col min-h-screen bg-gray-900">
            <Navbar />
            <main className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}
