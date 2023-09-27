import React from "react";
import { useTranslation } from "./TranslationProvider";
import bdflag from "./bdflag.png";
import koreaFlag from "./flag.png";

function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();

  const handleLanguageChange = newLocale => {
    setLocale(newLocale);
  };

  return (
    <>
      <div className="mr-[20px]   w-14 h-14">
        <img
          onClick={() => handleLanguageChange("en")}
          src={koreaFlag}
          className="w-full object-cover h-full"
          alt="badge"
        />
      </div>
      <div className="   w-14 h-14">
        <img
          onClick={() => handleLanguageChange("bn")}
          src={bdflag}
          className="w-full object-cover h-full"
          alt="badge"
        />
      </div>
    </>
  );
}

export default LanguageSwitcher;
