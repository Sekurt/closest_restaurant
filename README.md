# closest_restaurant
 listing 5 restaurant in 10 km area
 In this code, getDistanceFromLatLonInKm() and deg2rad() functions are used to calculate the distance between two coordinates using the Haversine formula. The app.get() method takes the coordinates from the client and uses the pool.query() method to search for the nearest restaurants in the PostgreSQL database.

Note that a restaurant_branches table with latitude and longitude columns containing coordinate information should exist in the PostgreSQL database.
