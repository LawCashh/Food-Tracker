import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import FoodDiary from "./pages/FoodDiary";
import Profile from "./pages/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";

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

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserInfo(parsedUserData);
    }
    const storedCurrentDate = localStorage.getItem("currentDate");
    const today = new Date().toLocaleDateString();
    if (storedCurrentDate) {
      if (storedCurrentDate !== today) {
        setUserInfo((prev) => {
          return { ...prev, todaysCalories: 0 };
        });
      }
    }
    localStorage.setItem("currentDate", new Date().toLocaleDateString());
  }, []);

  const updateUserInfo = (newUserInfo) => {
    setUserInfo((prev) => {
      return { ...prev, ...newUserInfo };
    });
  };

  return (
    <div className="flex h-[100dvh] flex-col">
      <QueryClientProvider client={queryClient}>
        <AppContext.Provider value={{ userInfo, updateUserInfo }}>
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
