# Harmony Yield Boost

Built on the [ERC-4626](https://github.com/harmony-one/erc-4626) tokenized vault standard (used by [Yearn V3](https://docs.yearn.fi/partners/yvtokens-as-collateral#v3-vaults-are-erc4626-compatible) and other leading protocols), Yield Boost delivers additional yields for 1sDAI holders through automated compounding.

<table style="text-align: center; width: 100%;"> <tr> <td> Native sDAI Yield<br> <i><small>(MakerDAO's DSR via bridged 1sDAI)</small></i> </td> </tr> <tr> <td style="padding: 10px; font-size: 24px;"> + </td> </tr> <tr> <td> Treasury-Boosted Returns<br> <i><small>(Strategic allocations from treasury yield)</small></i> </td> </tr> </table>

## Overview

<img width="597" alt="image" src="https://github.com/user-attachments/assets/e06569c2-7346-4543-8cf5-2cf04197ed34" />

### Key Features

- 🚀 Enhanced APY through yield boosting
- ✅ Zero effort, auto-compounding
- ⚡ Instant deposits and withdrawals
- 🔒 No lock-up periods
- 💰 No minimum deposit requirements

## Technical Details

### Exchange Rate Mechanism

The core of the yield boost system is based on an exchange rate mechanism:

- Initial rate: 1 boostDAI = 1 1sDAI
- The exchange rate increases over time, generating yield
- Users maintain a constant boostDAI balance while its 1sDAI value grows
- Current APY: 11.8%

### Fees

- Deposit Fee: 0.1%
- Withdrawal Fee: 0.1%

### Smart Contract Integration

The protocol implements the [ERC-4626](https://github.com/harmony-one/erc-4626) Tokenized Vault Standard and integrates with:
- Sky Protocol (MakerDAO) for 1sDAI
- Harmony blockchain for transactions
- Treasury system for additional yield strategies

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
