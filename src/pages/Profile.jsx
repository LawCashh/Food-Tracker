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
    <main
      className="flex-1"
      onSubmit={(e) => {
        handleSubmitForm;
      }}
    >
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <label htmlFor="firstname">Firstname</label>
        <Controller
          name="firstname"
          control={control}
          defaultValue={userInfo.firstName}
          rules={{ required: `First name can't be empty` }}
          render={({ field }) => (
            <input {...field} type="text" id="firstname" />
          )}
        />
        {errors.firstname && <span>{errors.firstname.message}</span>}
        <label htmlFor="lastname">Last Name</label>
        <Controller
          name="lastname"
          control={control}
          defaultValue={userInfo.lastName}
          rules={{ required: `Last name can't be empty` }}
          render={({ field }) => <input {...field} type="text" id="lastname" />}
        />
        {errors.lastname && <span>{errors.lastname.message}</span>}
        <label htmlFor="calorieintake">Daily caloric intake</label>
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
            <input {...field} type="text" id="calorieintake" />
          )}
        />
        {errors.calorieintake && <span>{errors.calorieintake.message}</span>}
        <button>Save</button>
      </form>
    </main>
  );
}

export default Profile;
