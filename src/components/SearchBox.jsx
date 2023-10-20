import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import magnifier from "../assets/images/magnifier.png";
import placeholder from "../assets/images/placeholder.png";
import plus from "../assets/images/plus.svg";
import info from "../assets/images/info.svg";

function SearchBox({ changeSelectedFoodInfo, changeSelectedFoodToAdd }) {
  const [searchText, setSearchText] = useState("");
  const queryClient = useQueryClient();

  const { isLoading: isLoadingFood, data: foods } = useQuery({
    queryKey: ["foods", searchText.trim()],
    queryFn: async () => {
      if (searchText.trim() === "") {
        return [];
      }
      try {
        const foodFetch = await fetch(
          `https://api.edamam.com/api/food-database/v2/parser?app_id=f31fa8b6&app_key=b7c0e04f1984a1de99d6cc33a8bb0d9b&ingr=${searchText}&nutrition-type=logging`,
        );
        const foods = await foodFetch.json();
        const firstFiveFoods = foods.hints.slice(0, 5);
        console.log(firstFiveFoods);
        return firstFiveFoods;
      } catch (error) {
        console.log("greska u uzimanju postova " + error);
      }
    },
  });

  useEffect(() => {
    if (searchText.trim() !== "") {
      queryClient.invalidateQueries(["foods", searchText.trim()]);
    }
  }, [searchText, queryClient]);
  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };
  return (
    <div className="s:w-[50%] s:items-start flex min-h-[24rem] w-[100%] flex-col items-center">
      <div className="s:w-52 s:mx-5 relative mx-10 my-5 w-60 sm:mx-10 sm:w-60 md:w-[20rem]">
        <input
          className="w-full rounded-sm border border-gray-500 p-2 pl-7 focus:outline-gray-500"
          type="text"
          value={searchText}
          onChange={handleInputChange}
          placeholder="Search Food"
        />
        <img src={magnifier} className="absolute left-2 top-[0.85rem] w-4" />
      </div>
      {!isLoadingFood &&
        foods.map((food) => {
          return (
            <div
              key={`${uuidv4()}`}
              className="s:h-20 s:w-52 s:mx-5 my-3 flex h-24 w-60 items-center border border-gray-500 sm:mx-10 sm:h-24 sm:w-60 md:w-[20rem]"
            >
              <div className="flex h-full w-[4rem] md:w-[5.5rem]">
                <img
                  src={food.food.image ? food.food.image : placeholder}
                  className="w-full object-cover"
                />
              </div>
              <div className="flex h-[70%] flex-1 flex-col justify-center">
                <div className="ml-2 flex flex-row items-center overflow-hidden">
                  <span className="mr-1 h-[100%] max-w-[80px] overflow-hidden whitespace-nowrap text-lg font-bold sm:max-w-[110px] md:max-w-[120px]">
                    {food.food.label}
                  </span>
                  <img
                    src={info}
                    className="w-5 invert-[0.4]"
                    onClick={() => changeSelectedFoodInfo(food.food)}
                  />
                </div>
                <span className="ml-2 text-xs">
                  {food.food.nutrients.ENERC_KCAL | 0}kcal per 100g
                </span>
              </div>
              <div className="flex h-full w-[3rem] items-center justify-center md:w-[4rem]">
                <img
                  src={plus}
                  className="h-[1.5rem] w-[1.5rem] invert-[0.4] filter md:h-[2rem] md:w-[2rem]"
                  onClick={() => changeSelectedFoodToAdd(food.food)}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default SearchBox;
