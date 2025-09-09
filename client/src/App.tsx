import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import UserLogin from "@/pages/user/login";
import UserRegister from "@/pages/user/register";
import OwnerLogin from "@/pages/owner/login";
import OwnerRegister from "@/pages/owner/register";
import OwnerDashboard from "@/pages/owner/dashboard";
import Vehicles from "@/pages/vehicles";
import CostCalculator from "@/pages/cost-calculator";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { AuthProvider } from "@/context/auth-context"; // ✅ Import AuthProvider

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/user/login" component={UserLogin} />
          <Route path="/user/register" component={UserRegister} />
          <Route path="/owner/login" component={OwnerLogin} />
          <Route path="/owner/register" component={OwnerRegister} />
          <Route path="/owner/dashboard" component={OwnerDashboard} />
          <Route path="/vehicles" component={Vehicles} />
          <Route path="/calculator" component={CostCalculator} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vehicle-booking-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider> {/* ✅ Wrap everything inside AuthProvider */}
            <Toaster />
            <Router />
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
