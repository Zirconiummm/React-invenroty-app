import React, { useState } from 'react';
import '../css/style.css';

const SearchComponent = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    props.setFilter(prevFilter => ({
      ...prevFilter,
      search: newSearchTerm // Используйте newSearchTerm здесь
    }));
  }

  return (
    <form className="search-form" onSubmit={(event) => event.preventDefault()}>
      <input
        className="search-input"
        type="text"
        placeholder="Введите запрос для поиска..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {/* Кнопка теперь не нужна, так как поиск происходит при вводе */}
    </form>
  );
};

export default SearchComponent;