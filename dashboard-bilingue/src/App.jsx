import React from "react";
import "./App.css";
import Graph1 from "./components/Graph1";
import Graph2 from "./components/Graph2";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  return (
    <div className="App">
      <h1>{t("title")}</h1>

      {/* Sélecteur de langue centré dans son conteneur */}
      <div className="chart-container">
        <LanguageSwitcher />
      </div>

      <div className="chart-container">
        <Graph1 />
      </div>

      <div className="chart-container">
        <Graph2 />
      </div>
    </div>
  );
}

export default App;
