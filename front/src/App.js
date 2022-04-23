import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Auth from "./components/auth";
import { QueryClientProvider, QueryClient } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
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
