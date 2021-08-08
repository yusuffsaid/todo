import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import TheLayout from "../component/TheLayout";
import { authState } from "../features/authSlice";
import Loading from "./Loading";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, isLoading } = useSelector(authState);
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <TheLayout {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
