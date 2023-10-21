import SearchBox from "../components/SearchBox";
import InfoModal from "../components/InfoModal";
import { useState } from "react";
import AddItemModal from "../components/AddItemModal";
import MyIntake from "../components/MyIntake";

function Home() {
  const [selectedFoodInfo, setSelectedFoodInfo] = useState(null);
  const [selectedFoodToAdd, setSelectedFoodToAdd] = useState(null);

  const clearSelectedFoodInfo = () => {
    setSelectedFoodInfo(null);
  };
  const changeSelectedFoodInfo = (food) => {
    setSelectedFoodInfo(food);
  };
  const clearSelectedFoodToAdd = () => {
    setSelectedFoodToAdd(null);
  };
  const changeSelectedFoodToAdd = (food) => {
    setSelectedFoodToAdd(food);
  };

  return (
    <main className="flex flex-1 flex-col overflow-scroll s:flex-row">
      <SearchBox
        changeSelectedFoodInfo={changeSelectedFoodInfo}
        changeSelectedFoodToAdd={changeSelectedFoodToAdd}
      />
      <MyIntake />
      <InfoModal
        isOpen={selectedFoodInfo !== null}
        onClose={clearSelectedFoodInfo}
        title={selectedFoodInfo ? selectedFoodInfo.label : ""}
        nutrients={selectedFoodInfo ? selectedFoodInfo.nutrients : {}}
      />
      <AddItemModal
        isOpen={selectedFoodToAdd !== null}
        onClose={clearSelectedFoodToAdd}
        title={selectedFoodToAdd ? selectedFoodToAdd.label : ""}
        nutrients={selectedFoodToAdd ? selectedFoodToAdd.nutrients : {}}
      />
    </main>
  );
}

export default Home;
