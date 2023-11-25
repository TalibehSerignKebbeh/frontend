import React, {} from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { SaleContextProvider } from "./context/SaleContext";


const client = new QueryClient({
  defaultOptions: { queries: { networkMode: "offlineFirst" } },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>

    <AuthProvider>
    <SaleContextProvider>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </SaleContextProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
