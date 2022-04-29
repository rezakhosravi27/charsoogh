import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { fetchSignUp } from "../Api/fetchApis";
import Spinner from "../tools/Spinner";
import Header from "../header";
import { useParams } from "react-router-dom";
import { fetchResetPassword } from "../Api/fetchApis";

const inputStyle =
  "w-full h-14 border-gray-200  shadow-myInner shadow-cyan-100 border-2 rounded px-5 outline-none hover:shadow-transparent transition focus:bg-white";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [val, setVal] = React.useState({
    password: "",
    confirmPassword: "",
  });
  const params = useParams();

  const { mutate, isLoading } = useMutation(fetchResetPassword, {
    retry: 1,
    onError: (error) => {
      if (error.request.status === 400)
        return toast.error("كاربر قبلا ثبت نام شده است");
      if (error.request.status === 429)
        return toast.error("بيش از 3 تلاش ناموفق،لطفا دقايقي ديگر تلاش كنيد");
      if (error.request.status === 404)
        return toast.error("خطا در انجام عمليات");
      if (error.request.status === 403)
        return toast.error("توكن منقضی شده است");
    },
    onSuccess: () => {
      toast.success("رمز با موفقيت تغيير كرد");
      setVal({
        password: "",
        confirmPassword: "",
      });
    },
  });

  const onSubmit = (data) => {
    const userData = { ...data };
    mutate([userData, params.token]);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setVal({
      ...val,
      [name]: value,
    });
  };

  return (
    <>
      <Header />
      <div className="flex w-full justify-center items-center h-96">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-5 w-1/3 bg-white rounded"
          noValidate
        >
          <div className="my-2 flex flex-col">
            <label htmlFor="password" className="mb-2">
              رمز عبور جديد
            </label>
            <input
              type="password"
              name="password"
              {...register("password", { required: true, minLength: 8 })}
              className={inputStyle}
              onChange={handleChange}
              value={val.password}
            />
            {errors.password?.type === "required" && (
              <span className="text-red-600 mt-2 text-sm">
                فيلد تكميل نشده است
              </span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-600 mt-2 text-sm">
                رمز عبور حداقل بايد 8 رقم باشد
              </span>
            )}
          </div>
          <div className="my-2 flex flex-col">
            <label htmlFor="confirmPassword" className="mb-2">
              تكرار رمز عبور
            </label>
            <input
              type="password"
              name="confirmPassword"
              {...register("confirmPassword", { required: true, minLength: 8 })}
              className={inputStyle}
              onChange={handleChange}
              value={val.confirmPassword}
            />
            {errors.confirmPassword?.type === "required" && (
              <span className="text-red-600 mt-2 text-sm">
                فيلد تكميل نشده است
              </span>
            )}
          </div>
          <div className="my-2">
            <button
              type="submit"
              className="bg-red-600 text-white rounded outline-none py-2 px-6"
            >
              {isLoading ? (
                <Spinner color="white" height="h-5" width="w-5" />
              ) : (
                "ورود"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
