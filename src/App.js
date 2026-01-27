import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>🍪 Crumbl Cookie Tracker</h1>
        <p>Find your favorite Crumbl cookies and add new ones as they drop.</p>
      </header>

      <img
        src="https://via.placeholder.com/600x300"
        alt="Crumbl Cookies"
        className="banner"
      />

      <section className="form-section">
        <h2>Add a New Cookie</h2>
        <form>
          <input type="text" placeholder="Cookie name..." />
          <textarea placeholder="Description (optional)" />
          <button type="submit">Submit</button>
        </form>
      </section>

      <section className="form-section">
        <h2>Search Cookies</h2>
        <form>
          <input type="text" placeholder="Search..." />
          <button type="submit">Search</button>
        </form>
      </section>

      <section className="cookie-list">
        <h2>Cookies</h2>
        <ul>
          <li>Milk Chocolate Chip</li>
          <li>Pink Sugar</li>
        </ul>
      </section>
    </div>
  );
}

export default App;
