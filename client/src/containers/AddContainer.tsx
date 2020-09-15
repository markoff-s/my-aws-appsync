import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../styled-components/Button';
import AddPerson from '../components/AddPerson';
import AddGroup from '../components/AddGroup';

const AddContainer: React.FC = () => {
  const [toggleArtist, setToggleArtist] = useState(true);
  const [toggleGroup, setToggleGroup] = useState(false);

  const handleToggleArtist = () => {
    setToggleArtist(true);
    setToggleGroup(false);
  };

  const handleToggleGroup = () => {
    setToggleArtist(false);
    setToggleGroup(true);
  };

  return (
    <div className="add-container">
      <Link to="/search">
        <Button color="light">Back to Search</Button>
      </Link>
      <div className="buttons">
        <Button onClick={handleToggleArtist}>Add Artist</Button>
        <Button onClick={handleToggleGroup}>Add Group</Button>
      </div>
      {toggleArtist && <AddPerson />}
      {toggleGroup && <AddGroup />}
    </div>
  );
};

export default AddContainer;
