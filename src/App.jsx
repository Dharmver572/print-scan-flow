import { Routes, Route, Navigate } from "react-router-dom";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { CustomerUploadPage } from "@/pages/customer/CustomerUploadPage";

import { HomePage } from "./routes/index";
import { LoginPage } from "./routes/login";
import { SignupPage } from "./routes/signup";
import { DashboardPage } from "./routes/dashboard"; 
import { ShopPage } from "./pages/ShopPage";


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/signup"
            element={<SignupPage />}
          />

          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={<DashboardPage />}
            />
          </Route>

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
          <Route
          path="/shop"
          element={<ShopPage />}
        />
        
        <Route
          path="/upload"
          element={<CustomerUploadPage />}
        />


        </Routes>

        

        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;