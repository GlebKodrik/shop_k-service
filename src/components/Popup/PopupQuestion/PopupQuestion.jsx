import s from "./PopupQuestion.module.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cn from "classnames";
import { TextField } from "@material-ui/core";
import {
  descriptionValidation,
  emailValidation,
  nameValidation,
  subjectValidation,
} from "../../../common/validations";

const SignupSchema = yup.object().shape({
  ...emailValidation,
  ...nameValidation,
  ...subjectValidation,
  ...descriptionValidation,
});

export const PopupQuestion = () => {
  const [send, setSend] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
    mode: "onTouched",
  });

  const onSubmit = (values) => {
    console.log(values);
    reset();
    setSend(true);
  };

  return (
    <div className={"popupWrap"}>
      <div className={"popupTitle"}>Обратная связь</div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={s.name}>
          <TextField
            required
            type={"text"}
            label={"Имя"}
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name")}
          />
        </div>
        <div className={s.subject}>
          <TextField
            required
            type={"text"}
            label={"Тема обращения"}
            error={!!errors.subject}
            helperText={errors.subject?.message}
            {...register("subject")}
          />
        </div>
        <div className={s.appeal}>
          <textarea
            className={cn("popupTextarea", {
              textareaError: !!errors.description,
            })}
            autoComplete={"off"}
            {...register("description")}
          />
          <div
            className={cn("subTextarea", {
              subTextareaError: !!errors.description,
            })}
          >
            Сообщение до 2000 символов
          </div>
        </div>

        <div>
          <TextField
            required
            label={"Email"}
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
          />
          <div className={s.subEmail}>Оператор ответит в течение 48 часов</div>
        </div>

        <div className={cn("popupWrapButton", { popupSend: send })}>
          {send && (
            <div className={"popupSendText"}>Заявка успешно отправлена</div>
          )}
          <button className={cn("button", "popupButton")}>Отправить</button>
        </div>
      </form>
    </div>
  );
};
