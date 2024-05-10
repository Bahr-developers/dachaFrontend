import "./DachaCard.css";

import { FiHeart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { IMG_BASE_URL } from "../../constants/img.constants";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../Query/query-keys";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useContext } from "react";
import { LanguageContext } from "../../helper/languageContext";
import { CottageLeng } from "../../configs/language";
import PropTypes from "prop-types";

const DachaCard = (props) => {
  const queryClient = useQueryClient();

  const mainImage = props.cottage.images.find(
    (e) => e.isMainImage === true
  ).image;

  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");

  const refreshToken = localStorage.getItem("refreshToken");

  const handleLike = (id) => {
    if (accessToken && refreshToken) {
      const likedCottage = JSON.parse(localStorage.getItem("liked")) || [];
      const isExist = likedCottage.includes(id);
      if (isExist) {
        const UpdatedLikedArr = likedCottage.filter((item) => item != id);
        localStorage.setItem("liked", JSON.stringify(UpdatedLikedArr));
      } else {
        const updatedLike = [...likedCottage, id];
        localStorage.setItem("liked", JSON.stringify(updatedLike));
      }
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cottages] });
    } else {
      navigate("/sign-in");
    }
  };

  // Language UseState
  const { languageChange } = useContext(LanguageContext);

  return (
    <div className="dacha-card">
      <div className="main-img-head-card">
        <LazyLoadImage
          className="main-img-dacha"
          src={`${IMG_BASE_URL}${mainImage}`}
          width="300"
          height="278"
          alt="dacha"
          effect="blur"
        />

        <div
          className={
            props.cottage.cottageStatus === "progress"
              ? "here-icons-wrap d-none"
              : "here-icons-wrap"
          }
        >
          <div
            onClick={() => handleLike(props?.cottage?.id)}
            className={`dacha-card-like ${
              props.cottage.isLiked ? "dacha-card-like-active" : ""
            }`}
          >
            <FiHeart
              className={`dacha-heart-icon ${
                props.cottage.isLiked ? "dacha-heart-icon-active" : ""
              }`}
            />
          </div>
        </div>
        <p
          className={
            props.cottage.cottageStatus === "progress"
              ? "no-active-text"
              : "no-active-text d-none"
          }
        >
          Не активное
        </p>
        <div
          className={
            props.cottage.cottageStatus === "progress"
              ? "overlay-main-image-card"
              : "overlay-main-image-card d-none"
          }
        ></div>
      </div>
      <div>
        <h5 className="dacha-card-name">{props.cottage.name}</h5>
        <p className="dacha-card-text">
          {props.cottage.region.name} {CottageLeng[languageChange].region}{" "}
          {props.cottage.place.name}
        </p>
        <p className="dacha-card-text">
          {CottageLeng[languageChange].price} {props.cottage.price}$
        </p>
        <p className="dacha-card-text">
          {CottageLeng[languageChange].weekendPrice}{" "}
          {props.cottage.priceWeekend}$
        </p>
      </div>
      <div className="text-center">
        <Link to={`/home/view/${props.cottage.id}`} className="dacha-card-btn">
          {CottageLeng[languageChange].btn}
        </Link>
      </div>
    </div>
  );
};

export default DachaCard;

DachaCard.propTypes = {
  cottage: PropTypes.shape({
    id: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        isMainImage: PropTypes.bool.isRequired,
        image: PropTypes.string.isRequired,
      })
    ).isRequired,
    cottageStatus: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    region: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    place: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    price: PropTypes.number.isRequired,
    priceWeekend: PropTypes.number.isRequired,
  }).isRequired,
};
