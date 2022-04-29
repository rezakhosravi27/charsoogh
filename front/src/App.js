import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Auth from "./components/auth";
import { QueryClientProvider, QueryClient } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/*" element={<Home />} />

        {/* auth routes */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/forgotPassword" element={<ForgotPassword />} />
        <Route path="/auth/forgotPassword/:token" element={<ResetPassword />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </QueryClientProvider>
  );
}

export default App;
