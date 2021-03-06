import s from "./Basket.module.css";
import { useDispatch, useSelector } from "react-redux";
import { BasketItem } from "./BasketItem/BasketItem";
import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { ModalPopup } from "../../../shared/ModalPopup";
import { PopupBuy } from "../../../Popup/PopupBuy/PopupBuy";
import { removeBasket } from "../../../../redux/basketReducer";
import cn from "classnames";
import Loader from "../../../shared/Loader/Loader";
import {
  clearBoxProduct,
  getProducts,
} from "../../../../redux/productsReducer";
import { NavLink } from "react-router-dom";

export const Basket = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket.basket);
  const auth = useSelector((state) => state.auth.isAuth);
  const boxProduct = useSelector((state) => state.products.boxProduct);
  const isFetching = useSelector((state) => state.products.isFetching);

  useEffect(() => {
    if (basket.length) {
      basket.map((el) => dispatch(getProducts(el.id)));
    }
    localStorage.setItem("basket", JSON.stringify(basket));
    return () => {
      dispatch(clearBoxProduct());
    };
  }, [basket, dispatch]);

  const clickDelete = () => {
    basket.map((el) => dispatch(removeBasket(el.id)));
  };

  if (isFetching) {
    return <Loader />;
  }
  const sum = boxProduct.reduce((sum, n) => sum + n?.price, 0);

  return (
    <div className={"container"}>
      {basket.length ? (
        <div className={s.wrap}>
          <div className={s.total}>
            <div className={s.totalText}>
              Итого: {basket.length} товара на {sum} ₽
            </div>
          </div>
          <div className={s.delete}>
            <span onClick={clickDelete} className={s.deleteAll}>
              Очистить корзину
            </span>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
            >
              Оформить заказ
            </Button>
            <ModalPopup
              component={PopupBuy}
              {...{ open, setOpen }}
              basket={basket}
            />
          </div>
          <div className={cn(s.block, { [s.scroll]: basket.length > 5 })}>
            {boxProduct.map((el) => {
              return <BasketItem key={el._id} {...{ auth }} product={el} />;
            })}
          </div>
        </div>
      ) : (
        <div className={s.notBasket}>
          <div className={s.title}>В вашей корзине пока ничего нет</div>
          <div className={s.subTitle}>
            Корзина ждет, что ее наполнят. Желаем приятных покупок!
          </div>
          <NavLink to={"/"}>
            <Button variant="outlined" color="primary">
              Главная
            </Button>
          </NavLink>
        </div>
      )}
    </div>
  );
};
