import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function TransporterForm() {
  const { username } = useParams();
  const [orderid, setOrderID] = useState('');
  const [price, setPrice] = useState('');
  const [orderOptions, setOrderOptions] = useState([]);

  useEffect(() => {
    const fetchOrderOptions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/TransportorderOptions?transporter=${username}`);
        setOrderOptions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrderOptions();
  }, [username]);

  const handleOrderIDChange = (event) => {
    setOrderID(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send transporter response to the backend
      const response = await axios.patch('http://localhost:5000/api/responseFromTransporter', {
        orderid,
        price,
        
      });

      // Handle successful update
      console.log(response.data);

      // Reset the form fields
      setOrderID('');
      setPrice('');
    } catch (error) {
      // Handle update error
      console.error(error);
    }
  };

  return (
    <div className="max-w-[400px] w-full mx-auto mt-16">
      <h2 className="text-4xl font-bold text-center">Transporter Form</h2>
      <form className="bg-gray-900 rounded-lg p-8 mt-8">
        <div className="flex flex-col text-gray-400 py-2">
          <label htmlFor="orderid">Order ID</label>
          <select
            id="orderid"
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            value={orderid}
            onChange={handleOrderIDChange}
          >
            <option value="">Select an order ID</option>
            {orderOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.orderid}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col text-gray-400 py-2">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            type="text"
            value={price}
            onChange={handlePriceChange}
          />
        </div>
        <button
          className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
          onClick={handleSubmit}
        >
          Submit Response
        </button>
      </form>
    </div>
  );
}
