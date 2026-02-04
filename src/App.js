import './App.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [reviews, setReviews] = useState('');
  const [available, setAvailable] = useState(false);
  const [description, setDescription] = useState(''); // optional

  const [searchName, setSearchName] = useState('');
  const [cookieList, setCookieList] = useState([]); // dynamic list

  // Fetch all cookies on page load
  useEffect(() => {
    Axios.get("http://localhost:3001/api/crumbl/search")
      .then((res) => setCookieList(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Submit new cookie
  const submitCookie = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:3001/api/insert", {
      name: name,
      calories: calories,
      reviews: reviews,
      available: available
    })
    .then(() => {
      alert('Cookie inserted successfully 🍪');

      // Add the new cookie to the list immediately
      setCookieList(prev => [...prev, {
        name,
        calories,
        reviews,
        available
      }]);

      // Clear form
      setName('');
      setCalories('');
      setReviews('');
      setAvailable(false);
      setDescription('');
    })
    .catch((err) => {
      console.error(err);
      alert('Error inserting cookie');
    });
  };

  // Search cookies by name
  const searchCookie = (e) => {
    e.preventDefault();

    Axios.get(`http://localhost:3001/api/crumbl/search?name=${searchName}`)
      .then((res) => setCookieList(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🍪 Crumbl Cookie Tracker</h1>
        <p>Find your favorite Crumbl cookies and add new ones as they drop.</p>
      </header>

      <img
        src="https://www.tastingtable.com/img/gallery/best-crumbl-cookies-ranked/l-intro-1649045321.jpg"
        alt="Crumbl Cookies"
        className="banner"
      />

      {/* ADD COOKIE FORM */}
      <section className="form-section">
        <h2>Add a New Cookie</h2>
        <form onSubmit={submitCookie}>
          <input
            type="text"
            placeholder="Cookie name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Calories..."
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            required
          />
          <input
            type="number"
            step="0.1"
            placeholder="Reviews (0-5)"
            value={reviews}
            onChange={(e) => setReviews(e.target.value)}
          />
          <label>
            Available:
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            />
          </label>
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </section>

      {/* SEARCH FORM */}
      <section className="form-section">
        <h2>Search Cookies</h2>
        <form onSubmit={searchCookie}>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </section>

      {/* COOKIE LIST */}
      <section className="cookie-list">
        <h2>Cookies</h2>
        <ul>
          {cookieList.length === 0 ? (
            <li>No cookies found</li>
          ) : (
            cookieList.map((cookie, index) => (
              <li key={index}>
                <strong>{cookie.name}</strong> | Calories: {cookie.calories} | Reviews: {cookie.reviews} | Available: {cookie.available ? 'Yes' : 'No'}
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}

export default App;
