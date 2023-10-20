import { useContext } from "react";
import { AppContext } from "../App";
import { Controller, useForm } from "react-hook-form";

function Profile() {
  const { userInfo, updateUserInfo } = useContext(AppContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitForm = (data) => {
    const dataObject = {
      firstName: data.firstname,
      lastName: data.lastname,
      dailyCalories: data.calorieintake,
    };
    updateUserInfo(dataObject);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        ...dataObject,
        todaysCalories: userInfo.todaysCalories,
      }),
    );
  };

  return (
    <main className="flex flex-1 flex-col">
      <h1 className="ml-10 mt-7 text-lg font-bold text-slate-700">
        MY PROFILE
      </h1>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="xs:w-80 ml-10 mt-10 flex w-60 flex-col justify-between sm:w-[26rem]"
      >
        <label htmlFor="firstname" className="my-2 text-sm text-gray-800">
          Firstname
        </label>
        <Controller
          name="firstname"
          control={control}
          defaultValue={userInfo.firstName}
          rules={{ required: `First name can't be empty` }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              id="firstname"
              className="border border-gray-600 p-3 text-sm text-blue-800 focus:outline-blue-800"
            />
          )}
        />
        {errors.firstname && (
          <span className="mb-5 text-sm text-red-500">
            {errors.firstname.message}
          </span>
        )}
        <label htmlFor="lastname" className="my-2 text-sm text-gray-800">
          Last Name
        </label>
        <Controller
          name="lastname"
          control={control}
          defaultValue={userInfo.lastName}
          rules={{ required: `Last name can't be empty` }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              id="lastname"
              className=" border border-gray-600 p-3 text-sm text-blue-800 focus:outline-blue-800"
            />
          )}
        />
        {errors.lastname && (
          <span className="mb-5 text-sm text-red-500">
            {errors.lastname.message}
          </span>
        )}
        <label htmlFor="calorieintake" className="my-2 text-sm text-gray-800">
          Daily caloric intake
        </label>
        <Controller
          name="calorieintake"
          control={control}
          defaultValue={userInfo.dailyCalories}
          rules={{
            required: `Calories must be a number`,
            validate: {
              nonZero: (value) => {
                if (!value || isNaN(value) || value <= 0) {
                  return "Enter a non-zero number";
                }
                return true;
              },
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              id="calorieintake"
              className=" border border-gray-600 p-3 text-sm text-blue-800 focus:outline-blue-800"
            />
          )}
        />
        {errors.calorieintake && (
          <span className="mb-5 text-sm text-red-500">
            {errors.calorieintake.message}
          </span>
        )}
        <button className="w-[6.5rem] self-end rounded-sm border border-slate-700 bg-white px-5 py-[0.4rem] text-sm text-slate-700">
          Save
        </button>
      </form>
    </main>
  );
}

export default Profile;
