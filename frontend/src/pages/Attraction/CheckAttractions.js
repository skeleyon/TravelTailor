import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, Row, Col, AutoComplete } from 'antd';
import axios from "axios";

import NavBar from '../../components/NavBar';

const CheckAttractions = () => {

    const [searchValue, setSearchValue] = useState('');
    const [cities, setCities] = useState([
      "New York, NY",
      "Los Angeles, CA",
      "Chicago, IL",
      "Houston, TX",
      "Phoenix, AZ",
      "Philadelphia, PA",
      "San Antonio, TX",
      "San Diego, CA",
      "Dallas, TX",
      "San Jose, CA",
      "Austin, TX",
      "Jacksonville, FL",
      "San Francisco, CA",
      "Indianapolis, IN",
      "Columbus, OH",
      "Fort Worth, TX",
      "Charlotte, NC",
      "Detroit, MI",
      "El Paso, TX",
      "Seattle, WA",
      "Denver, CO",
      "Washington, DC",
      "Memphis, TN",
      "Boston, MA",
      "Nashville, TN",
      "Baltimore, MD",
      "Oklahoma City, OK",
      "Portland, OR",
      "Las Vegas, NV",
      "Louisville, KY",
      "Milwaukee, WI",
      "Albuquerque, NM",
      "Tucson, AZ",
      "Fresno, CA",
      "Sacramento, CA",
      "Kansas City, MO",
      "Long Beach, CA",
      "Mesa, AZ",
      "Atlanta, GA",
      "Colorado Springs, CO",
      "Virginia Beach, VA",
      "Raleigh, NC",
      "Omaha, NE",
      "Miami, FL",
      "Oakland, CA",
      "Tulsa, OK",
      "Minneapolis, MN",
      "Cleveland, OH",
      "Wichita, KS",
      "Arlington, TX",
      "New Orleans, LA",
      "Bakersfield, CA",
      "Tampa, FL",
      "Honolulu, HI",
      "Anaheim, CA",
      "Aurora, CO",
      "Santa Ana, CA",
      "St. Louis, MO",
      "Riverside, CA",
      "Corpus Christi, TX",
      "Pittsburgh, PA",
      "Lexington, KY",
      "Anchorage, AK",
      "Stockton, CA",
      "Cincinnati, OH",
      "Saint Paul, MN",
      "Toledo, OH",
      "Greensboro, NC",
      "Newark, NJ",
      "Plano, TX",
      "Henderson, NV",
      "Lincoln, NE",
      "Buffalo, NY",
      "Jersey City, NJ",
      "Chula Vista, CA",
      "Fort Wayne, IN",
      "Orlando, FL",
      "St. Petersburg, FL",
      "Chandler, AZ",
      "Laredo, TX",
      "Norfolk, VA",
      "Durham, NC",
      "Madison, WI",
      "Lubbock, TX",
      "Irvine, CA",
      "Winston-Salem, NC",
      "Glendale, AZ",
      "Garland, TX",
      "Hialeah, FL",
      "Reno, NV",
      "Chesapeake, VA",
      "Gilbert, AZ",
      "Baton Rouge, LA",
      "Irving, TX",
      "Scottsdale, AZ",
      "North Las Vegas, NV",
      "Fremont, CA",
      "Boise City, ID",
      "Richmond, VA",
      "San Bernardino, CA",
      "Birmingham, AL",
    ]);
    
    const navigate = useNavigate();

    const handleSearch = () => {
        console.log('Search:', searchValue);


        const url = `/attraction-details/search/?city=${searchValue}`;

        axios.get(url).then((response) => {
        const payload = response.data;
        const attractions = payload.attractions;
        navigate('/attractions/selection', { state: { data: attractions } });
        
        }).catch((error) => {
        // Handle error
        console.error(error);
        });
    };
  
    const handleSearchValueChange = (value) => {
      setSearchValue(value);
    };
  
    const renderOptions = () => {
      return cities
        .filter(city => city.toLowerCase().includes(searchValue.toLowerCase()))
        .map((city) => {
          return <AutoComplete.Option key={city}>{city}</AutoComplete.Option>;
        });
    };
  
    return (
      <div>
        <NavBar />
        <Row justify="center" align="middle" style={{ margin: '1rem 0' }}>
          <Col span={8}>
            <AutoComplete
              placeholder="Search"
              value={searchValue}
              onChange={handleSearchValueChange}
              style={{ width: '100%' }}
            >
              {renderOptions()}
            </AutoComplete>
          </Col>
          <Col span={2} offset={1}>
            <Button onClick={handleSearch} type="primary">
              Search
            </Button>
          </Col>
        </Row>
      </div>
    );
};

export default CheckAttractions;