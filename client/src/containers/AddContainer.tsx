import React, { useState } from 'react';
import Button from '../styled-components/Button';
import AddArtist from '../components/AddArtist';
import AddGroup from '../components/AddGroup';
import { Group, Person } from '../types/ArtistTypes';

interface Props {
  handleDisplayReset: () => void;
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
  setPersons: React.Dispatch<React.SetStateAction<Person[]>>;
}

const AddContainer: React.FC<Props> = ({ handleDisplayReset, setGroups, setPersons }) => {
  const [toggleArtist, setToggleArtist] = useState(true);
  const [toggleGroup, setToggleGroup] = useState(false);

  const handleToggle = () => {
    setToggleArtist((prevState) => !prevState);
    setToggleGroup((prevState) => !prevState);
  };

  return (
    <div className="add-container">
      <Button onClick={handleDisplayReset} color="light">
        Back to Search
      </Button>
      <div className="buttons">
        <Button onClick={handleToggle}>Add Artist</Button>
        <Button onClick={handleToggle}>Add Group</Button>
      </div>
      {toggleArtist && <AddArtist setPersons={setPersons} />}
      {toggleGroup && <AddGroup setGroups={setGroups} />}
    </div>
  );
};

export default AddContainer;
