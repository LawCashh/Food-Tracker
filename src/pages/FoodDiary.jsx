import { useContext } from "react";
//ovo ispod uuid ti ne treba makni ga i koristi postojeci iz objekata id
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../App";

function FoodDiary() {
  const { todaysDiary, removeItemDiary } = useContext(AppContext);
  return (
    <main className="flex-1">
      <table className="mx-auto my-20 ">
        <thead className="bg-cyan-500">
          <tr className="text-white">
            <th className="xs:text-sm s:text-base s:py-2 s:px-3 border-gray border-[0.5px] px-2 text-xs sm:px-5 sm:py-3 md:px-8 md:py-4">
              Name
            </th>
            <th className="xs:text-sm s:text-base s:py-2 s:px-3 border-gray border-[0.5px] px-2 text-xs sm:px-5 sm:py-3 md:px-8 md:py-4">
              Protein
            </th>
            <th className="xs:text-sm s:text-base s:py-2 s:px-3 border-gray border-[0.5px] px-2 text-xs sm:px-5 sm:py-3 md:px-8 md:py-4">
              Carbs
            </th>
            <th className="xs:text-sm s:text-base s:py-2 s:px-3 border-gray border-[0.5px] px-2 text-xs sm:px-5 sm:py-3 md:px-8 md:py-4">
              Fat
            </th>
            <th className="xs:text-sm s:text-base s:py-2 s:px-3 border-gray border-[0.5px] px-2 text-xs sm:px-5 sm:py-3 md:px-8 md:py-4">
              Grams
            </th>
            <th className="xs:text-sm s:text-base s:py-2 s:px-3 border-gray border-[0.5px] px-2 text-xs sm:px-5 sm:py-3 md:px-8 md:py-4">
              Kcal
            </th>
            <th className="xs:text-sm s:text-base s:py-2 s:px-3 border-gray border-[0.5px] px-2 text-xs sm:px-5 sm:py-3 md:px-8 md:py-4">
              Remove
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr>
            <td className="xs:text-sm s:text-base s:py-2 s:px-3 border-gray border-[0.5px] px-2 text-xs sm:px-5 sm:py-3 md:px-8 md:py-4">
              xd
            </td>
            <td className="xs:text-sm s:text-base s:py-2 s:px-3 border-gray border-[0.5px] px-2 text-xs sm:px-5 sm:py-3 md:px-8 md:py-4">
              xd
            </td>
            <td className="xs:text-sm s:text-base s:py-2 s:px-3 border-gray border-[0.5px] px-2 text-xs sm:px-5 sm:py-3 md:px-8 md:py-4">
              xd
            </td>
            <td className="xs:text-sm s:text-base s:py-2 s:px-3 border-gray border-[0.5px] px-2 text-xs sm:px-5 sm:py-3 md:px-8 md:py-4">
              xd
            </td>
            <td className="xs:text-sm s:text-base s:py-2 s:px-3 border-gray border-[0.5px] px-2 text-xs sm:px-5 sm:py-3 md:px-8 md:py-4">
              xd
            </td>
            <td className="xs:text-sm s:text-base s:py-2 s:px-3 border-gray border-[0.5px] px-2 text-xs sm:px-5 sm:py-3 md:px-8 md:py-4">
              xd
            </td>
            <td className="xs:text-sm s:text-base s:py-2 s:px-3 border-gray border-[0.5px] px-2 text-xs sm:px-5 sm:py-3 md:px-8 md:py-4">
              xd
            </td>
          </tr>
          {todaysDiary.map(() => {
            return (
              <tr key={uuidv4()}>
                <td>Row 1, Cell 1</td>
                <td>Row 1, Cell 2</td>
                <td>Row 1, Cell 3</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

export default FoodDiary;
