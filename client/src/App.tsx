import YieldBoost from "@/components/YieldBoost";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="harmony-theme">
      <YieldBoost />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;