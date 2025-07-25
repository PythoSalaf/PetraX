import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import { WalletProvider, TanstackProvider } from '@/contexts';
import {
  Navbar,
  Footer,
  GlobalErrorHandler,
  AdminKeyboardShortcut,
  ErrorBoundary,
  Sidebar,
  SidebarBody,
  SidebarLink,
  SidebarWalletButton,
  navigationItems
} from '@/components';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { siteConfig } from '@/config/site';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  metadataBase: siteConfig.metadataBase,
  openGraph: siteConfig.openGraph,
  twitter: siteConfig.twitter,
  icons: siteConfig.icons,
  manifest: siteConfig.manifest,
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
        <GlobalErrorHandler />
        <TanstackProvider>
          <WalletProvider>
            <ErrorBoundary>
              <div className="flex flex-col min-h-screen bg-primary">
                <Navbar />
                <div className="flex flex-1">
                  <Sidebar>
                    <SidebarBody className="justify-between gap-10">
                      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        <div className="mt-8 flex flex-col gap-2">
                          {navigationItems.map((item) => (
                            <SidebarLink
                              key={item.href}
                              href={item.href}
                              label={item.label}
                              icon={item.icon}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <SidebarWalletButton />
                      </div>
                    </SidebarBody>
                  </Sidebar>
                  <main className="flex-1 md:ml-[60px] transition-all duration-300">
                    {children}
                  </main>
                </div>
                <Footer />
              </div>
            </ErrorBoundary>
            <AdminKeyboardShortcut />
            <Analytics />
            <SpeedInsights />
          </WalletProvider>
        </TanstackProvider>
        <Toaster richColors closeButton expand visibleToasts={4} />
      </body>
    </html>
  );
}
