import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { fetchLogin } from "../Api/fetchApis";
import Spinner from "../tools/Spinner";
import { Link } from "react-router-dom";
import { LockOpenIcon } from "@heroicons/react/solid";

const inputStyle =
  "w-full h-14 border-gray-200  shadow-myInner shadow-cyan-100 border-2 rounded px-5 outline-none hover:shadow-transparent transition";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [val, setVal] = React.useState({
    email: "",
    password: "",
  });

  const { mutate, isLoading } = useMutation(fetchLogin, {
    retry: 1,
    onError: (error) => {
      if (error.request.status === 429)
        return toast.error("بيش از 3 تلاش ناموفق،لطفا دقايقي ديگر تلاش كنيد");
      if (error.request.status === 404)
        return toast.error("اطلاعات وارد شده صحيح نيست");
    },
    onSuccess: () => {
      toast.success("با موفقيت وارد شديد");
      setVal({
        name: "",
        email: "",
        age: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      });
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
    <div className="flex flex-col">
      <div className="container w-80 mx-auto">
        <div class="relative flex py-5 items-center">
          <div class="flex-grow border-t-2 border-red-500"></div>
          <span class="flex-shrink mx-4 text-gray-600 text-lg">ورود</span>
          <div class="flex-grow border-t-2 border-red-500"></div>
        </div>
      </div>
      <form
        className="flex flex-col p-5 bg-white rounded"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
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
        <div className="my-2 flex flex-col">
          <label htmlFor="email" className="mb-2">
            رمز عبور
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
        <div className="flex my-2">
          <span>
            <Link
              className="flex items-center hover:text-red-500 transition"
              to="/auth/forgotPassword"
            >
              <LockOpenIcon height={20} width={20} />
              فراموشی رمز عبور
            </Link>
          </span>
        </div>
        <div className="my-2">
          <button
            type="submit"
            className="bg-red-600 text-white rounded outline-none py-2 px-6"
          >
            {isLoading ? (
              <Spinner color="white" height="5" width="5" />
            ) : (
              "ورود"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
