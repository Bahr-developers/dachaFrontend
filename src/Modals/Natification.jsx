import Bell from "../assets/images/bell.svg";
import MiniBell from "../assets/images/mini-bell.svg";
import "./modal.css";
import { ALL_DATA } from "../Query/get_all";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../Query/query-keys";
import { notificationUtils } from "../utils/notification.utilis";

import { IoMdDoneAll } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../helper/languageContext";
import { notificationLang } from "../configs/language";

function Natification() {
  const querClient = useQueryClient();
  const user = JSON.parse(localStorage.getItem("user")) || undefined;
  const location = useLocation();
  const notification = ALL_DATA.useNotificationUser(user?.id)?.data;
  const { languageChange } = useContext(LanguageContext);
  const notifications = notification?.filter((notif) => notif.status === "new");

  // edit Notification
  const editNotificationById = useMutation({
    mutationFn: notificationUtils.patchNatification,
    onSuccess: () => {
      querClient.invalidateQueries({ queryKey: [QUERY_KEYS.notification] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  // read by id
  const handleRead = (id) => {
    editNotificationById.mutate({
      watchedUserId: user?.id,
      id: id,
      status: "seen",
    });
  };

  return (
    <>
      <button
        className="btn notificationsBtn"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        <div
          className="bell"
          style={
            location?.pathname === "/" || location?.pathname === "/home"
              ? { marginRight: "20px" }
              : { marginRight: "0" }
          }
        >
          <img
            className="minibell-img"
            src={MiniBell}
            width="14.77"
            height="16.88"
            alt="bell"
          />
          <img
            className="bell-img"
            src={Bell}
            width="26.25"
            height="30"
            alt="bell"
          />
        </div>
        <p
          style={
            location?.pathname === "/" || location?.pathname === "/home"
              ? { right: "28px" }
              : { right: "5px" }
          }
          className={`m-0 ${
            notifications?.length > 0 ? "notifLength" : "d-none"
          }`}
        >
          {notifications?.length > 0 ? notifications.length : ""}
        </p>
      </button>
      <div
        className="modal  fade modal-natif"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-natif-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {notificationLang[languageChange]}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {notification?.length &&
                notification.map((mes) => {
                  const time = mes?.createdAt.split("T");
                  return (
                    <div
                      className="d-flex justify-content-between  align-items-center"
                      key={mes.id}
                    >
                      <div className="w-100">
                        <p>{mes.message}</p>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center gap-1">
                            <p className="NotificationTime m-0 text-secondary">
                              {time["0"]}
                            </p>
                            <p className="NotificationTime m-0 text-secondary">
                              {time["1"].slice(0, 5)}
                            </p>
                          </div>
                          <div className="d-flex align-items-center gap-1">
                            <button
                              className={`${
                                mes.status === "new" ? "notifBtn" : "d-none"
                              }`}
                              onClick={() => handleRead(mes.id)}
                            >
                              <IoMdDoneAll size={23} />
                            </button>
                            <span
                              className={`text-secondary ${
                                mes.status === "new" ? "d-none" : ""
                              }`}
                            >
                              <IoMdDoneAll size={23} />
                            </span>
                            {mes.type === "personal" ? (
                              <span className="pesonal-notif btn text-white d-block btn-sm btn-success">
                                {mes.type}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <hr />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Natification;
