import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { fetchSignUp } from "../Api/fetchApis";
import Spinner from "../tools/Spinner";

const inputStyle =
  "w-full h-14 border-gray-200  shadow-myInner shadow-cyan-100 border-2 rounded px-5 outline-none hover:shadow-transparent transition focus:bg-white";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [val, setVal] = React.useState({
    name: "",
    email: "",
    age: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const { mutate, isLoading } = useMutation(fetchSignUp, {
    retry: 1,
    onError: (error) => {
      if (error.request.status === 400)
        return toast.error("كاربر قبلا ثبت نام شده است");
      if (error.request.status === 429)
        return toast.error("بيش از 3 تلاش ناموفق،لطفا دقايقي ديگر تلاش كنيد");
      if (error.request.status === 404)
        return toast.error("اطلاعات وارد شده صحيح نيست");
    },
    onSuccess: () => {
      toast.success("كاربر با موفقيت ثبت شد");
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
          <span class="flex-shrink mx-4 text-gray-600 text-lg">ثبت نام</span>
          <div class="flex-grow border-t-2 border-red-500"></div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-5 bg-white rounded"
        noValidate
      >
        <div className="my-2 flex flex-col">
          <label htmlFor="name" className="mb-2">
            نام و نام خانوادگی
          </label>
          <input
            type="text"
            name="name"
            {...register("name", { required: true })}
            className={inputStyle}
            onChange={handleChange}
            value={val.name}
          />
          {errors.name?.type === "required" && (
            <span className="text-red-600 mt-2 text-sm">
              فيلد تكميل نشده است
            </span>
          )}
        </div>
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
          <label htmlFor="phoneNumber" className="mb-2">
            شماره موبايل
          </label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="مثال:‌ 09902222222"
            maxLength="13"
            {...register("phoneNumber", {
              required: true,
              minLength: 11,
              maxLength: 13,
              pattern:
                /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4|9]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/gi,
            })}
            className={inputStyle}
            onChange={handleChange}
            value={val.phoneNumber}
          />
          {errors.phoneNumber?.type === "pattern" && (
            <span className="text-red-600 mt-2 text-sm">
              لطفا شماره معتبر وارد كنيد
            </span>
          )}
          {errors.phoneNumber?.type === "required" && (
            <span className="text-red-600 mt-2 text-sm">
              فيلد تكميل نشده است
            </span>
          )}
          {errors.phoneNumber?.type === "maxLength" && (
            <span className="text-red-600 mt-2 text-sm">
              شماره موبايل حداكثر ميتواند 11 رقم باشد
            </span>
          )}
        </div>
        <div className="my-2 flex flex-col">
          <label htmlFor="age" className="mb-2">
            سن
          </label>
          <input
            type="number"
            name="age"
            {...register("age", { required: true })}
            className={inputStyle}
            onChange={handleChange}
            value={val.age}
          />
          {errors.age?.type === "required" && (
            <span className="text-red-600 mt-2 text-sm">
              فيلد تكميل نشده است
            </span>
          )}
        </div>
        <div className="my-2 flex flex-col">
          <label htmlFor="password" className="mb-2">
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
  );
}
