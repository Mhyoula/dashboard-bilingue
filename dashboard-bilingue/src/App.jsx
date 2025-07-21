import React from "react";
import "./App.css";
import Graph1 from "./components/Graph1";
import Graph2 from "./components/Graph2";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import logo from "./assets/logoF.png"; // logo importé

function App() {
  const { t } = useTranslation();

  return (
    <div className="App">
      {/* Logo */}
      <img src={logo} alt="FoodBoard Logo" className="logo" />
      <h1>{t("title")}</h1>

      {/* Sélecteur de langue */}
      <div className="chart-container">
        <LanguageSwitcher />
      </div>

      {/* Disposition avec zone graphique à gauche + infos à droite */}
      <div className="dashboard-layout">
        <div className="dashboard-main">
          <div className="chart-container">
            <Graph1 />
          </div>
          <div className="chart-container">
            <Graph2 />
          </div>
        </div>

        <div className="dashboard-sidebar">
          <h2>{t("aboutTitle")}</h2>
          <p>{t("about1")}</p>
          <p>{t("about2")}</p>
          <p>{t("about3")}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
