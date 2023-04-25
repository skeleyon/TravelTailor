import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Checkbox, Button } from 'antd';
import NavBar from '../../components/NavBar';
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Table, Checkbox, Button } from "antd";
import NavBar from "../../components/NavBar";

const FlightSelection = () => {
  const [flights, setFlights] = useState([]);
  const [selectedFlights, setSelectedFlights] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setFlights(location.state?.data || []);
  }, [location.state]);

  const handleFlightSelect = (flightIndex) => {
    if (selectedFlights.includes(flightIndex)) {
      setSelectedFlights(
        selectedFlights.filter((index) => index !== flightIndex)
      );
    } else {
      setSelectedFlights([...selectedFlights, flightIndex]);
    }
  };

  const columns = [
    {
      title: "Origin",
      dataIndex: ["origin", "city"],
      key: "originCity",
    },
    {
      title: "Destination",
      dataIndex: ["destination", "city"],
      key: "destinationCity",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Price in $",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "No of Seats",
      dataIndex: "no_of_seats",
      key: "seats",
    },
    {
      title: "Select",
      dataIndex: "index",
      key: "select",
      render: (flightIndex) => (
        <Checkbox
          checked={selectedFlights.includes(flightIndex)}
          onChange={() => handleFlightSelect(flightIndex)}
        />
      ),
    },
  ];

  const handleButtonClick = async (event) => {
    event.preventDefault();
    // Handle button click logic here
    const selectedFlightData = selectedFlights.map((index) => flights[index]);
    console.log("Selected Flights:", selectedFlightData);
    const flightIds = selectedFlightData.map((flightData) => flightData.id);
    console.log(flightIds);

    try {
      const response = await fetch(
        "http://localhost:8000/flight-details/book-flight/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            id: flightIds,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (data.success) {
        alert('Booking successful!');
        navigate("/explore")

        alert("Booking successful!");
      } else {
        alert("Booking failed. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://e0.pxfuel.com/wallpapers/698/797/desktop-wallpaper-if-you-want-to-transport-valuable-perishable-goods-or-courier-items-forget-the-sizes-and-weights-city-moon-c-airplane-aircraft-cheap-flight-tickets-air-freight.jpg")',
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <NavBar />
      <h1>Flight Selection</h1>
      <Table
        dataSource={flights.map((flight, index) => ({ ...flight, index }))}
        columns={columns}
        rowKey={(flight) => flight.index}
      />
      <Button onClick={handleButtonClick}>Confirm</Button>
    </div>
  );
};

export default FlightSelection;
