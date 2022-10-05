import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Home from "./pages/home/Home";
import Welcome from "./pages/home/Welcome";
import Analysis from "./pages/analysis/Analysis";
import Search from "pages/search/Search";
import MyPage from "./pages/myPage/MyPage";
import Logincheck from "pages/home/Logincheck";
import SearchByTag from "pages/search/SearchByTag";
import SearchByNutrient from "pages/search/SearchByNutrient";
import SearchDetail from "pages/search/SearchDetail";
import TagResult from "pages/search/TagResult";
import NameResult from "pages/search/NameResult";
import NutrientResult from "pages/search/NutrientResult";
import Header from "components/nav/Header";
import Footer from "components/nav/Footer";

function Router() {
  const url = window.location.href;

  return (
    <BrowserRouter>
      {url === "https://j7a701.p.ssafy.io/" ||
      url === "https://j7a701.p.ssafy.io/welcome/" ||
      url === "https://j7a701.p.ssafy.io/welcome" ? null : (
        <Header />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/search" element={<Search />} />
        <Route path="/searchtag" element={<SearchByTag />} />
        <Route path="/searchnutrient" element={<SearchByNutrient />} />
        <Route path="/searchdetail/*" element={<SearchDetail />} />
        <Route path="/searchdetail/:nutrientId" element={<SearchDetail />} />
        <Route path="/tagresult/:id" element={<TagResult />} />
        <Route path="/result/:id" element={<NameResult />} />
        <Route path="/nutrientresult/:id" element={<NutrientResult />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/logincheck" element={<Logincheck />} />
      </Routes>
      {url === "https://j7a701.p.ssafy.io/" ? null : <Footer />}
    </BrowserRouter>
  );
}

export default Router;

// logincheck?
// accessToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0b2tlbiIsInByb3ZpZGVyIjoiZ29vZ2xlIiwibmFtZSI6ImZyaWRheWhzIiwiZW1haWwiOiJ3anRrZGw5NkBnbWFpbC5jb20iLCJpYXQiOjE2NjQwOTYwODgsImV4cCI6MTY2NDA5NjY4OH0.D_cZHMaMmwRl5RVQrqLq5FoW1pyXCsjzd5kBWO_ENLs
// &refreshToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0b2tlbiIsInByb3ZpZGVyIjoiZ29vZ2xlIiwibmFtZSI6ImZyaWRheWhzIiwiZW1haWwiOiJ3anRrZGw5NkBnbWFpbC5jb20iLCJpYXQiOjE2NjQwOTYwODgsImV4cCI6MTY2NjY4ODA4OH0.Q898WgUPaj8OsD6AUg6meaRZEJj1E8ryNcrGne8m0xk
// &accessTokenExpiration=2022-09-25-18-04-48
// &refreshTokenExpiration=2022-10-25-17-54-48
// &userId=4
// &name=fridayhs
// &birthYear=

// &gender=
