import React, { useState, useEffect } from 'react';
import { getGames } from '../api/gamesApi';
import GameList from '../components/GameList';
import Loader from '../components/Loader';
import './HomePage.css';

import { Link, useLocation } from 'react-router-dom';


const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="nav-bar">
      <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Video Games</Link>
      <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
    </nav>
  );
};


const HomePage = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [minScore, setMinScore] = useState('');
  const [orderBy, setOrderBy] = useState('releaseDate');

  

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getGames();
        setGames(data);
        setFilteredGames(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching games', error);
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    let filtered = games.filter((game) =>
      game.attributes.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (minScore) {
      filtered = filtered.filter(game => game.attributes.rating >= minScore);
    }

    if (orderBy === 'releaseDate') {
      filtered.sort((a, b) => new Date(b.attributes.firstReleaseDate) - new Date(a.attributes.firstReleaseDate));
    } else if (orderBy === 'score') {
      filtered.sort((a, b) => b.attributes.rating - a.attributes.rating);
    } else if (orderBy === 'name') {
      filtered.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name));
    }

    setFilteredGames(filtered);
  }, [searchTerm, minScore, orderBy, games]);

  return (
    <div className="homepage-container">
        <div className="filter-section">
          <h2>Filter Results</h2>
          <div>
            <label>Name (contains)</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search games..."
            />
          </div>
          <div className='input-three-container'>
          <div className='input-three'>
            <label>Minimum Score</label>
            <input
              type="number"
              value={minScore}
              onChange={(e) => setMinScore(e.target.value)}
              placeholder="1 - 100"
            />
          </div>
          <div className='input-three'>
            <label>Order By</label>
            <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
              <option value="releaseDate">Release Date</option>
              <option value="score">Score</option>
              <option value="name">Name</option>
            </select>
          </div>
          <button className='input-three' onClick={() => {
            setSearchTerm('');
            setMinScore('');
            setOrderBy('releaseDate');
          }}>Clear</button>
        </div>
        </div>
        
        <div className="game-list-section">
          {loading ? <Loader /> : <GameList className='scroll-item' games={filteredGames} />}
        </div>
    </div>
  );
};

export default HomePage;
export {NavBar};
