import React, { useState, Fragment } from 'react';
import Container from '../styled-components/Container';
import Button from '../styled-components/Button';
import API from '@aws-amplify/api';
import { Group } from '../types/ArtistTypes';
import { link } from 'fs';
import { person } from '../graphql/queries';
// TODO: create update method
// TODO: create delete method
// import { } from '../graphql/mutations';

interface GroupProps {
  group: Group;
  setGroups: React.Dispatch<React.SetStateAction<any>>;
}

const GroupCard: React.FC<GroupProps> = ({ group, setGroups }) => {
  const { name, type, dateFormed, majorGenre, minorGenre, country, persons } = group;
  console.log(group);
  const [toggleUpdateGroup, setToggleUpdateGroup] = useState(false);
  const [updateName, setUpdateName] = useState(name);
  const [updateType, setUpdateType] = useState(type);
  const [updateDateFormed, setUpdateDateFormed] = useState(dateFormed);
  const [updateMajorGenre, setUpdateMajorGenre] = useState(majorGenre.name);
  const [updateMinorGenre, setUpdateMinorGenre] = useState(minorGenre.name);
  const [updateCountry, setUpdateCountry] = useState(country.name);
  const [updatePersons, setUpdatePersons] = useState(persons);

  // TODO: handle delete
  // const handleDelete = async (id: string) => {
  //   setArtists((prevState: any) => prevState.filter((artist: any) => artist.id !== id));
  //   try {
  //     await API.graphql({ query: DeleteArtist, variables: { input: { id } } });
  //     console.log('Successfully deleted artist');
  //   } catch (err) {
  //     console.log('error: ', err);
  //   }
  // };

  // TODO: handle update
  // const handleUpdate = async (id: string) => {
  //   setGroups((prevState: any) => {
  //     const editedGroup = prevState.find((group: any) => group.id === id);
  //     editedGroup.name = updateName;
  //     editedGroup.type = updateType;
  //     editedGroup.dateFormed = updateDateFormed;
  //     editedGroup.majorGenre = updateMajorGenre;
  //     editedGroup.minorGenre = updateMinorGenre;
  //     editedGroup.country = updateCountry;
  //     editedGroup.persons = updatePersons;
  //     return [...prevState];
  //   });

  //   try {
  //     await API.graphql({
  //       query: update,
  //       variables: { input: { id, name: updateArtistName, description: updateArtistDescription } },
  //     });
  //     console.log('Successfully updated artist');
  //   } catch (err) {
  //     console.log('error: ', err);
  //   }
  //   setToggleUpdateArtist(false);
  // };

  const handleUpdateToggle = () => {
    setToggleUpdateGroup((prevState) => !prevState);
    setUpdateName(name);
    setUpdateType(type);
    setUpdateDateFormed(dateFormed);
    setUpdateMajorGenre(majorGenre.name);
    setUpdateMinorGenre(minorGenre.name);
    setUpdateCountry(country.name);
    setUpdatePersons(persons);
  };

  return (
    <Container>
      {toggleUpdateGroup ? (
        <Fragment>
          <input type="text" value={updateName} onChange={(e) => setUpdateName(e.target.value)} />
          <input type="text" value={updateType} onChange={(e) => setUpdateType(e.target.value)} />
          <input
            type="date"
            value={updateDateFormed}
            onChange={(e) => setUpdateDateFormed(e.target.value)}
          />
          <input
            type="text"
            value={updateMajorGenre}
            onChange={(e) => setUpdateMajorGenre(e.target.value)}
          />
          <input
            type="text"
            value={updateMinorGenre}
            onChange={(e) => setUpdateMinorGenre(e.target.value)}
          />
          <input
            type="text"
            value={updateCountry}
            onChange={(e) => setUpdateCountry(e.target.value)}
          />
          <ul>
            {persons.map((person) => (
              <li key={person.id}>{person.name}</li>
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
          <p>{dateFormed}</p>
          <p>{majorGenre.name}</p>
          <p>{minorGenre.name}</p>
          <p>{country.name}</p>
          <ul>
            {persons.map((person) => (
              <li key={person.id}>{person.name}</li>
            ))}
          </ul>
          <Button onClick={handleUpdateToggle}>Edit Artist Info</Button>
          <Button color={'red'} onClick={() => {}}>
            Delete
          </Button>
        </Fragment>
      )}
    </Container>
  );
};

export default GroupCard;
