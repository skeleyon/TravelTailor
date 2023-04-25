import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Card, Button, message, Form, Input } from "antd";

const { Meta } = Card;

const Payment = () => {
  const [total, setTotal] = useState("");
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('/itinerary-details/get-price/')
      .then((response) => response.json())
      .then((data) => {
        setPrices(data);
        setTotal(data.total);
        console.log(data)
      })
      .catch((error) => console.error('Error fetching Prices:', error));
  }, []);

  const handlePaymentSubmit = (values) => {
    setLoading(true);
    // Perform payment processing logic here, e.g. making API call to payment gateway
    // Upon successful payment, navigate to confirmation page
    setTimeout(() => {
      setLoading(false);
      navigate('/explore');
    }, 2000);
  }

  return (
    <div>
      <h2>Payment Details</h2>
      <Card style={{ width: 300 }}>
        <Meta title="Total Amount" description={`$${total}`} />
        <p>Flight Price: ${prices.flight}</p>
        <p>Hotel Price: ${prices.hotel}</p>
      </Card>
      <Form onFinish={handlePaymentSubmit}>
        <Form.Item
          label="Card Number"
          name="cardNumber"
          rules={[
            { required: true, message: 'Please enter your card number' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Card Holder Name"
          name="cardHolderName"
          rules={[
            { required: true, message: 'Please enter card holder name' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Expiry Date"
          name="expiryDate"
          rules={[
            { required: true, message: 'Please enter expiry date' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="CVV"
          name="cvv"
          rules={[
            { required: true, message: 'Please enter CVV' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Pay
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Payment;
