import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { store } from "./app/store";
import { Provider, useDispatch } from "react-redux";
import "./style.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import currentUser from "./utils/jwtverify";
import { setCurrentUser } from "./features/authSlice";
import PrivateRoute from "./utils/PrivateRoute";
import axios from "axios";
import Cookies from "js-cookie";
import "moment/locale/tr";

const token = Cookies.get("access_token");

axios.defaults.headers.common["Authorization"] = "Bearer " + token;

const Root = ({ history }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = currentUser();
    if (!user) {
      history.push("/login");
    } else dispatch(setCurrentUser(user.id));
  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/login" name="Giriş" render={(props) => <Login />} />
        <Route
          path="/register"
          name="Kayıt Ol"
          render={(props) => <Register />}
        />
        <PrivateRoute path="/" />
      </Switch>
    </Router>
  );
};
const RootWithRouter = withRouter(Root);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <RootWithRouter />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
