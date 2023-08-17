import React, { useState } from 'react';
import { Header } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const submit = event => {
    event.preventDefault();

    onSubmit(searchQuery);
  };

  return (
    <Header className="searchbar">
      <form onSubmit={submit} className="form">
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <input
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </Header>
  );
};
export default Searchbar;
