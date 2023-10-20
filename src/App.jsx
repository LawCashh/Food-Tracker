import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import FoodDiary from "./pages/FoodDiary";
import Profile from "./pages/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useState } from "react";

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
    FirstName: "x",
    LastName: "d",
    Calorie: 0,
  });
  const updateUserInfo = (newUserInfo) => {
    setUserInfo(newUserInfo);
  };

  return (
    <div className="flex min-h-[100dvh] flex-col">
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
