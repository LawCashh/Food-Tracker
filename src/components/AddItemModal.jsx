import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { AppContext } from "../App";

function AddItemModal({ isOpen, onClose, title, nutrients }) {
  const { addItemDiary, userInfo, updateUserInfo } = useContext(AppContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!isOpen) return null;

  const todaysDiaryRow = {
    protein: (nutrients.ENERC_KCAL / 4) | 0,
    carbohydrate: nutrients.CHOCDF | 0,
    fat: nutrients.FAT | 0,
    kcal: nutrients.ENERC_KCAL | 0,
  };

  const handleSubmitForm = (data) => {
    const dataObject = {
      name: title,
      protein: ((todaysDiaryRow.protein * data.amount) / 100) | 0,
      carbohydrate: ((todaysDiaryRow.carbohydrate * data.amount) / 100) | 0,
      fat: ((todaysDiaryRow.fat * data.amount) / 100) | 0,
      grams: data.amount,
      kcal: ((todaysDiaryRow.kcal * data.amount) / 100) | 0,
    };
    addItemDiary(dataObject);
    updateUserInfo({
      todaysCalories: userInfo.todaysCalories + dataObject.kcal,
    });
    onClose();
  };

  return (
    <div className="fixed left-0 top-[4rem] z-10 flex h-full w-full items-start justify-center bg-black/40">
      <div
        className="relative my-20 flex h-72 w-[300px] flex-col rounded-[3rem] bg-black/75 font-bold text-white
         xs:w-[400px] s:w-[450px] sm:w-[600px]"
      >
        <p className="mx-10 mt-4 border-b py-4 text-2xl ">
          {title} - Nutrition info per 100g
        </p>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="mx-10 my-5 flex flex-1 flex-col justify-evenly text-base font-normal"
        >
          <label htmlFor="amount" className="mb-2">
            Amount
          </label>
          <div className="">
            <Controller
              name="amount"
              control={control}
              defaultValue={100}
              rules={{
                required: `Can't be empty`,
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
                  id="amount"
                  className="w-36 rounded-sm p-3 text-black focus:outline-gray-500"
                />
              )}
            />
            <span className="mx-5">grams</span>
          </div>
          {errors.amount && (
            <span className="mb-5 text-sm text-red-500">
              {errors.amount.message}
            </span>
          )}
          <button className="self-end rounded-full border border-white px-5 py-2">
            Add to Diary
          </button>
        </form>
        <button
          className="absolute right-[-10px] top-[-50px] h-10 w-10 rounded-[50%] bg-white p-1 text-xl text-black/40"
          onClick={onClose}
        >
          &#10006;
        </button>
      </div>
    </div>
  );
}

export default AddItemModal;
