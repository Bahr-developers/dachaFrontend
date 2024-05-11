import "./Navbar.css";
import Logo from "../../assets/images/logo.svg";
import Menu from "../../assets/images/menu.svg";
import Close from "../../assets/images/close.svg";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import Modal from "react-modal";

import { FiHeart } from "react-icons/fi";
import UserMenu from "../../assets/images/user-menu.svg";
import GoOut from "../../assets/images/go-out.svg";
import UserModal from "../../assets/images/user-modal.svg";
import RedGoOut from "../../assets/images/red-go-out.svg";
import Notification from "../../Modals/Natification";
import { ALL_DATA } from "../../Query/get_all";
import { IMG_BASE_URL } from "../../constants/img.constants";
import {
  MenuLanguage,
  NavLeng,
  NavberLinks,
  exitLang,
} from "../../configs/language";
import { LanguageContext } from "../../helper/languageContext";

Modal.setAppElement("#root");

const Navbar = () => {
  const user = ALL_DATA.useSingleUser()?.data;

  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const defaultLang = localStorage.getItem("language");
  const language = ALL_DATA.useLanguage();

  const cottage = ALL_DATA.useCottage();

  const fovariteCottage =
    cottage?.data?.length &&
    cottage?.data?.filter((e) => e.isLiked === true)?.length;

  const registered = useRef(null);
  const signIn = useRef(null);

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const logoutBtn = () => {
    signIn.current.classList.remove("d-none");
    registered.current.classList.add("d-none");
    localStorage.clear();
    setModalIsOpen(false);
    window.location.reload();
    navigate("/");
  };
  const jumpLink = (e) => {
    window.location = e.target.value;
  };
  const closeModalOverlay = (e) => {
    if (e.target.classList[0] === "overlayMenuActive") {
      setModalIsOpen(false);
    }
  };
  // language change
  const { languageChange, toggleLanguage } = useContext(LanguageContext);

  return (
    <>
      <div onClick={closeModalOverlay} className="container">
        <div className="navbar ">
          <button onClick={() => setModalIsOpen(true)} className="menu">
            <img
              className="menu-img"
              src={Menu}
              width="14"
              height="12"
              alt="menu"
            />
            <p className="menu-text">{MenuLanguage[languageChange]}</p>
          </button>

          {/*  hamburger menu star */}
          <div className={`${modalIsOpen ? "hamburgerClassname" : "d-none"}`}>
            <div
              className={`hamburgerMenu d-flex justify-content-between ${
                modalIsOpen ? "hamburgerMenuActive" : "hamburgerMenuClose"
              }`}
            >
              <button className="close" onClick={() => setModalIsOpen(false)}>
                <img src={Close} width="18.62" height="18.62" alt="close" />
              </button>
              <div className="modal-nav-menu">
                <Link
                  to="tel:+9981002314"
                  className="modal-nav-contact d-black "
                >
                  {NavLeng[languageChange].connection}
                </Link>
                <select
                  defaultValue="socials"
                  className="modal-nav-select-two"
                  name="social"
                  id="social"
                >
                  <option hidden value="socials">
                    {NavLeng[languageChange].set}
                  </option>
                  <option value="telegram">Telegram</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="youtube">Youtube</option>
                </select>

                <select
                  className="modal-nav-select-three"
                  name="language"
                  id="language"
                  onChange={toggleLanguage}
                >
                  {language.data?.length &&
                    language.data.map((e) => {
                      if (e.code === defaultLang) {
                        return (
                          <option key={e.id} selected value={e.code}>
                            {e.code}
                          </option>
                        );
                      }
                      return (
                        <option key={e.id} value={e.code}>
                          {e.code}
                        </option>
                      );
                    })}
                </select>

                <Link
                  to="/sign-in"
                  className={
                    accessToken && refreshToken
                      ? "modal-nav-out d-none"
                      : "modal-nav-out d-block"
                  }
                >
                  {exitLang[1][languageChange]}
                </Link>
                <button
                  onClick={logoutBtn}
                  className={
                    accessToken && refreshToken
                      ? "modal-nav-out"
                      : "modal-nav-out d-none"
                  }
                >
                  <img src={GoOut} alt="" />
                  {exitLang[0][languageChange]}
                </button>
              </div>
            </div>
            <div
              className={`${modalIsOpen ? "overlayMenuActive" : "d-none"}`}
            ></div>
          </div>
          {/*  hamburger menu end */}

          <div className="d-flex align-items-center" style={{ gap: "30px" }}>
            <Link to="/">
              <img
                className="logo"
                src={Logo}
                width="65"
                height="64"
                alt="logo"
              />
            </Link>

            <div className="navs align-items-center">
              <Link to="tel:+9981002314" className="contact d-block ">
                {NavLeng[languageChange].connection}
              </Link>

              <select
                className="select-two form-select"
                name="social"
                id="social"
                onChange={jumpLink}
              >
                <option selected value="socials">
                  {NavLeng[languageChange].set}
                </option>
                <option value="https://t.me/dachi_v_gorax">Telegram</option>
                <option value="https://facebook.com">Facebook</option>
                <option value="https://instagram.com">Instagram</option>
                <option value="https://youtube.com">Youtube</option>
              </select>

              <select
                className="select-three form-select"
                name="language"
                onChange={toggleLanguage}
              >
                {language.data?.length &&
                  language.data.map((e) => {
                    if (e.code === defaultLang) {
                      return (
                        <option key={e.id} selected value={e.code}>
                          {e.code}
                        </option>
                      );
                    }
                    return (
                      <option key={e.id} value={e.code}>
                        {e.code}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="icons">
            <Link to="/home/favorite" className="heart">
              <FiHeart className="heart-icon" />
              <span
                className={fovariteCottage === 0 ? "d-none" : "fovarite-num"}
              >
                {fovariteCottage}
              </span>
            </Link>

            <div className="d-flex align-items-center">
              <Notification />
            </div>

            <Link
              ref={signIn}
              to="/sign-in"
              className={
                accessToken && refreshToken ? "sign-in d-none" : "sign-in"
              }
            >
              {exitLang[1][languageChange]}
            </Link>

            <div className="dropdown">
              <button
                // className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                ref={registered}
                className={accessToken ? "sign-out" : "sign-out d-none"}
              >
                <img src={UserMenu} alt="" />
                <div className="user-nav">
                  <img
                    src={`${IMG_BASE_URL}${user?.image}`}
                    className={user?.image ? "user-nav" : "d-none"}
                    alt=""
                  />
                </div>
              </button>
              <ul className="dropdown-menu userDropdown">
                <div className="user-modal-nav-top">
                  <p className="um-top-gmail">
                    {user?.name?.split(" ")[1] || "user email"}
                  </p>
                  <img
                    src={`${IMG_BASE_URL}${user?.image}`}
                    className={user?.image ? "um-top-img" : "d-none"}
                    alt="userImg"
                  />
                </div>

                <Link
                  to="/home/add-new"
                  className="um-text text-decoration-none"
                >
                  {NavberLinks[languageChange].add}
                </Link>
                <Link
                  to="/home/profile/announcement"
                  className="um-text text-decoration-none mt-2 d-block"
                >
                  {NavberLinks[languageChange].cottage}
                </Link>
                <Link
                  to="/home/profile/services"
                  className="um-text text-decoration-none mt-2 d-block"
                >
                  {NavberLinks[languageChange].services}
                </Link>

                <hr />

                <div className="user-modal-nav-profil">
                  <img src={UserModal} alt="user" />
                  <Link className="um-profil-link" to="/home/profile/user">
                    {NavberLinks[languageChange].profil}
                  </Link>
                </div>

                <Link to="/" className="user-modal-nav-out">
                  <img src={RedGoOut} alt="go-out" />
                  <button onClick={logoutBtn} className="um-out-btn">
                    {NavberLinks[languageChange].exit}
                  </button>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
