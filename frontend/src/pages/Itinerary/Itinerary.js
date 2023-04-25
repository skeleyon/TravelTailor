import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Card, Button, message } from "antd";
import jsPDF from 'jspdf';
const { Meta } = Card;

const Itinerary = () => {
  const [iti, setIti] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetch('/itinerary-details/get-itinerary/')
      .then((response) => response.json())
      .then((data) => {
        setIti(data);
        console.log(data)
      })
      .catch((error) => console.error('Error fetching itinerary:', error));
  }, []);

  const handleRemove = (type, id) => {
    // Handle remove logic here
    message.success(`Removed ${type} with ID: ${id}`);
  }

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const title = 'My Itinerary';
    const margin = 10;
    const lineHeight = 10;

    // Add title to the top of the document
    doc.setFontSize(20);
    doc.text(title, margin, margin);

    // Add attractions section
    doc.setFontSize(18);
    doc.text('Attractions:', margin, margin + lineHeight);
    doc.setFontSize(12);
    iti.attractions.forEach((attraction, index) => {
      const y = margin + (2 + index) * lineHeight;
      const text = `${attraction.attraction.title}, ${attraction.attraction.city}, ${attraction.email}`;
      doc.text(text, margin, y);
    });

    // Add flights section
    doc.setFontSize(18);
    doc.text('Flights:', margin, margin + 6 * lineHeight);
    doc.setFontSize(12);
    iti.flights.forEach((flight, index) => {
      const y = margin + (7 + index) * lineHeight;
      const text = `Flight ${index + 1}: ${flight.flight.origin.city} (${flight.flight.origin.code}) to ${flight.flight.destination.city} (${flight.flight.destination.code}), ${flight.passengers} passengers, ${flight.email}`;
      doc.text(text, margin, y);
    });

    // Add hotels section
    doc.setFontSize(18);
    doc.text('Hotels:', margin, margin + 14 * lineHeight);
    doc.setFontSize(12);
    iti.hotels.forEach((hotel, index) => {
      const y = margin + (15 + index) * lineHeight;
      const text = `${hotel.hotel.name}, ${hotel.hotel.address}, ${hotel.email}`;
      doc.text(text, margin, y);
    });

    doc.save(`${title}.pdf`);
  }
  return (
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="primary">
                <Link className="link" to="/attractions">
                Add Place
                </Link>
            </Button>

                <Button type="primary">
                    <Link className="link" to="/flights">
                        Add Flight
                    </Link>
                </Button>

                <Button type="primary">
                    <Link className="link" to="/hotels">
                    Add Hotel
                    </Link>
                </Button>
        </div>
      <h1>Attractions:</h1>
      <ul>
        {iti.attractions &&
          iti.attractions.map((attraction, index) => (
            <li key={index}>
              <Card
                title={attraction.attraction.title}
                extra={
                  <>
                    <Button type="danger" onClick={() => handleRemove('attraction', attraction.attraction.id)}>
                      Remove
                    </Button>
                  </>
                }
                style={{ marginBottom: 16 }}
              >
                <Meta
                  description={
                    <div>
                      <p>City: {attraction.attraction.city}</p>
                      <p>Description: {attraction.attraction.description}</p>
                      <p>Email: {attraction.email}</p>
                    </div>
                  }
                />
              </Card>
            </li>
          ))}
      </ul>
  
      <h1>Flights:</h1>
      <ul>
        {iti.flights &&
          iti.flights.map((flight, index) => (
            <li key={index}>
              <Card
                title={`Flight ${index + 1}`}
                extra={
                  <>
                    <Button type="danger" onClick={() => handleRemove('flight', flight.flight.id)}>
                      Remove
                    </Button>
                  </>
                }
                style={{ marginBottom: 16 }}
              >
                <Meta
                  description={
                    <div>
                      <p>
                        Origin: {flight.flight.origin.city} ({flight.flight.origin.code})
                      </p>
                      <p>
                        Destination: {flight.flight.destination.city} ({flight.flight.destination.code})
                      </p>
                      <p>Duration: {flight.flight.duration} hours</p>
                      <p>Price: ${flight.flight.price}</p>
                      <p>No. of Seats: {flight.flight.no_of_seats}</p>
                      <p>Passengers: {flight.passengers}</p>
                      <p>Email: {flight.email}</p>
                    </div>
                  }
                />
              </Card>
            </li>
          ))}
      </ul>
  
      <h1>Hotels:</h1>
      <ul>
        {iti.hotels &&
          iti.hotels.map((hotel, index) => (
            <li key={index}>
              <Card
                title={hotel.hotel.name}
                extra={
                  <>
                    <Button type="danger" onClick={() => handleRemove('hotel', hotel.hotel.id)}>
                      Remove
                    </Button>
                  </>
                }
                style={{ marginBottom: 16 }}
              >
                <Meta
                  description={
                    <div>
                      <p>Address: {hotel.hotel.address}</p>
                      <p>Price: ${hotel.hotel.price}</p>
                      <p>Type: {hotel.hotel.type}</p>
                      <p>Email: {hotel.email}</p>
                    </div>
                  }
                />
              </Card>
            </li>
          ))}
      </ul>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
      <Button type="primary">Pay</Button>
    </div>
    <div style={{ display: 'flex', justifyContent: 'right', marginTop: 16 }}>
      <Button type="primary" onClick={handleDownloadPDF}>
        Download as PDF
        </Button>
    </div>
    </div>
  );
  };  

export default Itinerary;

