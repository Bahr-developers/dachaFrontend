import "./Favorite.css";
import DachaCard from "../../components/DachaCards/DachaCard";
import DachaMiniCard from "../../components/DachaMiniCard/DachaMiniCard";
import { ALL_DATA } from "../../Query/get_all";
import MiniNaw from "../../components/MiniNaw/MiniNaw";
import Loader from "../../components/Loader/Loader";
import BreacdCrumbs from "../../components/BreadCrumbs/BreacdCrumbs";

import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { LanguageContext } from "../../helper/languageContext";
import { fovariteLang } from "../../configs/language";

const Favorite = () => {
  const cottage = ALL_DATA.useCottage();
  const { languageChange } = useContext(LanguageContext);

  const favoriteCottage = cottage?.data?.filter(
    (cottage) => cottage.isLiked === true
  );

  if (cottage.isLoading) return <Loader />;

  return (
    <>
      <Helmet>
        <title>Favorite</title>
        <meta name="description" content="Favorite page" />
        <link rel="canonical" href="/favorite" />
      </Helmet>

      <div className="container">
        <BreacdCrumbs />
        <div className="favorite-cards">
          {favoriteCottage.length ? (
            <>
              {favoriteCottage.map((cottage) => {
                return (
                  <>
                    <DachaCard key={cottage.id} cottage={cottage} />
                  </>
                );
              })}
              {favoriteCottage.map((cottage) => {
                return (
                  <>
                    <DachaMiniCard key={cottage.id} cottage={cottage} />
                  </>
                );
              })}
            </>
          ) : (
            <>
              <div className="noneFavoriteCart border-warning border">
                <p className="emptyText">{fovariteLang[languageChange]}</p>
              </div>
            </>
          )}
        </div>
      </div>
      <MiniNaw />
    </>
  );
};

export default Favorite;
