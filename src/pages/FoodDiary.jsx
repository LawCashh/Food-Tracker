import { useContext } from "react";
import { AppContext } from "../App";

function FoodDiary() {
  const { todaysDiary, removeItemDiary, userInfo } = useContext(AppContext);
  //treba momenat da se ucita todaysDiary sa [] na elemente

  return (
    <main className="flex-1">
      <table className="mx-auto my-20 ">
        <thead className="bg-cyan-500">
          <tr className="text-white">
            <th className="border-gray border-[0.5px] px-2 text-xs xs:text-sm s:px-3 s:py-2 s:text-base sm:px-5 sm:py-3 md:px-8 md:py-4">
              Name
            </th>
            <th className="border-gray border-[0.5px] px-2 text-xs xs:text-sm s:px-3 s:py-2 s:text-base sm:px-5 sm:py-3 md:px-8 md:py-4">
              Protein
            </th>
            <th className="border-gray border-[0.5px] px-2 text-xs xs:text-sm s:px-3 s:py-2 s:text-base sm:px-5 sm:py-3 md:px-8 md:py-4">
              Carbs
            </th>
            <th className="border-gray border-[0.5px] px-2 text-xs xs:text-sm s:px-3 s:py-2 s:text-base sm:px-5 sm:py-3 md:px-8 md:py-4">
              Fat
            </th>
            <th className="border-gray border-[0.5px] px-2 text-xs xs:text-sm s:px-3 s:py-2 s:text-base sm:px-5 sm:py-3 md:px-8 md:py-4">
              Grams
            </th>
            <th className="border-gray border-[0.5px] px-2 text-xs xs:text-sm s:px-3 s:py-2 s:text-base sm:px-5 sm:py-3 md:px-8 md:py-4">
              Kcal
            </th>
            <th className="border-gray border-[0.5px] px-2 text-xs xs:text-sm s:px-3 s:py-2 s:text-base sm:px-5 sm:py-3 md:px-8 md:py-4">
              Remove
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {todaysDiary.map((elem) => {
            return (
              <tr key={elem.id}>
                <td className="border-gray border-[0.5px] px-2 text-xs xs:text-sm s:px-3 s:py-2 s:text-base sm:px-5 sm:py-3 md:px-8 md:py-4">
                  {elem.name}
                </td>
                <td className="border-gray border-[0.5px] px-2 text-xs xs:text-sm s:px-3 s:py-2 s:text-base sm:px-5 sm:py-3 md:px-8 md:py-4">
                  {elem.protein}
                </td>
                <td className="border-gray border-[0.5px] px-2 text-xs xs:text-sm s:px-3 s:py-2 s:text-base sm:px-5 sm:py-3 md:px-8 md:py-4">
                  {elem.carbohydrate}
                </td>
                <td className="border-gray border-[0.5px] px-2 text-xs xs:text-sm s:px-3 s:py-2 s:text-base sm:px-5 sm:py-3 md:px-8 md:py-4">
                  {elem.fat}
                </td>
                <td className="border-gray border-[0.5px] px-2 text-xs xs:text-sm s:px-3 s:py-2 s:text-base sm:px-5 sm:py-3 md:px-8 md:py-4">
                  {elem.grams}
                </td>
                <td className="border-gray border-[0.5px] px-2 text-xs xs:text-sm s:px-3 s:py-2 s:text-base sm:px-5 sm:py-3 md:px-8 md:py-4">
                  {elem.kcal}
                </td>
                <td className="border-gray border-[0.5px] px-2 text-xs xs:text-sm s:px-3 s:py-2 s:text-base sm:px-5 sm:py-3 md:px-8 md:py-4">
                  <span onClick={() => removeItemDiary(elem.id)}>&#10006;</span>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="7" className="text-right">
              Total Calories: {userInfo.todaysCalories} kcal
            </td>
          </tr>
        </tfoot>
      </table>
    </main>
  );
}

export default FoodDiary;
