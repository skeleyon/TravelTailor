import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Typography, Button } from 'antd';

import NavBar from '../../components/NavBar';

const { Title, Paragraph } = Typography;

const HotelPage = () => {
  const [hotel, setHotel] = useState({});
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    setHotel(location.state?.data || {});
  }, [location.state]);

  const handleBookClick = async (event) => {
    event.preventDefault();
    // Handle book button click, e.g. navigate to booking page
    try {
      const response = await fetch('http://localhost:8000/hotel-details/book-hotel/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          id: hotel.id
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
  };

  return (
    <div>
      <NavBar />
      <Card
        style={{ maxWidth: 800, margin: '0 auto', marginTop: 24 }}
        cover={<img src={`data:image/jpeg;base64,${hotel.image}`} style={{ width: '100%', height: 270, objectFit: 'cover' }} alt="Hotel" />}
      >
        <Card.Meta
          title={<Title level={2}>{hotel.name}</Title>}
          description={
            <div>
              <Paragraph>{hotel.hotel_description}</Paragraph>
              <Paragraph>
                <strong>City:</strong> {hotel.city}
              </Paragraph>
              <Paragraph>
                <strong>Address:</strong> {hotel.address}
              </Paragraph>
              <Paragraph>
                <strong>Price:</strong> {hotel.price}
              </Paragraph>
              <Paragraph>
                <strong>Type:</strong> {hotel.type}
              </Paragraph>
              <Paragraph>
                <strong>Rating:</strong> {hotel.rating}
              </Paragraph>
            </div>
          }
        />
        <Button type="primary" style={{ marginTop: 24 }} onClick={handleBookClick}>
          Book
        </Button>
      </Card>
    </div>
  );
};

export default HotelPage;