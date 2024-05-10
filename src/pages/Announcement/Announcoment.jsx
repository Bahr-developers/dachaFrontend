import { Helmet } from "react-helmet-async";
import { ALL_DATA } from "../../Query/get_all";
import BreacdCrumbs from "../../components/BreadCrumbs/BreacdCrumbs";
import DachaCard from "../../components/DachaCards/DachaCard";
import DachaMiniCard from "../../components/DachaMiniCard/DachaMiniCard";
import MiniNaw from "../../components/MiniNaw/MiniNaw";
import "./Announcoment.css";
import { AnnouncementPageLanguage } from "../../configs/language";
import { useContext } from "react";
import { LanguageContext } from "../../helper/languageContext";

function Announcoment() {
  const userCottage = ALL_DATA.useCottageUserId();

  const { languageChange } = useContext(LanguageContext);

  return (
    <>
      <Helmet>
        <title>Announcoment</title>
        <meta name="description" content="Announcoment page" />
        <link rel="canonical" href="/announcoment" />
      </Helmet>
      <div className="announcoment">
        <BreacdCrumbs />
        <div className="container">
          <div className="announcementDacha">
            {userCottage.data && userCottage.data.length ? (
              <>
                <h2 className="m-0 obnavleniya">
                  {AnnouncementPageLanguage.myannouncement[languageChange]}
                </h2>
                <div className="dacha-cards">
                  {userCottage.data?.length &&
                    userCottage.data.map((e) => {
                      console.log(e);
                      return (
                        <DachaCard key={e.id} cottage={e} btn="Подробное" />
                      );
                    })}

                  {userCottage.data?.length &&
                    userCottage.data.map((e) => {
                      return <DachaMiniCard key={e.id} cottage={e} />;
                    })}
                </div>
              </>
            ) : (
              <>
                <div className="border-warning border emptyAnnouncement">
                  <p className="emptyText m-0">
                    {AnnouncementPageLanguage.noAnnouncement[languageChange]}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <MiniNaw />
    </>
  );
}

export default Announcoment;
