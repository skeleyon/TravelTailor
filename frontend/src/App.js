import React from "react";
import HomePage from "./pages/HomPage/HomePage";
import { Routes , Route} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import ResetPasswordConfirm from "./components/ResetPasswordConfirm";
import RegisterPage from "./components/RegisterPage";
import ResetPassword from "./components/ResetPassword";
import Activate from "./components/Activate";
import Hotel from "./components/Hotel";
import Home from "./pages/Home/Home";
import HotelSelection from "./pages/Hotel/HotelSelection";
import CheckHotels from "./pages/Hotel/CheckHotels";
import CheckFlights from "./pages/Flight/CheckFlights";
import FlightSelection from "./pages/Flight/FlightSelection";
import HotelPage from "./pages/Hotel/HotelPage";
import Explore from "./pages/Explore/Explore";
import CheckAttractions from "./pages/Attraction/CheckAttractions";
import AttractionSelection from "./pages/Attraction/AttractionSelection";
import Itinerary from "./pages/Itinerary/Itinerary";
import Payment from "./pages/Payment/Payment";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route exact path="/login" element={<LoginPage/>}></Route>
        <Route exact path="/register" element={<RegisterPage />}></Route>
        <Route exact path="/reset-password" element={<ResetPassword />}></Route>
        <Route
          exact
          path="/password/reset/confirm/:uid/:token"
          element={<ResetPasswordConfirm />}
        ></Route>
        <Route
          exact
          path="/activate/:uid/:token"
          element={<Activate />}
        ></Route>
        <Route exact path="/booking" element={<Home />} />
        <Route exact path="/hotels" element={<CheckHotels />} />
        <Route exact path="/hotels/selection" element={<HotelSelection />} />
        <Route exact path="/hotels/:id" element={<HotelPage />} />
        <Route exact path="/flights" element={<CheckFlights />} />
        <Route exact path="/flights/selection" element={<FlightSelection />} />
        <Route exact path="/attractions" element={<CheckAttractions />} />
        <Route exact path="/attractions/selection" element={<AttractionSelection />} />
        <Route exact path="/explore" element={<Explore />} />
        <Route exact path="/itinerary" element={<Itinerary />} />
        <Route exact path="/payment" element={<Payment />} />
      </Routes>
    </>
  );
};

export default App;
