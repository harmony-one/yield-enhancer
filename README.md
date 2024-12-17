# Harmony Yield Boost

A modern DeFi application that enables users to boost their yield on 1sDAI deposits through an innovative exchange rate mechanism.

<img width="597" alt="image" src="https://github.com/user-attachments/assets/e06569c2-7346-4543-8cf5-2cf04197ed34" />

## Overview

Harmony Yield Boost is a decentralized finance application that allows users to enhance their yield returns on 1sDAI deposits. The protocol works by converting 1sDAI to boostDAI at a dynamic exchange rate that increases over time, effectively generating additional yield for users.

### Key Features

- 🚀 Enhanced APY through yield boosting mechanism
- 💱 Dynamic exchange rate system
- ⚡ Instant deposits and withdrawals
- 🔒 No lock-up periods
- 💰 No minimum deposit requirements
- 📈 Transparent yield tracking

## Technical Details

### Exchange Rate Mechanism

The core of the yield boost system is based on an exchange rate mechanism:

- Initial rate: 1 boostDAI = 1.05 1sDAI
- The exchange rate increases over time, generating yield
- Users maintain a constant boostDAI balance while its 1sDAI value grows
- Current APY: 11.8%

### Fees

- Deposit Fee: 0.1%
- Withdrawal Fee: 0.1%

### Smart Contract Integration

The protocol integrates with:
- Sky Protocol (MakerDAO) for 1sDAI
- Harmony blockchain for transactions
- Treasury system for yield distribution

## Development

### Prerequisites

```bash
node >= 18.0.0
npm >= 8.0.0
```

### Installation

```bash
# Clone the repository
git clone https://github.com/harmony/yield-boost.git

# Install dependencies
cd yield-boost
npm install

# Start development server
npm run dev
```

### Project Structure

```
src/
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   └── theme/         # Theme configuration
├── hooks/             # Custom React hooks
├── lib/              # Utility functions and constants
└── types/            # TypeScript type definitions
```

### Key Components

- `YieldBoost`: Main application component
- `useYieldBoost`: Core hook managing yield boost logic
- `BalanceCard`: Displays user balances and APY
- `YieldTabs`: Handles deposit/withdraw interactions

### Environment Variables

```env
VITE_RPC_URL=https://api.harmony.one
VITE_CHAIN_ID=1666600000
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing

```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e
```

## Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

### Frontend Stack

- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- shadcn/ui for components
- Lucide React for icons

### State Management

- React hooks for local state
- Custom hooks for business logic
- Context for global state

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
