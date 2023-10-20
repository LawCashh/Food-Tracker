function InfoModal({ isOpen, onClose, title, nutrients }) {
  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-[4rem] z-10 flex h-full w-full items-start justify-center bg-black/40">
      <div
        className="xs:w-[400px] s:w-[450px] relative my-20 flex h-72 w-[300px] flex-col rounded-[3rem] bg-black/75
       font-bold text-white sm:w-[600px]"
      >
        <p className="mx-10 mt-4 border-b py-4 text-2xl ">
          {title} - Nutrition info per 100g
        </p>
        <ul className="mx-10 my-5 flex flex-1 flex-col justify-between text-2xl">
          <li>Protein: {(nutrients.ENERC_KCAL / 4) | 0}</li>
          <li>Carbohydrate: {nutrients.CHOCDF | 0}</li>
          <li>Fat: {nutrients.FAT | 0}</li>
          <li>Calories: {nutrients.ENERC_KCAL | 0}</li>
        </ul>
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

export default InfoModal;
