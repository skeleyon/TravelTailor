import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import axios from "axios";

const CheckFlights = () => {
  const [tripType, setTripType] = useState("one-way");
  const [flightList, setFlightList] = useState([
    { departureCity: {}, arrivalCity: {}, departureDate: "" },
  ]);
  const [airports, setAirports] = useState([]);
  const [returnDate, setReturnDate] = useState("");
  const [numOfPassengers, setNumOfPassengers] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/flight-details/get-airports/")
      .then((response) => response.json())
      .then((data) => {
        setAirports(data.airports);
      })
      .catch((error) => console.error("Error fetching airports:", error));
  }, []);

  const handleTripTypeChange = (event) => {
    setTripType(event.target.value);
  };

  const handleDepartureCityChange = (event, index) => {
    const updatedList = [...flightList];
    updatedList[index].departureCity = event.target.value;
    setFlightList(updatedList);
  };

  const handleArrivalCityChange = (event, index) => {
    const updatedList = [...flightList];
    updatedList[index].arrivalCity = event.target.value;
    setFlightList(updatedList);
  };

  const handleDepartureDateChange = (event, index) => {
    const updatedList = [...flightList];
    updatedList[index].departureDate = event.target.value;
    setFlightList(updatedList);
  };

  const handleAddFlight = () => {
    setFlightList([
      ...flightList,
      { departureCity: {}, arrivalCity: {}, departureDate: "" },
    ]);
  };

  const handleRemoveFlight = (index) => {
    const updatedList = [...flightList];
    updatedList.splice(index, 1);
    setFlightList(updatedList);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission or data processing here
    // Use the form data stored in state: tripType, flightList, returnDate, numOfPassengers
    console.log("Form submitted with data:", {
      tripType,
      flightList,
      returnDate,
      numOfPassengers,
    });

    axios
      .get("/flight-details/search/", {
        params: {
          type: tripType,
          flights: JSON.stringify(flightList),
        },
      })
      .then((response) => {
        // Handle response
        const payload = response.data;
        const flights = payload.flights;
        navigate("/flights/selection", { state: { data: flights } });
      })
      .catch((error) => {
        console.error(error);
      });
    // axios.get(`/flight-details/search?type=${tripType}&flights=${JSON.stringify(flight_list)}`)
    //   .then(response => response.json())
    //   .then(data => setFlights(data.flights))
    //   .catch(error => console.error('Error:', error));
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/1004584/pexels-photo-1004584.jpeg")',
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Row className="justify-content-center">
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
            <h2 className="text-center">Flight Booking Form</h2>
            <FormGroup>
              <Label>Trip Type:</Label>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    value="one-way"
                    checked={tripType === "one-way"}
                    onChange={handleTripTypeChange}
                  />
                  One-way
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    value="round-trip"
                    checked={tripType === "round-trip"}
                    onChange={handleTripTypeChange}
                  />
                  Round-trip
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    value="multi-city"
                    checked={tripType === "multi-city"}
                    onChange={handleTripTypeChange}
                  />
                  Multi-city
                </Label>
              </FormGroup>
            </FormGroup>
            <FormGroup>
              <Label>Flights:</Label>
              {flightList.map((flight, index) => (
                <div key={index}>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Label>Departure City:</Label>
                        {/* <Input
                            type="text"
                            value={flight.departureCity}
                            onChange={(event) =>
                              handleDepartureCityChange(event, index)
                            }
                          /> */}
                        <select
                          id="dept"
                          value={flight.departureCity}
                          onChange={(event) =>
                            handleDepartureCityChange(event, index)
                          }
                        >
                          <option value="">Select Departure City</option>
                          {airports.map((airport) => (
                            <option key={airport.id} value={airport.id}>
                              {airport.city} {airport.code}
                            </option>
                          ))}
                        </select>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label>Arrival City:</Label>
                        {/* <Input
                            type="text"
                            value={flight.arrivalCity}
                            onChange={(event) =>
                              handleArrivalCityChange(event, index)
                            }
                          /> */}
                        <select
                          id="dept"
                          value={flight.arrivalCity}
                          onChange={(event) =>
                            handleArrivalCityChange(event, index)
                          }
                        >
                          <option value="">Select Arrival City</option>
                          {airports.map((airport) => (
                            <option key={airport.id} value={airport.id}>
                              {airport.city} {airport.code}
                            </option>
                          ))}
                        </select>
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label>Departure Date:</Label>
                        <Input
                          type="date"
                          value={flight.departureDate}
                          onChange={(event) =>
                            handleDepartureDateChange(event, index)
                          }
                        />
                      </FormGroup>
                    </Col>
                    {tripType === "multi-city" && (
                      <Col md={1}>
                        {index === flightList.length - 1 ? (
                          <Button
                            color="primary"
                            onClick={handleAddFlight}
                            className="mt-4"
                          >
                            Add
                          </Button>
                        ) : (
                          <Button
                            color="danger"
                            onClick={() => handleRemoveFlight(index)}
                            className="mt-4"
                          >
                            Remove
                          </Button>
                        )}
                      </Col>
                    )}
                  </Row>
                </div>
              ))}
            </FormGroup>
            {tripType === "round-trip" && (
              <FormGroup>
                <Label>Return Date:</Label>
                <Input
                  type="date"
                  value={returnDate}
                  onChange={(event) => setReturnDate(event.target.value)}
                />
              </FormGroup>
            )}
            <FormGroup>
              <Label>Number of Passengers:</Label>
              <Input
                type="number"
                min={1}
                value={numOfPassengers}
                onChange={(event) =>
                  setNumOfPassengers(Number(event.target.value))
                }
              />
            </FormGroup>
            <Button type="submit" color="primary" className="mt-4">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default CheckFlights;
