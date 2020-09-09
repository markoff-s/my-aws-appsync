import React, { useState, Fragment } from 'react';
import Card from '../styled-components/Card';
import Button from '../styled-components/Button';
import API from '@aws-amplify/api';
import { Person } from '../types/ArtistTypes';
// TODO: create update method
// TODO: create delete method
// import { } from '../graphql/mutations';

interface PersonProps {
  person: Person;
  setPersons: React.Dispatch<React.SetStateAction<any>>;
}

const PersonCard: React.FC<PersonProps> = ({ person, setPersons }) => {
  const { id, name, type, dob, country, groups } = person;
  const [toggleUpdatePerson, setToggleUpdatePerson] = useState(false);
  const [updateName, setUpdateName] = useState(name);
  const [updateType, setUpdateType] = useState(type);
  const [updateDateOfBirth, setUpdateDateOfBirth] = useState(dob);
  const [updateCountry, setUpdateCountry] = useState(country.name);
  const [updateGroups, setUpdateGroups] = useState(groups);

  // TODO: add delete to schema
  // const handleDelete = async (id: string) => {
  //   setArtists((prevState: any) => prevState.filter((artist: any) => artist.id !== id));
  //   try {
  //     await API.graphql({ query: DeleteArtist, variables: { input: { id } } });
  //     console.log('Successfully deleted artist');
  //   } catch (err) {
  //     console.log('error: ', err);
  //   }
  // };

  // const handleUpdate = async (id: string) => {
  //   setArtists((prevState: any) => {
  //     const editedArtist = prevState.find((artist: any) => artist.id === id);
  //     editedArtist.name = updateArtistName;
  //     editedArtist.description = updateArtistDescription;
  //     return [...prevState];
  //   });

  //   try {
  //     await API.graphql({
  //       query: UpdateArtist,
  //       variables: { input: { id, name: updateArtistName, description: updateArtistDescription } },
  //     });
  //     console.log('Successfully updated artist');
  //   } catch (err) {
  //     console.log('error: ', err);
  //   }
  //   setToggleUpdateArtist(false);
  // };

  const handleUpdateToggle = () => {
    setToggleUpdatePerson((prevState) => !prevState);
    setUpdateName(name);
    setUpdateType(type);
    setUpdateDateOfBirth(dob);
    setUpdateCountry(country.name);
    setUpdateGroups(groups);
  };

  return (
    <Card>
      {toggleUpdatePerson ? (
        <Fragment>
          <input type="text" value={updateName} onChange={(e) => setUpdateName(e.target.value)} />
          <input type="text" value={updateType} onChange={(e) => setUpdateType(e.target.value)} />
          <input
            type="date"
            value={updateDateOfBirth}
            onChange={(e) => setUpdateDateOfBirth(e.target.value)}
          />
          <input
            type="text"
            value={updateCountry}
            onChange={(e) => setUpdateCountry(e.target.value)}
          />

          <ul>
            {groups.map((group) => (
              <li key={group.id}>{group.name}</li>
            ))}
          </ul>
          <Button onClick={() => {}}>Submit Changes</Button>
          <Button color={'red'} onClick={handleUpdateToggle}>
            Cancel Edit
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          <h3>{name}</h3>
          <p>{type}</p>
          <p>{dob}</p>
          <p>{country.name}</p>
          <ul>
            {groups.map((group) => (
              <li key={group.id}>{group.name}</li>
            ))}
          </ul>
          <Button onClick={handleUpdateToggle}>Edit Artist Info</Button>
          <Button color={'red'} onClick={() => {}}>
            Delete
          </Button>
        </Fragment>
      )}
    </Card>
  );
};

export default PersonCard;
