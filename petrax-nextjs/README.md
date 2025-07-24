# PetraX - Oil Trading Platform

A modern, decentralized oil trading platform built with Next.js and integrated with the Internet Computer Protocol (ICP) blockchain.

## 🚀 Features

- **Decentralized Trading**: Trade oil contracts directly on the blockchain
- **ICP Wallet Integration**: Connect with Internet Identity and Plug wallets
- **Real-time Market Data**: Live oil price feeds and market analytics
- **AI-Powered Insights**: Advanced market analysis and trading recommendations
- **Responsive Design**: Mobile-first approach with beautiful UI
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.3 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Internet Computer Protocol (ICP)
- **State Management**: Zustand
- **Charts**: Lightweight Charts
- **Icons**: React Icons

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd petrax-nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update the environment variables in `.env.local` with your actual values.

## 🚀 Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

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
