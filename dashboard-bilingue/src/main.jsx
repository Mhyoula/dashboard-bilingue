import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "./i18n/translations";

i18n
  .use(initReactI18next)
  .init({
    resources: translations,
    lng: "en",
    interpolation: { escapeValue: false }
  });

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
