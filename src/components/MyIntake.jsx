import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { Chart } from "react-google-charts";

function MyIntake() {
  const { userInfo, todaysDiary } = useContext(AppContext);
  const [totals, setTotals] = useState({
    totalProtein: 0,
    totalCarbohydrate: 0,
    totalFat: 0,
    totalGrams: 0,
  });

  const data = [
    ["Nutritions", "in grams"],
    ["Carbs", totals.totalCarbohydrate],
    ["Fat", totals.totalFat],
    ["Protein", totals.totalProtein],
  ];

  const options = {
    legend: "none",
    pieSliceText: "label",
    slices: { 0: { offset: 0.1 }, 1: { offset: 0.1 }, 2: { offset: 0.1 } },
    colors: ["black", "black", "black"],
  };

  useEffect(() => {
    if (todaysDiary != [])
      setTotals(
        todaysDiary.reduce(
          (accumulator, currentItem) => {
            accumulator.totalProtein += currentItem.protein;
            accumulator.totalCarbohydrate += currentItem.carbohydrate;
            accumulator.totalFat += currentItem.fat;
            accumulator.totalGrams += currentItem.grams;
            return accumulator;
          },
          {
            totalProtein: 0,
            totalCarbohydrate: 0,
            totalFat: 0,
            totalGrams: 0,
          },
        ),
      );
  }, [todaysDiary]);

  return (
    <div className="flex w-[100%] flex-col items-center s:my-5 s:w-[50%]">
      <h1 className="w-full text-center text-2xl s:border-l s:border-black">
        My intake
      </h1>
      <div className="w-full s:border-l s:border-black">
        <Chart
          chartType="PieChart"
          data={data}
          width={"100%"}
          height={"300px"}
          options={options}
        />
      </div>
      <span className="w-full text-center font-bold">
        {`${userInfo.todaysCalories}/${userInfo.dailyCalories}`} kcal
      </span>
      <div className="my-2 grid grid-cols-2 grid-rows-3 gap-x-16">
        <span>Protein</span>
        <span>{totals.totalProtein}g</span>
        <span>Carbs</span>
        <span>{totals.totalCarbohydrate}g</span>
        <span>Fat</span>
        <span>{totals.totalFat}g</span>
      </div>
    </div>
  );
}

export default MyIntake;
