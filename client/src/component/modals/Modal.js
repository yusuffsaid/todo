import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "../../routes";
import ModalTemplate from "./ModalTemplate";
const Modal = () => {
  const loading = <div>asd</div>;
  return (
    <Suspense fallback={loading}>
      <Switch>
        {routes.map((route, idx) => {
          return (
            route.component && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={(props) => (
                  <ModalTemplate>
                    <route.component {...props} />
                  </ModalTemplate>
                )}
              />
            )
          );
        })}
        <Redirect from="/" to="/" />
      </Switch>
    </Suspense>
  );
};

export default Modal;
