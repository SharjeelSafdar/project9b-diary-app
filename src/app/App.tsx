import React, { FC, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { NavBar } from "../features/navBar/NavBar";
const Home = lazy(() => import("../features/home/Home"));
const LogIn = lazy(() => import("../features/auth/LogIn"));
const SignUp = lazy(() => import("../features/auth/SignUp"));
const Diaries = lazy(() => import("../features/diary/Diaries"));
const EntriesList = lazy(() => import("../features/entry/EntriesList"));

const App: FC = () => {
  return (
    <>
      <NavBar />
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/diaries" element={<Diaries />} />
          <Route path="/diaries/:diaryId" element={<EntriesList />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
