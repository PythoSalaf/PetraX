# 🛢️ PetraX - Next-Generation Oil Trading Platform

<div align="center">

![PetraX Logo](public/assets/icon.jpeg)

**A cutting-edge, decentralized oil trading platform built with Next.js and powered by the Internet Computer Protocol (ICP) blockchain.**

[![Next.js](https://img.shields.io/badge/Next.js-15.4.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![ICP](https://img.shields.io/badge/ICP-Blockchain-purple?style=for-the-badge&logo=internetcomputer)](https://internetcomputer.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[🚀 Live Demo](https://petrax.com) • [📖 Documentation](https://docs.petrax.com) • [🐛 Report Bug](https://github.com/petrax/issues) • [✨ Request Feature](https://github.com/petrax/issues)

</div>

---

## ✨ Features

### 🔗 **Blockchain Integration**
- **Decentralized Trading**: Execute oil contracts directly on the ICP blockchain
- **Multi-Wallet Support**: Internet Identity, Plug, Stoic, and Bitfinity wallets
- **Smart Contracts**: Automated contract execution and settlement
- **Secure Transactions**: Cryptographic security for all trades

### 📊 **Advanced Trading**
- **Real-time Market Data**: Live oil price feeds and market analytics
- **Multiple Oil Types**: Brent Crude, WTI, Dubai Crude, OPEC Basket
- **Order Types**: Market, Limit, and Conditional orders
- **Trading Dashboard**: Professional-grade trading interface

### 🎨 **Modern UI/UX**
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Dark/Light Themes**: Customizable interface themes
- **Interactive Components**: Animated dropdowns, cards, and navigation
- **Accessibility**: WCAG compliant with keyboard navigation

### 🛠️ **Developer Experience**
- **TypeScript**: Full type safety throughout the application
- **Modern Architecture**: Clean, scalable codebase structure
- **Performance Optimized**: Turbopack, image optimization, and lazy loading
- **Error Handling**: Comprehensive error boundaries and logging

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 15.4.3 with App Router
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion 12.23.9
- **Icons**: Tabler Icons React 3.34.1

### **Blockchain**
- **Network**: Internet Computer Protocol (ICP)
- **Wallets**: @dfinity/auth-client, @dfinity/agent
- **Identity**: Internet Identity integration

### **State & Data**
- **State Management**: Zustand 5.0.6
- **Data Fetching**: TanStack Query 5.83.0
- **Charts**: Lightweight Charts 5.0.8
- **Notifications**: Sonner 2.0.6

### **Development**
- **Build Tool**: Turbopack (Next.js 15)
- **Linting**: ESLint 9 with Next.js config
- **Formatting**: Prettier 3.6.2
- **Analytics**: Vercel Analytics & Speed Insights

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or later
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/petrax-nextjs.git
   cd petrax-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

4. **Configure your environment**

   Update `.env.local` with your values:
   ```env
   # ICP Network Configuration
   NEXT_PUBLIC_ICP_NETWORK=mainnet
   NEXT_PUBLIC_ICP_HOST=https://ic0.app
   NEXT_PUBLIC_IDENTITY_PROVIDER=https://identity.ic0.app

   # Canister IDs
   NEXT_PUBLIC_BACKEND_CANISTER_ID=your-backend-canister-id
   NEXT_PUBLIC_LEDGER_CANISTER_ID=your-ledger-canister-id

   # Application Configuration
   NEXT_PUBLIC_APP_NAME=PetraX
   NEXT_PUBLIC_APP_VERSION=1.0.0
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
├── contexts/           # React contexts (Wallet, etc.)
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries and data
├── services/           # API and blockchain services
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🔗 ICP Integration

The platform integrates with the Internet Computer Protocol for:

- **Wallet Connection**: Internet Identity and Plug wallet support
- **Blockchain Transactions**: Secure, decentralized trading
- **Smart Contracts**: Oil contract management on-chain

### Supported Wallets

- Internet Identity
- Plug Wallet
- Stoic Wallet (coming soon)
- Bitfinity Wallet (coming soon)

## 🎨 UI Components

The platform includes custom components:

- **Navbar**: Responsive navigation with wallet integration
- **OilCard**: Display oil contracts with pricing and details
- **Footer**: Site-wide footer with links and information

## 🔧 Configuration

### Environment Variables

- `NEXT_PUBLIC_ICP_NETWORK`: ICP network (local/testnet/mainnet)
- `NEXT_PUBLIC_ICP_HOST`: ICP host URL
- `NEXT_PUBLIC_IDENTITY_PROVIDER`: Internet Identity provider URL
- `NEXT_PUBLIC_BACKEND_CANISTER_ID`: Backend canister ID
- `NEXT_PUBLIC_LEDGER_CANISTER_ID`: Ledger canister ID

### Next.js Configuration

The `next.config.js` file includes:

- Webpack configuration for ICP dependencies
- Image optimization settings
- Security headers
- URL redirects

## 📱 Pages

- **Home** (`/`): Landing page with hero section and features
- **Marketplace** (`/marketplace`): Browse and search oil contracts
- **Trading** (`/trading/[id]`): Individual contract trading interface

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository or contact the development team.

---

Built with ❤️ by the PetraX Team
