export const siteConfig = {
  name: "PetraX - Oil Trading Platform",
  description: "Trade oil commodities with blockchain technology on ICP. Connect your wallet and start trading oil using cryptocurrency on our secure decentralized platform.",
  url: "https://petrax.com",
  ogImage: "https://petrax.com/og.jpg",
  links: {
    twitter: "https://twitter.com/petrax",
    github: "https://github.com/petrax",
    docs: "https://docs.petrax.com",
  },
  keywords: [
    "oil trading",
    "blockchain",
    "Web3",
    "ICP",
    "cryptocurrency",
    "trading platform",
    "oil commodities",
    "petroleum trading",
    "decentralized finance",
    "DeFi"
  ] as string[],
  authors: [
    {
      name: "PetraX Team",
      url: "https://petrax.com",
    },
  ] as Array<{ name: string; url: string }>,
  creator: "PetraX Team",
  metadataBase: new URL("https://petrax.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://petrax.com",
    title: "PetraX - Oil Trading Platform",
    description: "Trade oil commodities with blockchain technology on ICP. Connect your wallet and start trading oil using cryptocurrency on our secure decentralized platform.",
    siteName: "PetraX",
  },
  twitter: {
    card: "summary_large_image",
    title: "PetraX - Oil Trading Platform",
    description: "Trade oil commodities with blockchain technology on ICP. Connect your wallet and start trading oil using cryptocurrency on our secure decentralized platform.",
    creator: "@petrax",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
} as const;

export type SiteConfig = typeof siteConfig;
