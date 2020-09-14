import React, { useState, useEffect, Fragment } from 'react';
import Card from '../styled-components/Card';
import Button from '../styled-components/Button';
import API, { graphqlOperation } from '@aws-amplify/api';
import { Person, Group, Country } from '../types/ArtistTypes';
import * as queries from '../graphql/queries';
// TODO: import edit/delete mutations when they're ready
import * as mutations from '../graphql/mutations';

interface PersonProps {
  person: Person;
  setPersons: React.Dispatch<React.SetStateAction<any>>;
  handleGoBack: () => void;
}

const PersonPage: React.FC<PersonProps> = ({ person, setPersons, handleGoBack }) => {
  const { id, name, type, dob, groups } = person;
  const country = { id: 73, name: 'China' };
  const [toggleUpdatePerson, setToggleUpdatePerson] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedType, setUpdatedType] = useState(type);
  const [updatedDateOfBirth, setUpdatedDateOfBirth] = useState(dob);
  const [updatedCountry, setUpdatedCountry] = useState(country);
  const [updatedGroups, setUpdatedGroups] = useState<Group[]>(groups);

  const [availableCountries, setAvailableCountries] = useState<Country[]>([]);
  const [availableGroups, setAvailableGroups] = useState<Group[]>();

  async function handleDelete() {
    setPersons((prevState: any) => prevState.filter((person: Person) => person.id !== Number(id)));
    console.log({ id });
    try {
      await API.graphql(graphqlOperation(mutations.deleteArtist, { id }));
      console.log('Successfully deleted artist');
    } catch (err) {
      console.log('error: ', err);
    }
  }

  useEffect(() => {
    fetchCountries();
    // fetchGroups();
  }, []);

  async function fetchGroups() {
    try {
      const groupsData: any = await API.graphql({ query: queries.groups });
      setAvailableGroups(groupsData.data.groups);
    } catch (err) {
      console.log('err: ', err);
    }
  }

  async function addGroup(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = Number(e.target.value);
    if (val && availableGroups) {
      const updatedGroup = availableGroups.find((group) => group.id === val);
      if (updatedGroup && !updatedGroups.find((group) => group.id === val)) {
        setUpdatedGroups((prevState) => {
          const newState = [...prevState];
          newState.push(updatedGroup);
          return newState;
        });
      }
    }
  }

  async function removeGroup(id: number) {
    setUpdatedGroups((prevState) => {
      return prevState.filter((group) => group.id !== id);
    });
  }

  async function fetchCountries() {
    try {
      const countryData: any = await API.graphql({ query: queries.countries });
      setAvailableCountries(countryData.data.countries);
    } catch (err) {
      console.log('error: ', err);
    }
  }

  async function handleUpdateCountry(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = Number(e.target.value);
    const newCountry = availableCountries.find((country) => country.id === val);
    if (newCountry) setUpdatedCountry(newCountry);
  }

  async function handleUpdate() {
    setPersons((prevState: Person[]) => {
      const updateIdx = prevState.findIndex((person: Person) => person.id === id);
      const updatedPerson = { ...prevState[updateIdx] };
      updatedPerson.name = updatedName;
      updatedPerson.type = updatedType;
      updatedPerson.dob = updatedDateOfBirth;
      updatedPerson.country = updatedCountry;
      // updatedPerson.groups = updatedGroups;

      const personsCopy = [...prevState];
      personsCopy[updateIdx] = updatedPerson;

      return personsCopy;
    });

    try {
      await API.graphql({
        query: mutations.updateArtist,
        variables: {
          input: {
            id,
            name: updatedName,
            type: updatedType,
            dob: updatedDateOfBirth,
            countryId: updatedCountry.id,
            // groups: updatedGroups,
          },
        },
      });
      console.log('Successfully updated person');
    } catch (err) {
      console.log('error: ', err);
    }
    setToggleUpdatePerson(false);
  }

  const handleUpdateToggle = () => {
    setToggleUpdatePerson((prevState) => !prevState);
    setUpdatedName(name);
    setUpdatedType(type);
    setUpdatedDateOfBirth(dob);
    setUpdatedCountry(country);
    // setUpdatedGroups(groups);
  };

  return (
    <Card>
      <Button onClick={handleGoBack}>Go Back</Button>
      {toggleUpdatePerson ? (
        <Fragment>
          <input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
          <input type="text" value={updatedType} onChange={(e) => setUpdatedType(e.target.value)} />
          <input
            type="date"
            value={updatedDateOfBirth}
            onChange={(e) => setUpdatedDateOfBirth(e.target.value)}
          />
          <select value={updatedCountry.id} onChange={handleUpdateCountry}>
            {availableCountries.length &&
              availableCountries.map((country: Country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
          </select>
          {/* <select value="" onChange={addGroup}>
            <option value={0}>Select a Group</option>
            {availableGroups &&
              availableGroups.map((group: Group) => (
                <option value={Number(group.id)}>{group.name}</option>
              ))}
          </select>
          {updatedGroups && (
            <ul>
              {updatedGroups.map((group: Group) => (
                <div>
                  <li key={group.id}>{group.name}</li>
                  <button onClick={() => removeGroup(group.id)}>Remove</button>
                </div>
              ))}
            </ul>
          )} */}
          <Button onClick={handleUpdate}>Submit Changes</Button>
          <Button color={'light'} onClick={handleUpdateToggle}>
            Cancel Edit
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          <h3>{name}</h3>
          <p>{type}</p>
          <p>{dob}</p>
          <p>{country.name}</p>
          {/* <ul>
            {groups.map((group) => (
              <li key={group.id}>{group.name}</li>
            ))}
          </ul> */}
          <Button onClick={handleUpdateToggle}>Edit Artist Info</Button>
          <Button color={'light'} onClick={handleDelete}>
            Delete
          </Button>
        </Fragment>
      )}
    </Card>
  );
};

export default PersonPage;
