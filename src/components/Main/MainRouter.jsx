import { Route, Switch } from "react-router-dom";
import { NotFound } from "../NotFould/NotFound";
import { Main } from "./Main";
import { ProfileRoute } from "../Profile/ProfileRoute";
import { PrivateRouter } from "../Route/PrivateRouter";
import s from "./Main.module.css";
import { ServicesRouter } from "../Footer/Information/Menu/Services/ServicesRouter";
import { CategoryRouter } from "./Categories/CategoryRouter";

export const MainRouter = () => {
  return (
    <>
      <div className="container">
        <div className={s.wrapper}>
          <Switch>
            <PrivateRouter path="/profile" component={ProfileRoute} />
            <Route exact path="/" render={() => <Main />} />
            <Route path="/services" render={() => <ServicesRouter />} />
            <Route path="/category" render={() => <CategoryRouter />} />
            <Route path="*" render={() => <NotFound />} />
          </Switch>
        </div>
      </div>
    </>
  );
};