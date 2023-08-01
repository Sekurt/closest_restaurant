import express from 'express';
import { Pool } from 'pg';

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'SEFA KURT', // PostgreSQL username
  host: 'localhost', // PostgreSQL server name
  database: 'restaurant_branches', // PostgreSQL database name
  password: 'admin', // PostgreSQL user password
  port: 5432, // PostgreSQL connection port
});

// Function for calculating distance between two points using Haversine formula
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in kilometers
  return d;
}

// Function for converting degrees to radians
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// Endpoint: returns the nearest 5 restaurants
app.get('/api/restaurants', async (req, res) => {
  const { lat, lon } = req.query;
  const radius = 10; // km - Search radius
  const limit = 5; // - Maximum number of results to return
  try {
    const result = await pool.query(
      `SELECT id, name, latitude, longitude, (${radius} * acos(cos(radians(${lat})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${lon})) + sin(radians(${lat})) * sin(radians(latitude)))) AS distance FROM restaurant_branches HAVING distance < ${radius} ORDER BY distance LIMIT ${limit}`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});