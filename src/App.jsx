import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { HomePage } from "./routes/index";
import { LoginPage } from "./routes/login";
import { SignupPage } from "./routes/signup";
function App() {
    return (<ThemeProvider>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignupPage />}/>
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
      <Toaster />
    </ThemeProvider>);
}
export default App;
