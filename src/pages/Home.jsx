import SearchBox from "../components/SearchBox";
import InfoModal from "../components/InfoModal";
import { useState } from "react";
import AddItemModal from "../components/AddItemModal";

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
    <main className="flex-1 overflow-scroll">
      <SearchBox
        changeSelectedFoodInfo={changeSelectedFoodInfo}
        changeSelectedFoodToAdd={changeSelectedFoodToAdd}
      />
      <InfoModal
        isOpen={selectedFoodInfo !== null}
        onClose={clearSelectedFoodInfo}
        title={selectedFoodInfo ? selectedFoodInfo.label : ""}
        nutrients={selectedFoodInfo ? selectedFoodInfo.nutrients : {}}
      />
      //TODO: make this modal
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
