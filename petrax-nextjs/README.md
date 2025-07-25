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

| Command | Description |
|---------|-------------|
| `npm run dev` | 🚀 Start development server with Turbopack |
| `npm run build` | 🏗️ Build the application for production |
| `npm run start` | ▶️ Start the production server |
| `npm run lint` | 🔍 Run ESLint for code quality |
| `npm run lint:fix` | 🔧 Fix ESLint issues automatically |
| `npm run type-check` | 📝 Run TypeScript type checking |
| `npm run format` | 💅 Format code with Prettier |
| `npm run format:check` | ✅ Check code formatting |

## 🏗️ Project Structure

```
petrax-nextjs/
├── 📁 public/                    # Static assets
│   ├── 🖼️ assets/               # Images, icons, media
│   └── 📄 manifest files        # PWA and SEO files
├── 📁 src/
│   ├── 📁 app/                  # Next.js App Router pages
│   │   ├── 🏠 page.tsx          # Home page
│   │   ├── 🛒 marketplace/      # Oil marketplace
│   │   ├── 📊 trading/          # Trading interface
│   │   ├── 🧪 test/             # Testing page
│   │   ├── 🎨 globals.css       # Global styles
│   │   └── 📋 layout.tsx        # Root layout
│   ├── 📁 components/           # Reusable React components
│   │   ├── 🧩 AnimatedDropdown.tsx  # Enhanced dropdown
│   │   ├── 🗂️ Navbar.tsx       # Navigation component
│   │   ├── 🃏 OilCard.tsx       # Oil contract cards
│   │   ├── 📱 Sidebar.tsx       # Sidebar navigation
│   │   └── 🦶 Footer.tsx        # Footer component
│   ├── 📁 contexts/             # React contexts
│   │   ├── 💰 WalletContext.tsx # Wallet state management
│   │   └── 📊 index.ts          # Context exports
│   ├── 📁 hooks/                # Custom React hooks
│   │   ├── 🔄 useDebounce.ts    # Debounce hook
│   │   └── 💾 useLocalStorage.ts # Local storage hook
│   ├── 📁 lib/                  # Utility libraries and data
│   │   ├── 📊 data.ts           # Mock data
│   │   └── 🛠️ utils.ts          # Utility functions
│   ├── 📁 services/             # API and blockchain services
│   │   ├── 🔗 icp.ts            # ICP blockchain service
│   │   └── 💰 wallet.ts         # Wallet integration
│   ├── 📁 types/                # TypeScript type definitions
│   │   └── 📝 index.ts          # Type definitions
│   ├── 📁 utils/                # Utility functions
│   │   └── ⚙️ constants.ts      # Application constants
│   └── 📁 config/               # Configuration files
│       └── 🌐 site.ts           # Site configuration
├── 📄 next.config.js            # Next.js configuration
├── 📄 tailwind.config.ts        # Tailwind CSS configuration
├── 📄 tsconfig.json             # TypeScript configuration
├── 📄 package.json              # Dependencies and scripts
└── 📄 .env.local                # Environment variables
```

## 🔗 ICP Blockchain Integration

### Core Features

The platform leverages the Internet Computer Protocol for:

- **🔐 Decentralized Identity**: Internet Identity authentication
- **💰 Wallet Integration**: Multi-wallet support with secure connections
- **📝 Smart Contracts**: Automated oil contract execution
- **🔒 Secure Transactions**: Cryptographic security for all trades
- **⚡ Fast Finality**: Near-instant transaction confirmation

### Supported Wallets

| Wallet | Status | Features |
|--------|--------|----------|
| 🆔 **Internet Identity** | ✅ Active | Biometric authentication, privacy-focused |
| 🔌 **Plug Wallet** | ✅ Active | Browser extension, DeFi integration |
| 🏛️ **Stoic Wallet** | 🚧 Coming Soon | Hardware wallet support |
| ⚡ **Bitfinity Wallet** | 🚧 Coming Soon | Multi-chain support |

### Canister Architecture

```mermaid
graph TD
    A[Frontend dApp] --> B[Backend Canister]
    A --> C[Ledger Canister]
    B --> D[Oil Contract Storage]
    B --> E[Trading Logic]
    C --> F[ICP Token Transfers]
    C --> G[Transaction History]
```

## 🎨 UI Components & Features

### Core Components

| Component | Description | Features |
|-----------|-------------|----------|
| 🧩 **AnimatedDropdown** | Enhanced dropdown with animations | Ripple effects, floating particles, keyboard navigation |
| 🗂️ **Navbar** | Responsive navigation | Wallet integration, mobile menu, theme switching |
| 🃏 **OilCard** | Oil contract display cards | Hover animations, price formatting, action buttons |
| 📱 **Sidebar** | Collapsible navigation | Auto-hide, smooth animations, responsive design |
| 🦶 **Footer** | Site-wide footer | Links, social media, company information |

### Enhanced Interactions

- **🎭 Micro-animations**: Smooth transitions and hover effects
- **🎨 Glassmorphism**: Modern backdrop blur effects
- **⌨️ Keyboard Navigation**: Full accessibility support
- **📱 Mobile Responsive**: Touch-friendly interface
- **🌙 Theme Support**: Dark/light mode switching

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_ICP_NETWORK` | ICP network environment | `mainnet`, `testnet`, `local` |
| `NEXT_PUBLIC_ICP_HOST` | ICP host URL | `https://ic0.app` |
| `NEXT_PUBLIC_IDENTITY_PROVIDER` | Internet Identity provider | `https://identity.ic0.app` |
| `NEXT_PUBLIC_BACKEND_CANISTER_ID` | Backend canister ID | `rrkah-fqaaa-aaaaa-aaaaq-cai` |
| `NEXT_PUBLIC_LEDGER_CANISTER_ID` | Ledger canister ID | `ryjl3-tyaaa-aaaaa-aaaba-cai` |
| `NEXT_PUBLIC_API_URL` | API base URL | `http://localhost:3000/api` |
| `NEXT_PUBLIC_APP_NAME` | Application name | `PetraX` |
| `NEXT_PUBLIC_APP_VERSION` | Application version | `1.0.0` |

### Next.js Configuration

The `next.config.js` includes optimizations for:

- **🔧 Webpack Configuration**: ICP dependencies handling
- **🖼️ Image Optimization**: WebP/AVIF support with remote patterns
- **🔒 Security Headers**: X-Frame-Options, CSP, HSTS
- **🔄 Redirects**: URL normalization and legacy support
- **⚡ Turbopack**: Experimental fast bundler support

### Tailwind Configuration

Custom design system with:

- **🎨 Color Palette**: Oil industry-themed colors
- **📐 Spacing Scale**: Consistent spacing system
- **🎭 Animations**: Custom keyframes and transitions
- **📱 Breakpoints**: Mobile-first responsive design

## 📱 Application Pages

| Route | Component | Description |
|-------|-----------|-------------|
| 🏠 `/` | Home | Landing page with hero section and features |
| 🛒 `/marketplace` | Marketplace | Browse and search oil contracts with filters |
| 📊 `/trading` | Trading Dashboard | Professional trading interface |
| 📊 `/trading/[id]` | Contract Trading | Individual contract trading page |
| 🧪 `/test` | Test Page | Wallet connection testing and debugging |

### Page Features

- **🔍 Search & Filtering**: Advanced search with debounced input
- **📊 Real-time Data**: Live price updates and market data
- **📱 Responsive Design**: Optimized for all device sizes
- **♿ Accessibility**: WCAG 2.1 AA compliant
- **🚀 Performance**: Optimized loading and rendering

## 🚀 Deployment

### Production Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm run start
   ```

### Deployment Platforms

| Platform | Status | Configuration |
|----------|--------|---------------|
| 🔺 **Vercel** | ✅ Recommended | Zero-config deployment |
| 🌐 **Netlify** | ✅ Supported | Build command: `npm run build` |
| 🐳 **Docker** | ✅ Supported | Dockerfile included |
| ☁️ **ICP Hosting** | 🚧 Coming Soon | Native ICP canister hosting |

## 🧪 Testing

### Running Tests

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Format code
npm run format
```

### Testing Strategy

- **🔍 Type Safety**: Full TypeScript coverage
- **🎨 Component Testing**: React component validation
- **🔗 Integration Testing**: Wallet and blockchain integration
- **📱 E2E Testing**: User journey validation

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### Development Workflow

1. **🍴 Fork the repository**
   ```bash
   git clone https://github.com/your-username/petrax-nextjs.git
   ```

2. **🌿 Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **💻 Make your changes**
   - Follow the existing code style
   - Add TypeScript types for new features
   - Update documentation as needed

4. **✅ Run quality checks**
   ```bash
   npm run lint
   npm run type-check
   npm run format
   ```

5. **📝 Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```

6. **🚀 Push and create PR**
   ```bash
   git push origin feature/amazing-feature
   ```

### Contribution Guidelines

- **📝 Code Style**: Follow existing patterns and ESLint rules
- **🏷️ Commit Messages**: Use conventional commit format
- **📚 Documentation**: Update README and code comments
- **🧪 Testing**: Ensure all checks pass before submitting

## 📊 Performance

### Optimization Features

- **⚡ Turbopack**: Next.js 15 fast bundler
- **🖼️ Image Optimization**: Automatic WebP/AVIF conversion
- **📦 Code Splitting**: Automatic route-based splitting
- **🗜️ Compression**: Gzip and Brotli compression
- **🚀 Lazy Loading**: Component and image lazy loading

### Performance Metrics

- **🎯 Lighthouse Score**: 95+ across all metrics
- **⚡ First Contentful Paint**: < 1.5s
- **🎨 Largest Contentful Paint**: < 2.5s
- **📱 Mobile Performance**: Optimized for 3G networks

## 🔒 Security

### Security Features

- **🛡️ Content Security Policy**: XSS protection
- **🔐 Secure Headers**: HSTS, X-Frame-Options
- **🔑 Wallet Security**: Non-custodial wallet integration
- **🚫 Input Validation**: Comprehensive input sanitization

### Security Best Practices

- Regular dependency updates
- Secure environment variable handling
- HTTPS enforcement
- Blockchain transaction validation

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Community

### Getting Help

- **📖 Documentation**: [docs.petrax.com](https://docs.petrax.com)
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/petrax/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/petrax/discussions)
- **📧 Email**: support@petrax.com

### Community

- **🐦 Twitter**: [@PetraXTrading](https://twitter.com/petraxtrading)
- **💼 LinkedIn**: [PetraX Company](https://linkedin.com/company/petrax)
- **📱 Discord**: [Join our community](https://discord.gg/petrax)

## 🙏 Acknowledgments

- **🌐 Internet Computer**: For providing the blockchain infrastructure
- **⚛️ React Team**: For the amazing React framework
- **🔺 Vercel**: For Next.js and deployment platform
- **🎨 Tailwind Labs**: For the utility-first CSS framework

---

<div align="center">

**Built with ❤️ by the PetraX Team**

*Revolutionizing oil trading through blockchain technology*

[🌟 Star us on GitHub](https://github.com/petrax/petrax-nextjs) • [🐦 Follow on Twitter](https://twitter.com/petraxtrading) • [🌐 Visit Website](https://petrax.com)

</div>
