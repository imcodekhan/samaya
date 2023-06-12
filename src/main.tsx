import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./Pages/Dashboard";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Dashboard />
    </MantineProvider>
  </React.StrictMode>
);
