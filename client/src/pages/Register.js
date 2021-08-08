import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { authState, registerUser } from "../features/authSlice";
import { Link, withRouter } from "react-router-dom";
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Lütfen bir isim giriniz.")
    .min(3, "İsiminiz en az 3 karakter içermelidir ")
    .max(30, "İsiminiz en fazla 30 karakter içermelidir"),
  email: yup
    .string()
    .email("Lütfen geçerli bir eposta giriniz")
    .required("Lüften bir eposta giriniz"),
  password: yup
    .string()
    .required("Lütfen bir şifre giriniz.")
    .min(6, "Şifreniz en az 6 karakter içermelidir."),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
const Register = ({ history }) => {
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
    console.log(data);
    dispatch(registerUser(data));
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        className="w-full md:w-5/12 mx-2"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center text-2xl mb-3">Kayıt Ol</h1>
        <div className="mb-4">
          <span className="">İsim</span>
          <small className=" py-1 text-xs ml-3 leading-none">
            {errors.name?.message}
          </small>
          <input
            name="name"
            type="text"
            {...register("name")}
            className="capitalize  focus:outline-none border-b-2 w-full pl-0 p-1 focus:border-b-purple-500"
            placeholder="Adınızı ve soyadınızı giriniz"
          ></input>
        </div>
        <div className="mb-4">
          <span className="">E-posta</span>
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
          <span className="">Şifreniz</span>
          <small className=" py-1 text-xs ml-3 leading-none">
            {errors.password?.message}
          </small>
          <input
            name="password"
            type="password"
            {...register("password")}
            className="focus:outline-none border-b-2 w-full pl-0 p-1 focus:border-b-purple-500"
            placeholder="Lütfen bir şifre giriniz"
          ></input>
          <input
            name="password"
            type="password"
            {...register("passwordConfirmation")}
            className="mt-3 focus:outline-none border-b-2 w-full pl-0 p-1 focus:border-b-purple-500"
            placeholder="Lütfen şifrenizi tekrar giriniz"
          ></input>
        </div>

        <button className="w-full py-2 bg-purple-500 text-white">Gönder</button>
        <Link
          to="/login"
          className="text-center block mt-3 cursor-pointer hover:underline"
        >
          Zaten bir hesabınız varmı ?
        </Link>
      </form>
    </div>
  );
};

export default withRouter(Register);
