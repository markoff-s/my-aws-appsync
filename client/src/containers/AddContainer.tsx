import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../styled-components/Button';
import Card from '../styled-components/Card';
import AddPerson from '../components/AddPerson';
import AddGroup from '../components/AddGroup';

const AddContainer: React.FC = () => {
  const [toggleArtist, setToggleArtist] = useState(true);
  const [toggleGroup, setToggleGroup] = useState(false);
  const [message, setMessage] = useState('');
  const [displayMessage, setDisplayMessage] = useState(false);

  // display message when artist or group is added
  useEffect(() => {
    if (message) {
      setDisplayMessage(true);
      setTimeout(() => {
        setDisplayMessage(false);
        setMessage('');
      }, 3000);
    }
  }, [message]);

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
        <Button color={!toggleArtist ? 'light' : ''} onClick={handleToggleArtist}>
          Add Artist
        </Button>
        <Button color={!toggleGroup ? 'light' : ''} onClick={handleToggleGroup}>
          Add Group
        </Button>
      </div>
      {toggleArtist && <AddPerson setMessage={setMessage} />}
      {toggleGroup && <AddGroup setMessage={setMessage} />}
      {displayMessage && (
        <Card>
          <h3>{message}</h3>
        </Card>
      )}
    </div>
  );
};

export default AddContainer;
