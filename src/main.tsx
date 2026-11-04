import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./context/AuthContext.tsx";
import CartProvider from "./context/CartContext.tsx";
import ErrorBoundary from "./components/ErrorBoundary";
import ThemeProvider from "./context/ThemeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Protect the router, providers, and application from rendering errors */}
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
);