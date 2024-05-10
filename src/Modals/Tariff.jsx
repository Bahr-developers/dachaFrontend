import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useRef, useState } from "react";
import { TariffUtils } from "../utils/tariff.utilis";
import { QUERY_KEYS } from "../Query/query-keys";
import toastify from "../utils/toastify";
import { ALL_DATA } from "../Query/get_all";
import { TariffPageLanguage } from "../configs/language";
import { LanguageContext } from "../helper/languageContext";
import PropTypes from "prop-types";

const Tariff = (props) => {
  const userCottage = ALL_DATA.useCottageUserId();
  const singleUser = ALL_DATA.useSingleUser()?.data;
  const [isOpen, setIsOpen] = useState(false);
  const activete = useRef();
  const queryClient = useQueryClient();

  const addCottage = useMutation({
    mutationFn: TariffUtils.addTariffActive,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.tariff] });
      toastify.successMessage("Muvaffaqiyatli ulandi");
      setIsOpen(false);
    },
    onError: (err) => {
      toastify.errorMessage(err.response.data.message.message);
      console.error(err);
    },
  });

  const handleCottage = (e) => {
    e.preventDefault();
    addCottage.mutate({
      cottageId: e.target.tariff_cottage.value,
      tariffId: props.tariff.id,
      assignedBy: singleUser.id,
    });
    activete.current.classList.remove("disabled");
  };

  const closeModalTarifOutline = (e) => {
    if (e.target.classList[0] === "modal-wrap") {
      setIsOpen(false);
    }
  };

  const { languageChange } = useContext(LanguageContext);

  return (
    <div onClick={closeModalTarifOutline}>
      <button
        className="tarif-btn border-0"
        onClick={() => setIsOpen(true)}
        type="button"
        data-bs-target={`#editCottageModal${props.id}`}
      >
        {TariffPageLanguage.active[languageChange]} {props.tariff.price}$
      </button>

      <div
        className={isOpen ? "" : "d-none"}
        id={`editCottageModal${props.id}`}
        tabIndex="-1"
        aria-labelledby={`editCottageModal${props.id}Label`}
        aria-hidden="true"
      >
        <span className="modal-wrap"></span>
        <div className="tariff-modal-wrap modal-dialog text-light p-3">
          <div className="modal-content">
            <div className="tarif-modal-head justify-content-between py-2 align-items-lg-start  px-1  d-flex">
              <h2
                id={`editCottageModal${props.id}Label`}
                className="text-light fs-1"
              >
                {TariffPageLanguage.mainTitle[languageChange]}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="close-btn-modal btn d-block"
              >
                <i className="bx fs-1 link-light  bx-x"></i>
              </button>
              <div className="tarif-info text-light mt-5 ">
                <p className="tarif-day bg-light text-center text-dark fs-2 mx-auto rounded-5 w-50">
                  {props.tariff.days} {TariffPageLanguage.day[languageChange]}
                </p>
                <p className="fs-5 fw-bold text-center w-75 ">
                  {TariffPageLanguage.price[languageChange]}:{" "}
                  {props.tariff.price}$
                </p>
              </div>
            </div>
            <hr className="text-light" />
            <h5 className="px-3">
              {TariffPageLanguage.selectCottage[languageChange]}
            </h5>
            <form onSubmit={handleCottage}>
              <select
                onChange={() => activete.current.classList.remove("disabled")}
                defaultValue="default"
                name="tariff_cottage"
                className="mb-3 w-100 w-lg-50  mx-auto  form-select form-select-sm mt-3"
              >
                <option value="default" selected>
                  {TariffPageLanguage.selectCottage[languageChange]}
                </option>
                {userCottage.data?.length &&
                  userCottage.data.map((el) => {
                    return (
                      <option key={el.id} value={el.id} className="">
                        {el.name}
                      </option>
                    );
                  })}
              </select>
              <button
                type="submit"
                ref={activete}
                className="btn disabled btn-success w-50  mx-auto d-block fw-bold "
              >
                {TariffPageLanguage.Activite[languageChange]}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Corrected PropTypes definition
Tariff.propTypes = {
  tariff: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

export default Tariff;
