import React, { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend
} from "recharts";
import data from "../data/data.json";
import { useTranslation } from "react-i18next";

const Graph1 = () => {
  const { t } = useTranslation();
  const [showRice, setShowRice] = useState(true);
  const [showFish, setShowFish] = useState(true);
  const [currency, setCurrency] = useState("CAD");

  const exchangeRate = 1.45;

  const translatedData = data.products.map(item => {
    const convertedRiz = currency === "CAD" ? item.riz : item.riz / exchangeRate;
    const convertedPoisson = currency === "CAD" ? item.poisson : item.poisson / exchangeRate;

    return {
      ...item,
      month: t(`months.${item.month}`),
      [t("rizLabel")]: parseFloat(convertedRiz.toFixed(2)),
      [t("poissonLabel")]: parseFloat(convertedPoisson.toFixed(2))
    };
  });

  return (
    <div>
      <h2>{t("graph1Title")}</h2>

      <div className="controls">
        <label>
          <input
            type="checkbox"
            checked={showRice}
            onChange={() => setShowRice(!showRice)}
          />{" "}
          {t("rizLabel")}
        </label>

        <label>
          <input
            type="checkbox"
            checked={showFish}
            onChange={() => setShowFish(!showFish)}
          />{" "}
          {t("poissonLabel")}
        </label>

        <label>
          {t("currencyLabel") || "Devise"} :
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="CAD">CAD $</option>
            <option value="EUR">EUR €</option>
          </select>
        </label>
      </div>

      <LineChart width={500} height={300} data={translatedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value) => `${value} ${currency === "CAD" ? "$" : "€"}`} />
        <Legend />
        {showRice && <Line type="monotone" dataKey={t("rizLabel")} stroke="#1e90ff" />}
        {showFish && <Line type="monotone" dataKey={t("poissonLabel")} stroke="#ffa500" />}
      </LineChart>
    </div>
  );
};

export default Graph1;
