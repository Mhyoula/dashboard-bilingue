import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  return (
    <div className="controls">
      <label>
        {t("selectLanguage")} :
        <select onChange={(e) => i18n.changeLanguage(e.target.value)} value={i18n.language}>
          <option value="fr">🇫🇷 Français</option>
          <option value="en">🇬🇧 English</option>
        </select>
      </label>
    </div>
  );
};

export default LanguageSwitcher;
