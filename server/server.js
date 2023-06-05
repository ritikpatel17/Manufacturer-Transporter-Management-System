const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const cors = require('cors');
const bcrypt = require('bcrypt');
const Order = require('./models/Order');
const app = express();
app.use(cors());

const port = 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });


  // Perform registration logic and save data to MongoDB
  // Define the registration route
  app.post('/api/register', async (req, res) => {
    const { username, name, password, confirmpassword, role } = req.body;
  
    try {
        //check if the password and confirm password matches or not
        if(password!=confirmpassword) {
            console.log("confirm password is not same as Password.");
            return res.json({ message: 'confirm password is not same as Password.' });
        }
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        console.log("User already Regestered");
        return res.status(400).json({ error: 'Username already exists' });
      }
      // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user instance
      const newUser = new User({
        username,
        name,
        password:hashedPassword,
        role,
      });
  
      // Save the user to the database
      await newUser.save();
      console.log("User Regestered");
      return res.json({ message: 'Registration successful' });
    } catch (error) {
      console.error('Registration error:', error);
      return res.status(500).json({ error: 'An error occurred during registration' });
    }
  });
  
  // Login endpoint
app.post('/api/login', async (req, res) => {
    const { username, password ,role} = req.body;
  
    try {
      // Find the user by username
      const user = await User.findOne({ username });
  
      if (user&&role==user.role) {
        // Compare the password with the stored hash
        const isPasswordValid = await bcrypt.compare(password, user.password);
  
        if (isPasswordValid) {
          // Password is valid, user is authenticated
          console.log("Login Successful");
          // res.status(200).json({ message: 'Login successful' });
          res.status(200).json({ message : true});
        } else {
          // Invalid password
          console.log("Invalid Password");
          res.status(401).json({ message: false });
        }
      } else {
        // User not found
        console.log("User not found");
        res.status(404).json({ message: false });
      }
    } catch (error) {
      res.status(500).json({ message: false });
    }
  });


  app.get('/api/transporter', async(req, res) => {
    const role = "transporter";
    const user = await User.find({role});
    res.json(user);
  });

  function generateOrderID() {
    const alphanumericCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let orderId = '';
    for (let i = 0; i < 5; i++) {
      orderId += alphanumericCharacters.charAt(
        Math.floor(Math.random() * alphanumericCharacters.length)
      );
    }
    return orderId;
  }

  app.get('/api/generateId', async (req, res) => {
    try {
      let id = generateOrderID();
      let found = await Order.findOne({ orderid: id });
  
      while (found) {
        id = generateOrderID();
        found = await Order.findOne({ orderid: id });
      }
  
      res.json(id);
    } catch (error) {
      console.error('Error generating ID:', error);
      res.status(500).json({ error: 'An error occurred while generating ID' });
    }
  });
  
  // API endpoint for handling the form submission
app.post('/api/orderfromManufacturer', async (req, res) => {
  const { orderid, to, from, quantity, address, transporter, manufacturer } = req.body;

  try {
    const id = await Order.findOne({ orderid });
    if(id) {
      return res.json(id);
    }
    // Check if the fields are valid
    if (to.length === 0) {
      console.log("Enter correct 'to'...");
      return res.json({ message: 'Enter correct "to"...' });
    }
    if (from.length === 0) {
      console.log("Enter correct 'from'...");
      return res.json({ message: 'Enter correct "from"...' });
    }
    if (transporter === 'Select the transporter') {
      console.log("Select correct transporter...");
      return res.json({ message: 'Select correct transporter...' });
    }

    // Create a new order instance
    const newOrder = new Order({
      orderid,
      manufacturer, // Assuming you have a logged-in user with an associated _id
      transporter,
      quantity,
      to,
      from,
      address,
    });


    
    // Save the order to the database
    await newOrder.save();

    console.log('Order Registered from manufacturer');
    // return res.json({ message: 'Registration successful from manufacturer' });
    return res.json(newOrder);
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'An error occurred during registration' });
  }
});

app.patch('/api/responseFromTransporter', async (req, res) => {
  const { orderid, price } = req.body;

  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { orderid },
      { price },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // return res.json(updatedOrder);
      return res.json(await Order.findOne({ orderid }));
  } catch (error) {
    console.error('Error updating order:', error);
    return res.status(500).json({ error: 'An error occurred while updating the order' });
  }
});


app.get('/api/Transporterorders', async(req, res) => {
  const transporter = req.query.transporter;
  const orders = await Order.find({transporter});
  res.json(orders);
});

app.get('/api/Manufacturerorders', async(req, res) => {
  const manufacturer = req.query.manufacturer;
  const orders = await Order.find({manufacturer});
  res.json(orders);
});

app.get('/api/TransportorderOptions', async(req, res) => {
  const transporter = req.query.transporter;
  const orders = await Order.find({transporter});
  res.json(orders);
});

app.get('/api/transporterOptions', async(req, res) => {
  const role = "transporter";
  const user = await User.find({role});
  res.json(user);
});

    
    


  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
