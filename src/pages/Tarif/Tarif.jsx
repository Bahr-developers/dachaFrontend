import "./Tarif.css";
import Tariff from "../../Modals/Tariff";
import { ALL_DATA } from "../../Query/get_all";

import MiniNaw from "../../components/MiniNaw/MiniNaw";

import { Helmet } from "react-helmet-async";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import { useContext } from "react";
import { LanguageContext } from "../../helper/languageContext";
import { TariffPageLanguage } from "../../configs/language";

const Tarif = () => {
  const tariff = ALL_DATA.useTariff();
  const { languageChange } = useContext(LanguageContext);

  if (tariff.isLoading) return <Loader />;

  return (
    <>
      <Helmet>
        <title>Tariff</title>
        <meta name="description" content="Tariff page" />
        <link rel="canonical" href="/Tariff" />
      </Helmet>
      <div className="container">
        <Navbar />
        <div className="tarif">
          <h2 className="tarif-header font-bold">
            {TariffPageLanguage.mainTitle[languageChange]}
          </h2>

          <div className="tarif-cards wrap-tarif-cards">
            {tariff.data?.length &&
              tariff.data.map((el, i) => {
                return (
                  <div key={el.id} className="tarif-cards">
                    <div className={i >= 3 ? "tarif-card mt-4" : "tarif-card"}>
                      <p className="tarif-name">{el.service.serviceCode}</p>
                      <div className="tarif-date1">
                        {el.days} <br />{" "}
                        {TariffPageLanguage.day[languageChange]}
                      </div>
                      <p className="tarif-text">{el.description}</p>
                      <Tariff tariff={el} id={el.id} />
                    </div>
                    <div
                      className={
                        tariff.data.length === i + 1 || i === 2
                          ? "tarif-line d-none"
                          : "tarif-line"
                      }
                    ></div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <MiniNaw />
      <Footer />
    </>
  );
};

export default Tarif;
