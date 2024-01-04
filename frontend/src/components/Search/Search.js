// Search.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './search.module.css';

Search.defaultProps = {
  searchRoute: '/search/',
  defaultRoute: '/',
};

export default function Search({ searchRoute, defaultRoute, margin }) {
  const [term, setTerm] = useState('');
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();
  const { searchTerm } = useParams();

  useEffect(() => {
    setTerm(searchTerm ?? '');
  }, [searchTerm]);

  const search = async () => {
    if (!term) {
      setShake(true);
      setTimeout(() => setShake(false), 500); // Reset shake after 500ms
    } else {
      navigate(searchRoute + term);
    }
  };

  return (
    <div className={`${classes.container} ${shake ? classes.shake : ''}`} style={{ margin }}>
      <input
        type="text"
        placeholder="Search Sweets"
        onChange={(e) => setTerm(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' && search()}
        value={term}
      />
      <button onClick={search}>Search</button>
    </div>
  );
}
