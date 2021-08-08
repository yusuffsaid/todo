import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { authState, loginUser, setLoading } from "../features/authSlice";
import { Link, withRouter } from "react-router-dom";
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Lütfen geçerli bir eposta giriniz")
    .required("Lüften bir eposta giriniz"),
  password: yup.string().required("Lütfen bir şifre giriniz."),
});
const Login = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(authState);
  useEffect(() => {
    if (user) {
      return history.push("/");
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data, e) => {
    e.preventDefault();
    dispatch(loginUser(data));
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-5/12 mx-2"
        autoComplete="off"
      >
        <h1 className="text-center text-2xl mb-3">Giriş Yap</h1>
        <div className="mb-4">
          <span className="">Email</span>
          <small className=" py-1 text-xs ml-3 leading-none">
            {errors.email?.message}
          </small>
          <input
            name="email"
            type="text"
            {...register("email")}
            className="focus:outline-none border-b-2 w-full pl-0 p-1 focus:border-b-purple-500"
            placeholder="Eposta adresinizi giriniz"
          ></input>
        </div>
        <div className="mb-4">
          <span className="">Şifre</span>
          <small className=" py-1 text-xs ml-3 leading-none">
            {errors.password?.message}
          </small>
          <input
            name="password"
            type="password"
            {...register("password")}
            className="focus:outline-none border-b-2 w-full pl-0 p-1 focus:border-b-purple-500"
            placeholder="Şifrenizi giriniz"
          ></input>
        </div>

        <button className="w-full py-2 bg-purple-500 text-white">Gönder</button>
        <Link
          to="/register"
          className="text-center block mt-3 cursor-pointer hover:underline"
        >
          Hesabın yok mu ?
        </Link>
      </form>
    </div>
  );
};

export default withRouter(Login);
