import React, { useState, useEffect, Fragment } from 'react';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
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
  const [groupDeleted, setGroupDeleted] = useState(false);
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
    setIsLoading(true);
    try {
      const groupDataResults: any = await API.graphql(
        graphqlOperation(queries.group, { id: id.id })
      );
      setGroupData(groupDataResults.data.group);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }

  async function handleDelete() {
    setIsLoading(true);
    try {
      await API.graphql(graphqlOperation(mutations.deleteGroup, { id: id.id }));
      console.log('Successfully deleted artist');
      setGroupDeleted(true);
    } catch (err) {
      console.log('error: ', err);
    }
    setIsLoading(false);
  }

  async function handleUpdate() {
    const updatedGroup = {
      id: id.id,
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
      console.log('Successfully updated group');
      setToggleUpdateGroup(false);
      queryGroupData();
    } catch (err) {
      console.log('error: ', err);
      setToggleUpdateGroup(false);
    }
  }

  // reset update field values when toggling between read and update mode
  function resetUpdateData() {
    if (groupData) {
      setUpdatedName(groupData.name);
      setUpdatedType(groupData.type);
      setUpdatedDateFormed(moment(groupData.dateFormed).format('YYYY-MM-DD'));
      setUpdatedMajorGenre(
        groupData.majorGenre ? groupData.majorGenre : { id: 0, name: 'none found' }
      );
      setUpdatedMinorGenre(
        groupData.minorGenre ? groupData.minorGenre : { id: 0, name: 'none found' }
      );
      setUpdatedCountry(groupData.country ? groupData.country : { id: 0, name: 'none found' });
      // setUpdatePersons(groupData.persons);
    }
  }

  async function fetchCountries() {
    setIsLoading(true);
    try {
      const countryData: any = await API.graphql({ query: queries.countries });
      setAvailableCountries(countryData.data.countries);
    } catch (err) {
      console.log('error: ', err);
    }
    setIsLoading(false);
  }

  async function handleUpdateCountry(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = Number(e.target.value);
    const newCountry = availableCountries.find((country) => country.id === val);
    if (newCountry) setUpdatedCountry(newCountry);
  }

  async function fetchGenres() {
    setIsLoading(true);
    try {
      const majorGenreData: any = await API.graphql({ query: queries.majorGenres });
      const minorGenreData: any = await API.graphql({ query: queries.minorGenres });
      setAvailableMajorGenres(majorGenreData.data.majorGenres);
      setAvailableMinorGenres(minorGenreData.data.minorGenres);
    } catch (err) {
      console.log('error: ', err);
    }
    setIsLoading(false);
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
      {groupDeleted && (
        <Fragment>
          <h2>Group successfully deleted.</h2>
          <Link to="/search">
            <Button>Back to Search</Button>
          </Link>
        </Fragment>
      )}
      {groupData && toggleUpdateGroup && !groupDeleted && (
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
          <Button
            color={'light'}
            onClick={() => {
              resetUpdateData();
              setToggleUpdateGroup(false);
            }}
          >
            Cancel Edit
          </Button>
        </Fragment>
      )}
      {groupData && !toggleUpdateGroup && !groupDeleted && (
        <Fragment>
          <h3>{groupData.name}</h3>
          <p>Type: {groupData.type}</p>
          <p>Date formed: {moment(groupData.dateFormed).format('YYYY-MM-DD')}</p>
          <p>Major genre: {groupData.majorGenre ? groupData.majorGenre.name : 'none found'}</p>
          <p>Minor Genre: {groupData.minorGenre ? groupData.minorGenre.name : 'none found'}</p>
          <p>Country: {groupData.country ? groupData.country.name : 'none found'}</p>
          <p>Persons</p>
          {/* <ul>
            {persons.map((person) => (
              <li key={person.id}>{person.name}</li>
            ))}
          </ul> */}
          <Button
            onClick={() => {
              resetUpdateData();
              setToggleUpdateGroup(true);
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

export default GroupPage;
