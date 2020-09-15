import React, { useState } from 'react';
import Card from '../styled-components/Card';
import Button from '../styled-components/Button';
import Input from '../styled-components/Input';
interface Props {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (searchType: string) => Promise<void>;
}

const SearchContainer: React.FC<Props> = ({ searchTerm, setSearchTerm, handleSearch }) => {
  const [searchType, setSearchType] = useState('');
  const triggerSearch = () => {
    if (searchType) {
      handleSearch(searchType);
    }
  };
  return (
    <Card style={{ flexDirection: 'row' }} className="search-container">
      <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
        <option value="">Search artists or groups</option>
        <option value="artists">Artists</option>
        <option value="groups">Groups</option>
      </select>
      <Input
        type="text"
        placeholder="Search Artists, ISNI, UAID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button onClick={triggerSearch}>Search</Button>
    </Card>
  );
};

export default SearchContainer;
