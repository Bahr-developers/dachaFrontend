import "./Services.css";
import MiniNaw from "../../components/MiniNaw/MiniNaw";
import { Link } from "react-router-dom";
import { ALL_DATA } from "../../Query/get_all";
import { IMG_BASE_URL } from "../../constants/img.constants";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Helmet } from "react-helmet-async";
import BreacdCrumbs from "../../components/BreadCrumbs/BreacdCrumbs";
import Loader from "../../components/Loader/Loader";
import { useContext } from "react";
import { LanguageContext } from "../../helper/languageContext";
import { ServicesPageLanguage } from "../../configs/language";

const Services = () => {
  const services = ALL_DATA.useServices();
  const { languageChange } = useContext(LanguageContext);

  if (services.isLoading) return <Loader />;

  return (
    <>
      <Helmet>
        <title>Services</title>
        <meta name="description" content="Services page" />
        <link rel="canonical" href="/services" />
      </Helmet>

      <div className="container">
        <BreacdCrumbs />
        <h2 className="mt-3">
          {ServicesPageLanguage.mainTitle[languageChange]}
        </h2>
        <div className="services-wrap">
          {services.data?.length &&
            services.data.map((el) => {
              return (
                <div key={el.id} className="services-card">
                  <LazyLoadImage
                    effect="bulr"
                    src={`${IMG_BASE_URL}${el.images[0]}`}
                    alt={el.name}
                    className="services-caer-img"
                  />
                  <h4 className="services-card-name">{el.name}</h4>
                  <p className="services-card-description">{el.description}</p>
                  <Link className="services-card-link" to="/tarif">
                    {ServicesPageLanguage.viewTariff[languageChange]}
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
      <MiniNaw />
    </>
  );
};

export default Services;
