import React, { useState, useEffect, Fragment } from 'react';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import Card from '../styled-components/Card';
import Button from '../styled-components/Button';
import Spinner from '../components/Spinner';
import API, { graphqlOperation } from '@aws-amplify/api';
import { Group, Genre, Country, Person } from '../types/ArtistTypes';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

interface GroupProps {
  id: { id: number };
}

const GroupPage: React.FC<GroupProps> = ({ id }) => {
  const [groupData, setGroupData] = useState<Group | null>(null);
  const [toggleUpdateGroup, setToggleUpdateGroup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedType, setUpdatedType] = useState('');
  const [updatedDateFormed, setUpdatedDateFormed] = useState('');
  const [updatedMajorGenre, setUpdatedMajorGenre] = useState({ id: 0, name: '' });
  const [updatedMinorGenre, setUpdatedMinorGenre] = useState({ id: 0, name: '' });
  const [updatedCountry, setUpdatedCountry] = useState({ id: 0, name: '' });
  const [updatePersons, setUpdatePersons] = useState<Person[]>([]);

  const [availableMajorGenres, setAvailableMajorGenres] = useState<Genre[]>([]);
  const [availableMinorGenres, setAvailableMinorGenres] = useState<Genre[]>([]);
  const [availableCountries, setAvailableCountries] = useState<Country[]>([]);

  // fetch all data for the group
  useEffect(() => {
    queryGroupData();
  }, []);

  // Fetch all country and genre info when component mounts
  useEffect(() => {
    fetchCountries();
    fetchGenres();
  }, []);

  async function queryGroupData() {
    try {
      setIsLoading(true);
      const groupDataResults: any = await API.graphql(
        graphqlOperation(queries.group, { id: id.id })
      );
      console.log({ groupDataResults });
      setGroupData(groupDataResults.data.group);
      resetUpdateData();
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete() {
    try {
      await API.graphql(graphqlOperation(mutations.deleteGroup, { id: id.id }));
      console.log('Successfully deleted artist');
    } catch (err) {
      console.log('error: ', err);
    }
  }

  async function handleUpdate() {
    const updatedGroup = {
      id,
      name: updatedName,
      type: updatedType,
      dateFormed: updatedDateFormed,
      majorGenreId: updatedMajorGenre.id,
      minorGenreId: updatedMinorGenre.id,
      countryId: updatedCountry.id,
      // persons: updatedPersons
    };
    try {
      await API.graphql(
        graphqlOperation(mutations.updateGroup, {
          input: updatedGroup,
        })
      );
      console.log('Successfully updated artist');
    } catch (err) {
      console.log('error: ', err);
    }
    setToggleUpdateGroup(false);
  }

  // reset update field values when toggling between read and update mode
  function resetUpdateData() {
    if (groupData) {
      setToggleUpdateGroup((prevState) => !prevState);
      setUpdatedName(groupData.name);
      setUpdatedType(groupData.type);
      setUpdatedDateFormed(groupData.dateFormed);
      setUpdatedMajorGenre(groupData.majorGenre);
      setUpdatedMinorGenre(groupData.minorGenre);
      setUpdatedCountry(groupData.country);
      // setUpdatePersons(groupData.persons);
    }
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

  async function fetchGenres() {
    try {
      const majorGenreData: any = await API.graphql({ query: queries.majorGenres });
      const minorGenreData: any = await API.graphql({ query: queries.minorGenres });
      setAvailableMajorGenres(majorGenreData.data.majorGenres);
      setAvailableMinorGenres(minorGenreData.data.minorGenres);
    } catch (err) {
      console.log('error: ', err);
    }
  }

  function handleUpdateMajorGenre(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedGenre = availableMajorGenres.find((genre) => genre.id === Number(e.target.value));
    if (selectedGenre) setUpdatedMajorGenre(selectedGenre);
  }

  function handleUpdateMinorGenre(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedGenre = availableMinorGenres.find((genre) => genre.id === Number(e.target.value));
    if (selectedGenre) setUpdatedMinorGenre(selectedGenre);
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
      {groupData && toggleUpdateGroup && (
        <Fragment>
          <input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
          <select value={updatedType} onChange={(e) => setUpdatedType(e.target.value)}>
            <option>Select type</option>
            <option value="BAND">BAND</option>
            <option value="ORCHESTRA">ORCHESTRA</option>
          </select>
          <input
            type="date"
            value={updatedDateFormed}
            onChange={(e) => setUpdatedDateFormed(e.target.value)}
          />
          <select value={updatedMajorGenre.id} onChange={(e) => handleUpdateMajorGenre(e)}>
            {availableMajorGenres &&
              availableMajorGenres.map((majorGenre) => (
                <option key={uuid()} value={majorGenre.id}>
                  {majorGenre.name}
                </option>
              ))}
          </select>
          <select value={updatedMinorGenre.id} onChange={(e) => handleUpdateMinorGenre(e)}>
            {availableMinorGenres &&
              availableMinorGenres.map((minorGenre) => (
                <option key={uuid()} value={minorGenre.id}>
                  {minorGenre.name}
                </option>
              ))}
          </select>

          <select value={updatedCountry.id} onChange={handleUpdateCountry}>
            {availableCountries.length &&
              availableCountries.map((country: Country) => (
                <option key={uuid()} value={country.id}>
                  {country.name}
                </option>
              ))}
          </select>
          {/* <ul>
            {persons.map((person) => (
              <li key={person.id}>{person.name}</li>
            ))}
          </ul> */}
          <Button onClick={handleUpdate}>Submit Changes</Button>
          <Button color={'light'} onClick={resetUpdateData}>
            Cancel Edit
          </Button>
        </Fragment>
      )}
      {groupData && !toggleUpdateGroup && (
        <Fragment>
          <h3>{groupData.name}</h3>
          <p>Type: {groupData.type}</p>
          <p>Date formed: {groupData.dateFormed}</p>
          <p>Major genre: {groupData.majorGenre ? groupData.majorGenre.name : 'none found'}</p>
          <p>Minor Genre: {groupData.minorGenre ? groupData.minorGenre.name : 'none found'}</p>
          <p>Country: {groupData.country ? groupData.country.name : 'none found'}</p>
          <p>Persons</p>
          {/* <ul>
            {persons.map((person) => (
              <li key={person.id}>{person.name}</li>
            ))}
          </ul> */}
          <Button onClick={() => setToggleUpdateGroup(true)}>Edit Artist Info</Button>
          <Button color={'light'} onClick={handleDelete}>
            Delete
          </Button>
        </Fragment>
      )}
    </Card>
  );
};

export default GroupPage;
