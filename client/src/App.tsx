import YieldBoost from "@/components/YieldBoost";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import {Web3Provider} from "@/providers/Web3Provider.tsx";

function App() {
  return (
    <Web3Provider>
      <ThemeProvider defaultTheme="dark" storageKey="harmony-theme">
        <YieldBoost />
        <Toaster />
      </ThemeProvider>
    </Web3Provider>
  );
}

export default App;
