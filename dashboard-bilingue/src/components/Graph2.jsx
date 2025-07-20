import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend
} from "recharts";
import data from "../data/data.json";
import { useTranslation } from "react-i18next";

const Graph2 = () => {
  const { t, i18n } = useTranslation();

  const [period, setPeriod] = useState("all");
  const [currency, setCurrency] = useState("CAD");
  const [unit, setUnit] = useState("kg");

  const exchangeRate = 1.45; // 1 EUR = 1.45 CAD
  const kgToLb = 2.20462;    // 1 kg = 2.20462 lb

  // Données filtrées par période (mois)
  const filteredRaw = {
    all: data.products,
    jan_feb: data.products.filter(d => ["Jan", "Feb"].includes(d.month)),
    feb_mar: data.products.filter(d => ["Feb", "Mar"].includes(d.month))
  };

  // Conversion des valeurs et traduction des mois
  const convertedData = filteredRaw[period].map(item => {
    const rate = currency === "CAD" ? 1 : 1 / exchangeRate;
    const ratio = unit === "kg" ? 1 : 1 / kgToLb;

    const convertedRiz = parseFloat((item.riz * rate / ratio).toFixed(2));
    const convertedPoisson = parseFloat((item.poisson * rate / ratio).toFixed(2));

    return {
      month: t(`months.${item.month}`), // Traduction dynamique des mois
      [t("rizLabel")]: convertedRiz,
      [t("poissonLabel")]: convertedPoisson
    };
  });

  return (
    <div>
      <h2>{t("graph2Title")}</h2>

      {/* Contrôles centrés */}
      <div className="controls">
        <label>
          📅 {t("periodLabel") || "Période"} :
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="all">Jan – Mar</option>
            <option value="jan_feb">Jan – Feb</option>
            <option value="feb_mar">Feb – Mar</option>
          </select>
        </label>

        <label>
          💱 {t("currencyLabel") || "Devise"} :
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="CAD">CAD $</option>
            <option value="EUR">EUR €</option>
          </select>
        </label>

        <label>
          ⚖️ {t("unitLabel") || "Unité"} :
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="kg">kg</option>
            <option value="lb">lb</option>
          </select>
        </label>
      </div>

      {/* Graphe */}
      <BarChart width={500} height={300} data={convertedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value) => `${value} ${currency === "CAD" ? "$" : "€"} / ${unit}`} />
        <Legend />
        <Bar dataKey={t("rizLabel")} fill="#1e90ff" />
        <Bar dataKey={t("poissonLabel")} fill="#ffa500" />
      </BarChart>
    </div>
  );
};

export default Graph2;
