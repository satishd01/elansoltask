const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
  name: String,
  dob: String,
  email: String,
  password: String
});

const User = mongoose.model('User', UserSchema);

// Register route
app.post('/api/register', async (req, res) => {
  const { name, dob, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, dob, email, password: hashedPassword });

  await user.save();

  const token = jwt.sign({ id: user._id }, 'secret');
  res.json({ token, user });
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, 'secret');
  res.json({ token, user });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
