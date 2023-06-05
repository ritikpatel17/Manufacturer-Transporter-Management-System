import { useState, useEffect } from 'react';
import { Link, useLocation, Route ,Routes} from 'react-router-dom';
import axios from 'axios';
import ManufacturerForm from './ManufacturerForm';

const ManufacturerLanding = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const { pathname } = location;
  const [username, setUsername] = useState('');
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    // Get username from pathname
    const username = pathname.substring(pathname.lastIndexOf('/') + 1);
    setUsername(username);

    // Fetch orders
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/manufacturerOrders?manufacturer=${username}`);
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, [pathname, username]);

  useEffect(() => {
    // Filter orders based on search query
    const filtered = orders.filter(
      (order) =>
        order.orderid.includes(searchQuery) ||
        order.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.from.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [orders, searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Manufacturer</h1>
      <h2 className="text-2xl font-bold mb-4">Welcome, {username}!</h2>

      <div className="mb-4">
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Search by Order ID, To or From"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <h2 className="text-2xl font-semibold mb-2">Your Orders:</h2>

      {filteredOrders.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-bold mb-2">Order ID: {order.orderid}</h2>
              <p className="text-base mb-2">To: {order.to}</p>
              <p className="text-base mb-2">From: {order.from}</p>
              <p className="text-base mb-2">Quantity: {order.quantity}</p>
              <p className="text-base mb-2">Address: {order.address}</p>
              <p className="text-base mb-2">Transporter: {order.transporter}</p>
              <p className="text-base font-bold mb-2">Price: {order.price}</p>
              
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg">No orders found.</p>
      )}

      <div className="mt-4"><Link to={`/manufacturerForm/${username}`} className="text-blue-500 font-semibold">
        Go to Manufacturer Form
      </Link>
      
      <Routes>
        <Route path="/manufacturerForm/:username" element={<ManufacturerForm />} />
      </Routes>
      </div>
        {/* <Routes><Route path={'/manufacturerForm/:username'} component={ManufacturerForm} /></Routes> */}
      
    </div>
  );
};

export default ManufacturerLanding;
