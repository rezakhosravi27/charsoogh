import React from "react";
import Header from "../header";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import Spinner from "../tools/Spinner";
import { fetchForgotPassword } from "../Api/fetchApis";
import { useNavigate } from "react-router-dom";

const inputStyle =
  "w-full h-14 border-gray-200  shadow-myInner shadow-cyan-100 border-2 rounded px-5 outline-none hover:shadow-transparent transition";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [val, setVal] = React.useState({
    email: "",
  });
  const [message, setMessage] = React.useState(false);
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(fetchForgotPassword, {
    retry: 1,
    onError: (error) => {
      if (error.request.status === 429)
        return toast.error("بيش از 3 تلاش ناموفق،لطفا دقايقي ديگر تلاش كنيد");
      if (error.request.status === 404)
        return toast.error("خطا در انجام عمليات");
    },
    onSuccess: () => {
      toast.success("كد فعال سازی به ايميل تان ارسال شد");
      setMessage(true);
    },
  });

  const onSubmit = (data) => {
    const userData = { ...data };
    mutate(userData);
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
      <div className="flex flex-col h-96 w-full justify-center items-center">
        <p className="text-center mb-10">
          رمز عبور خود را فراموش کرده اید؟ لطفا آدرس ایمیل خود را وارد نمایید.
          لینکی برای ایجاد رمز عبور جدید از طریق ایمیل دریافت خواهید کرد.
        </p>
        <div className="w-1/3 bg-white rounded shadow-lg p-5">
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="my-2 flex flex-col">
              <label htmlFor="email" className="mb-2">
                ايميل
              </label>
              <input
                type="email"
                name="email"
                {...register("email", {
                  required: true,
                  pattern: /[a-z0-9]+(.com|.ir|.io)/,
                })}
                className={inputStyle}
                onChange={handleChange}
                value={val.email}
              />
              {errors.email?.type === "pattern" && (
                <span className="text-red-600 mt-2 text-sm">
                  لطفا ايميل معتبر وارد كنيد
                </span>
              )}
              {errors.email?.type === "required" && (
                <span className="text-red-600 mt-2 text-sm">
                  فيلد تكميل نشده است
                </span>
              )}
            </div>
            {message && (
              <span className="my-2 text-green-500 text-sm">
                كد فعال سازی به ايميل تان ارسال شد،لطفا ايميل خود را چك كنيد
              </span>
            )}
            <div className="mt-5">
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
      </div>
    </>
  );
}
