import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory database
let bookings = [];

// Create Booking
app.post('/api/bookings', (req, res) => {
  const { date, time, guests, name, email, phone } = req.body;

  if (!date || !time || !guests || !name || !email || !phone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newBooking = {
    id: uuidv4(),
    date,
    time,
    guests,
    name,
    email,
    phone
  };

  bookings.push(newBooking);
  res.status(201).json(newBooking);
});

// Get Booking
app.get('/api/bookings/:id', (req, res) => {
  const booking = bookings.find(b => b.id === req.params.id);
  if (booking) {
    res.json(booking);
  } else {
    res.status(404).json({ error: 'Booking not found' });
  }
});

// Delete Booking
app.delete('/api/bookings/:id', (req, res) => {
  const index = bookings.findIndex(b => b.id === req.params.id);
  if (index !== -1) {
    bookings.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Booking not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

