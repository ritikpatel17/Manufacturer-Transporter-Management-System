import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ManufacturerForm() {
  const { username } = useParams();

  const [orderId, setOrderId] = useState('');
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [quantity, setQuantity] = useState('');
  const [address, setAddress] = useState('');
  const [transporter, setTransporter] = useState('');
  const [transporterOptions, setTransporterOptions] = useState([]);

  useEffect(() => {
    const fetchTransportOptions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/transporter`);
        setTransporterOptions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransportOptions();
  }, []);

  useEffect(() => {
    const fetchOrderId = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/generateId`);
        setOrderId(response.data);
        setAddress(username.address);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrderId();
  }, [username]);

  const handleOrderIdChange = (event) => {
    setOrderId(event.target.value.toUpperCase());
  };

  const handleToChange = (event) => {
    setTo(event.target.value);
  };

  const handleFromChange = (event) => {
    setFrom(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleTransporterChange = (event) => {
    setTransporter(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send order data to the backend
      const response = await axios.post('http://localhost:5000/api/orderfromManufacturer', {
        orderid: orderId,
        to,
        from,
        quantity,
        address,
        transporter,
        manufacturer: username,
      });

      // Handle successful order registration
      console.log(response.data);

      // Reset the form fields
      setOrderId('');
      setTo('');
      setFrom('');
      setQuantity('');
      setTransporter('');
    } catch (error) {
      // Handle order registration error
      console.error(error);
    }
  };

  return (
    <div className="max-w-[400px] w-full mx-auto mt-16">
      <h2 className="text-4xl font-bold text-center">Manufacturer Order Form</h2>
      <form className="bg-gray-900 rounded-lg p-8 mt-8">
        <div className="flex flex-col text-gray-400 py-2">
          <label htmlFor="orderId">Order ID</label>
          <input
            id="orderId"
            value={orderId}
            onChange={handleOrderIdChange}
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            placeholder="Enter an order ID"
          />
        </div>
        <div className="flex flex-col text-gray-400 py-2">
          <label htmlFor="to">To</label>
          <input
            id="to"
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            type="text"
            value={to}
            onChange={handleToChange}
            placeholder="Enter the destination"
          />
        </div>
        <div className="flex flex-col text-gray-400 py-2">
          <label htmlFor="from">From</label>
          <input
            id="from"
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            type="text"
            value={from}
            onChange={handleFromChange}
            placeholder="Enter the source"
          />
        </div>
        <div className="flex flex-col text-gray-400 py-2">
          <label htmlFor="quantity">Quantity</label>
          <select
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
          >
            <option value="">Select quantity</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="flex flex-col text-gray-400 py-2">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            value={address}
            onChange={handleAddressChange}
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            placeholder="Enter Address"
          />
        </div>
        <div className="flex flex-col text-gray-400 py-2">
          <label htmlFor="transporter">Transporter</label>
          <select
            id="transporter"
            value={transporter}
            onChange={handleTransporterChange}
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
          >
            <option value="">Select the transporter</option>
            {transporterOptions.map((transporter) => (
              <option key={transporter.id} value={transporter.username}>
                {transporter.username}
              </option>
            ))}
          </select>
        </div>
        <button
          className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
          onClick={handleSubmit}
        >
          Submit Order
        </button>
      </form>
    </div>
  );
}
