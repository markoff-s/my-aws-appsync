import React from 'react';
import Card from '../styled-components/Card';
import Button from '../styled-components/Button';
import Input from '../styled-components/Input';
interface Props {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

const SearchContainer: React.FC<Props> = ({ searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <Card style={{ flexDirection: 'row' }} className="search-container">
      <select name="" id="">
        <option value="">Open Search</option>
      </select>
      <Input
        type="text"
        placeholder="Search Artists, ISNI, UAID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
    </Card>
  );
};

export default SearchContainer;
