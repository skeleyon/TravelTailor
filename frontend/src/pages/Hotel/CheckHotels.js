import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import hotelBookingBackground from "../../assets/destination-5.jpg";
import axios from "axios";

const CheckHotels = () => {

  const [city, setCity] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numOfGuests, setNumOfGuests] = useState('');

  const navigate = useNavigate();

  const handleCheckAvailability = () => {
    console.log('City:', city);
    console.log('Check-in Date:', checkInDate);
    console.log('Check-out Date:', checkOutDate);
    console.log('Number of Guests:', numOfGuests);

    const url = `/hotel-details/search/?city=${city}`;

    axios.get(url).then((response) => {
      const payload = response.data;
      const hotels = payload.hotels;
      navigate('/hotels/selection', { state: { data: hotels } });
      
    }).catch((error) => {
      // Handle error
      console.error(error);
    });
  };

  const validateCheckOutDate = (event) => {
    if (event.target.value && checkInDate && event.target.value <= checkInDate) {
      alert('Check-out date must be greater than check-in date');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', 
      background: `url(${hotelBookingBackground}) no-repeat center center fixed`,}}>
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '32px', borderRadius: '8px' }}>
        <h2>Hotel Booking Form</h2>
        <Form>
          <FormGroup>
            <Label for="city">City</Label>
            <Input
              type="text"
              name="city"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
            />
          </FormGroup>
          <FormGroup>
            <Label for="checkInDate">Check-in Date</Label>
            <Input
              type="date"
              name="checkInDate"
              id="checkInDate"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="checkOutDate">Check-out Date</Label>
            <Input
              type="date"
              name="checkOutDate"
              id="checkOutDate"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              onBlur={validateCheckOutDate}
            />
          </FormGroup>
          <FormGroup>
            <Label for="numOfGuests">Number of Guests</Label>
            <Input
              type="number"
              name="numOfGuests"
              id="numOfGuests"
              value={numOfGuests}
              onChange={(e) => setNumOfGuests(e.target.value)}
              placeholder="Enter number of guests"
            />
          </FormGroup>
          <Button color="primary" onClick={handleCheckAvailability}>
            Check Availability
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CheckHotels;