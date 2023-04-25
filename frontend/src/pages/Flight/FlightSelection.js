import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Checkbox, Button } from 'antd';
import NavBar from '../../components/NavBar';

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
      setSelectedFlights(selectedFlights.filter(index => index !== flightIndex));
    } else {
      setSelectedFlights([...selectedFlights, flightIndex]);
    }
  }

  const columns = [
    {
      title: 'Origin',
      dataIndex: ['origin', 'city'],
      key: 'originCity',
    },
    {
      title: 'Destination',
      dataIndex: ['destination', 'city'],
      key: 'destinationCity',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Price in $',
      dataIndex: 'price',
      key: 'price',
    },
    {
        title: 'No of Seats',
        dataIndex: 'no_of_seats',
        key: 'seats'
    },
    {
      title: 'Select',
      dataIndex: 'index',
      key: 'select',
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
    const selectedFlightData = selectedFlights.map(index => flights[index]);
    console.log('Selected Flights:', selectedFlightData);
    const flightIds = selectedFlightData.map(flightData => flightData.id);
    console.log(flightIds)

    try {
      const response = await fetch('http://localhost:8000/flight-details/book-flight/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          id: flightIds
        })
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
        alert('Booking successful!');
        navigate("/explore")
      } else {
        alert('Booking failed. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again later.');
    }

  }

  return (
    <div>
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