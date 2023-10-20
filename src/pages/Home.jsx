import SearchBox from "../components/SearchBox";
import InfoModal from "../components/InfoModal";
import { useState } from "react";

function Home() {
  const [selectedFood, setSelectedFood] = useState(null);
  const clearSelectedFood = () => {
    setSelectedFood(null);
  };

  const changeSelectedFood = (food) => {
    setSelectedFood(food);
  };

  return (
    <main className="flex-1 overflow-scroll">
      <SearchBox changeSelectedFood={changeSelectedFood} />
      <InfoModal
        isOpen={selectedFood !== null}
        onClose={clearSelectedFood}
        title={selectedFood ? selectedFood.label : ""}
        nutrients={selectedFood ? selectedFood.nutrients : {}}
      />
    </main>
  );
}

export default Home;
