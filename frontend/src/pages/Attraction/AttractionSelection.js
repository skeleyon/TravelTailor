import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Checkbox, Button, Image } from 'antd';
import NavBar from '../../components/NavBar';

const AttractionSelection = () => {
  const [attractions, setAttractions] = useState([]);
  const [selectedAttractions, setSelectedAttractions] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setAttractions(location.state?.data || []);
  }, [location.state]);

  const handleAttractionSelect = (attraction) => {
    const updatedSelectedAttractions = [...selectedAttractions];
    const attractionIndex = selectedAttractions.findIndex(
      (selectedAttraction) => selectedAttraction.title === attraction.title
    );

    if (attractionIndex > -1) {
      updatedSelectedAttractions.splice(attractionIndex, 1);
    } else {
      updatedSelectedAttractions.push(attraction);
    }

    setSelectedAttractions(updatedSelectedAttractions);
  };

  const columns = [
    {
      title: '',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <Image
          src={`data:image/jpeg;base64,${image}`}
          alt="Attraction"
          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, attraction) => (
        <Checkbox
          checked={selectedAttractions.some(
            (selectedAttraction) => selectedAttraction.title === attraction.title
          )}
          onChange={() => handleAttractionSelect(attraction)}
        />
      ),
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle submit logic with selectedAttractions array
    console.log('Selected Attractions:', selectedAttractions);

    const attraction_ids = selectedAttractions.map(selectedAttractions => selectedAttractions.id);
    console.log(attraction_ids)

    try {
      const response = await fetch('http://localhost:8000/attraction-details/book-attraction/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          id: attraction_ids
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
      <div style={{ margin: '24px' }}>
        <Table
          dataSource={attractions}
          columns={columns}
          rowKey={(attraction) => attraction.title}
          pagination={false}
        />
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AttractionSelection;
