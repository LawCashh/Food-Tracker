import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "./components/Header";
import Home from "./pages/Home";
import FoodDiary from "./pages/FoodDiary";
import Profile from "./pages/Profile";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export const AppContext = createContext();

function App() {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    dailyCalories: 0,
    todaysCalories: 0,
  });
  const [todaysDiary, setTodaysDiary] = useState([]);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      let parsedUserData = JSON.parse(storedUserData);
      parsedUserData = {
        ...parsedUserData,
        todaysCalories: parseInt(parsedUserData.todaysCalories),
        dailyCalories: parseInt(parsedUserData.dailyCalories),
      };
      setUserInfo(parsedUserData);
    }

    const storedTodaysDiary = localStorage.getItem("todaysDiary");
    if (storedTodaysDiary) {
      const parsedTodaysDiary = JSON.parse(storedTodaysDiary);
      setTodaysDiary(parsedTodaysDiary);
    }

    const storedCurrentDate = localStorage.getItem("currentDate");
    const today = new Date().toLocaleDateString();
    if (storedCurrentDate) {
      if (storedCurrentDate !== today) {
        setUserInfo((prev) => {
          return { ...prev, todaysCalories: 0 };
        });
        setTodaysDiary([]);
        if (storedUserData) {
          let parsedUserData = JSON.parse(storedUserData);
          parsedUserData = {
            ...parsedUserData,
            todaysCalories: 0,
            dailyCalories: parseInt(parsedUserData.dailyCalories),
          };
          localStorage.setItem("userData", JSON.stringify(parsedUserData));
        }
        localStorage.setItem("todaysDiary", JSON.stringify([]));
      }
    }
    localStorage.setItem("currentDate", new Date().toLocaleDateString());
  }, []);

  const updateUserInfo = (newUserInfo) => {
    setUserInfo((prev) => {
      return { ...prev, ...newUserInfo };
    });
  };

  const removeItemDiary = (itemId) => {
    const itemCalories = todaysDiary.find((item) => item.id === itemId).kcal;
    const updatedTodaysDiary = todaysDiary.filter((item) => item.id !== itemId);
    setTodaysDiary(updatedTodaysDiary);
    localStorage.setItem("todaysDiary", JSON.stringify(updatedTodaysDiary));
    const newUserInfo = {
      ...userInfo,
      todaysCalories: userInfo.todaysCalories - itemCalories,
    };
    localStorage.setItem("userData", JSON.stringify(newUserInfo));
    updateUserInfo(newUserInfo);
  };

  const addItemDiary = (item) => {
    const newDiaryId = uuidv4();
    const newDiary = [...todaysDiary, { id: newDiaryId, ...item }];
    localStorage.setItem("todaysDiary", JSON.stringify(newDiary));
    setTodaysDiary((prev) => [...prev, { id: newDiaryId, ...item }]);
    const newUserInfo = {
      ...userInfo,
      todaysCalories: userInfo.todaysCalories + item.kcal,
    };
    localStorage.setItem("userData", JSON.stringify(newUserInfo));
  };

  return (
    <div className="flex h-[100dvh] flex-col">
      <QueryClientProvider client={queryClient}>
        <AppContext.Provider
          value={{
            userInfo,
            updateUserInfo,
            todaysDiary,
            addItemDiary,
            removeItemDiary,
          }}
        >
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="food-diary" element={<FoodDiary />} />
              <Route path="profile" element={<Profile />} />
              <Route
                path="*"
                element={<Navigate to="/home" replace={true} />}
              />
            </Routes>
          </BrowserRouter>
        </AppContext.Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
