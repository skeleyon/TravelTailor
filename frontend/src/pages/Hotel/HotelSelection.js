import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Slider } from 'antd';
import NavBar from '../../components/NavBar';

const HotelSelection = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState({});
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [hotelType, setHotelType] = useState('');
  const [rating, setRating] = useState([1, 5]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch hotels data from the backend API
    // fetch('/hotel-details/')
    //   .then((response) => response.json())
    //   .then((data) => setHotels(data.hotels))
    //   .catch((error) => console.error('Error fetching hotels:', error));
    setHotels(location.state?.data || []);
  }, [location.state]);

  const handleHotelSelection = (hotel) => {
    // setSelectedHotel(hotel, () => {
    //     navigate(`/hotel/${hotel.id}`, { state: { data: hotel } });
    //   });   
    navigate(`/hotels/${hotel.id}`, { state: { data: hotel } });
  };

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };

  const handleHotelTypeChange = (value) => {
    setHotelType(value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const filterHotels = () => {
    let filteredHotels = hotels;
    // Filter by price range
    filteredHotels = filteredHotels.filter(
      (hotel) => hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
    );
    // Filter by hotel type
    if (hotelType) {
      filteredHotels = filteredHotels.filter((hotel) => hotel.type === hotelType);
    }
    // Filter by rating
    filteredHotels = filteredHotels.filter(
      (hotel) => hotel.rating >= rating[0] && hotel.rating <= rating[1]
    );
    return filteredHotels;
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img src={`data:image/jpeg;base64,${image}`} style={{ width: 120, height: 70 }} alt="Hotel" />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Description',
      dataIndex: 'hotel_description',
      key: 'hotel_description',
    },
    {
      title: 'Price in $',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      sorter: (a, b) => a.rating - b.rating,
    },
  ];

  const dataSource = filterHotels().map((hotel) => ({
    ...hotel,
    key: hotel.id,
  }));
  
  return (
  <div>
  <NavBar />
  <div style={{ margin: '16px', display: 'flex', justifyContent: 'space-between' }}>
  <div>
  <h2>Filter Options</h2>
  <div style={{ marginBottom: '16px' }}>
  <h4>Price Range</h4>
  <Slider
             range
             value={priceRange}
             min={0}
             max={1000}
             onChange={handlePriceRangeChange}
             step={10}
           />
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <span>${priceRange[0]}</span>
  <span>${priceRange[1]}</span>
  </div>
  </div>
  <div style={{ marginBottom: '16px' }}>
  <h4>Hotel Type</h4>
  <select value={hotelType} onChange={(e) => handleHotelTypeChange(e.target.value)}>
  <option value="">All</option>
  <option value="luxury">Luxury</option>
  <option value="economy">Economy</option>
  <option value="budget">Budget</option>
  </select>
  </div>
  <div>
  <h4>Rating</h4>
  <Slider
             range
             value={rating}
             min={1}
             max={5}
             onChange={handleRatingChange}
             step={1}
           />
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <span>{rating[0]} stars</span>
  <span>{rating[1]} stars</span>
  </div>
  </div>
  </div>
  <div style={{ flex: '1', marginLeft: '16px' }}>
  <h2>Hotel Selection</h2>
  <Table
  dataSource={dataSource}
  columns={columns}
  pagination={{ pageSize: 10 }}
  onRow={(record) => {
  return {
  onClick: () => handleHotelSelection(record),
  };
  }}
  />
  </div>
  </div>
  </div>
  );
  };
  
  export default HotelSelection;