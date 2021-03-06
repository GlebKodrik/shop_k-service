import s from "./Info.module.css";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import { useState } from "react";
import { PopupCallMe } from "../../../Popup/PopupCallMe/PopupCallMe";
import { PopupQuestion } from "../../../Popup/PopupQuestion/PopupQuestion";
import { ModalPopup } from "../../../shared/ModalPopup";

export const Info = () => {
  const [open, setOpen] = useState(false);
  const [popupQues, setPopupQues] = useState(false);

  const handleOpen = () => {
    setPopupQues(false);
    setOpen(true);
  };

  const openPopupQues = () => {
    setPopupQues(true);
    setOpen(true);
  };

  const styleButton = [cn("button", s.button)];
  return (
    <div className={s.contacts}>
      <div className={s.title}>Контакты</div>
      <div className={s.adress}>
        <NavLink to={"/services/location"}>Адрес магазина</NavLink>
      </div>
      <div className={s.wrap_phone}>
        <a href="tel:PHONE_NUM"> +7 (995) 599-31-30</a>
        <PhoneIphoneIcon />
      </div>
      <div className={s.wrap_button}>
        <button className={styleButton} onClick={handleOpen}>
          Позвонить мне
        </button>
        <button className={styleButton} onClick={openPopupQues}>
          Задать вопрос
        </button>
      </div>
      <ModalPopup
        component={!popupQues ? PopupCallMe : PopupQuestion}
        {...{ open, setOpen }}
      />
    </div>
  );
};
