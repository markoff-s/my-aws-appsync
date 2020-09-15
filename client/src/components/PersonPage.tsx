import React, { useState, useEffect, Fragment } from 'react';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Card from '../styled-components/Card';
import Button from '../styled-components/Button';
import Spinner from '../components/Spinner';
import API, { graphqlOperation } from '@aws-amplify/api';
import { Person, Group, Country } from '../types/ArtistTypes';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

interface PersonProps {
  id: { id: number };
}

const PersonPage: React.FC<PersonProps> = ({ id }) => {
  const [personData, setPersonData] = useState<Person | null>(null);
  const [personDeleted, setPersonDeleted] = useState(false);
  const [toggleUpdatePerson, setToggleUpdatePerson] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedType, setUpdatedType] = useState('');
  const [updatedDateOfBirth, setUpdatedDateOfBirth] = useState('');
  const [updatedCountry, setUpdatedCountry] = useState<Country>({ id: 0, name: '' });
  const [updatedGroups, setUpdatedGroups] = useState<Group[]>([]);

  const [availableCountries, setAvailableCountries] = useState<Country[]>([]);
  const [availableGroups, setAvailableGroups] = useState<Group[]>();

  // fetch all data for the person
  useEffect(() => {
    queryPersonData();
  }, []);

  async function queryPersonData() {
    setIsLoading(true);
    try {
      const personDataResults: any = await API.graphql(
        graphqlOperation(queries.artist, { id: id.id })
      );
      setPersonData(personDataResults.data.artist);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }

  async function handleDelete() {
    setIsLoading(true);
    try {
      await API.graphql(graphqlOperation(mutations.deleteArtist, { id: id.id }));
      console.log('Successfully deleted artist');
      setPersonDeleted(true);
    } catch (err) {
      console.log('error: ', err);
    }
    setIsLoading(false);
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
    const updatedArtist = {
      id: id.id,
      name: updatedName,
      type: updatedType,
      dob: updatedDateOfBirth,
      countryId: updatedCountry.id,
      // groups: updatedGroups,
    };
    try {
      await API.graphql(graphqlOperation(mutations.updateArtist, { input: updatedArtist }));

      console.log('Successfully updated person');
      setToggleUpdatePerson(false);
      queryPersonData();
    } catch (err) {
      console.log('error: ', err);
      setToggleUpdatePerson(false);
    }
  }

  function resetUpdateData() {
    if (personData) {
      setUpdatedName(personData.name);
      setUpdatedType(personData.type);
      setUpdatedDateOfBirth(moment(personData.dob).format('YYYY-MM-DD'));
      setUpdatedCountry(personData.country);
      // setUpdatedGroups(personData.groups);
    }
  }

  return (
    <Card>
      <Link to="/search">
        <Button>Go Back</Button>
      </Link>
      {isLoading && (
        <Card>
          <Spinner />
        </Card>
      )}
      {personDeleted && (
        <Fragment>
          <h2>Artist successfully deleted.</h2>
          <Link to="/search">
            <Button>Back to Search</Button>
          </Link>
        </Fragment>
      )}
      {personData && toggleUpdatePerson && !personDeleted && (
        <Fragment>
          <input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
          <label htmlFor="type-select">Type</label>
          <select
            name="type-select"
            value={updatedType}
            onChange={(e) => setUpdatedType(e.target.value)}
          >
            <option value="NATURAL_PERSON">Natural Person</option>
            <option value="UNNATURAL_PERSON">Unnatural Person</option>
          </select>
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
          <Button
            color={'light'}
            onClick={() => {
              resetUpdateData();
              setToggleUpdatePerson(false);
            }}
          >
            Cancel Edit
          </Button>
        </Fragment>
      )}
      {personData && !toggleUpdatePerson && !personDeleted && (
        <Fragment>
          <h3>{personData.name}</h3>
          <p>{personData.type}</p>
          <p>{moment(personData.dob).format('YYYY-MM-DD')}</p>
          <p>{personData.country ? personData.country.name : 'none found'}</p>
          {/* <ul>
            {groups.map((group) => (
              <li key={group.id}>{group.name}</li>
            ))}
          </ul> */}
          <Button
            onClick={() => {
              resetUpdateData();
              setToggleUpdatePerson(true);
            }}
          >
            Edit Artist Info
          </Button>
          <Button color={'light'} onClick={handleDelete}>
            Delete
          </Button>
        </Fragment>
      )}
    </Card>
  );
};

export default PersonPage;
