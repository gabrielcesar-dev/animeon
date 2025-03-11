import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client";
import { client } from "./config/apollo.ts";
import LenisProvider from "./components/LenisProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <LenisProvider>
      <App />
    </LenisProvider>
  </ApolloProvider>
);
