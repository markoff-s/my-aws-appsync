import React from 'react';
import Card from '../../styled-components/Card';

interface Props {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContainer: React.FC<Props> = ({ searchTerm, setSearchTerm }) => {
  return (
    <Card style={{ flexDirection: 'row' }} className="search-container">
      <select name="" id="">
        <option value="">Open Search</option>
      </select>
      <input
        type="text"
        placeholder="Search Artists, ISNI, UAID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Card>
  );
};

export default SearchContainer;
