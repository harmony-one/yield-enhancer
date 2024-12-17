import { WalletButton } from './WalletButton';
import { Logo } from './Logo';

export function Header() {
  return (
    <div className="w-full border-b border-white/10">
      <div className="max-w-[1400px] mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="text-xl font-semibold">Yield Boost</span>
        </div>
        <WalletButton />
      </div>
    </div>
  );
}