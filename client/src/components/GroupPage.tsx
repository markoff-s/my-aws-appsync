import React, { useState, useEffect, Fragment } from 'react';
import Card from '../styled-components/Card';
import Button from '../styled-components/Button';
import API from '@aws-amplify/api';
import { Group, Genre, Country } from '../types/ArtistTypes';
import * as queries from '../graphql/queries';
// TODO: import edit/delete mutations when they're ready
import * as mutations from '../graphql/mutations';

interface GroupProps {
  group: Group;
  setGroups: React.Dispatch<React.SetStateAction<any>>;
  handleGoBack: () => void;
}

const GroupPage: React.FC<GroupProps> = ({ group, setGroups, handleGoBack }) => {
  const { id, name, type, dateFormed, persons } = group;
  const majorGenre = { id: 863, name: 'Action' };
  const minorGenre = { id: 599, name: '120' };
  const country = { id: 287, name: 'Argentina' };

  const [toggleUpdateGroup, setToggleUpdateGroup] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedType, setUpdatedType] = useState(type);
  const [updatedDateFormed, setUpdatedDateFormed] = useState(dateFormed);
  const [updatedMajorGenre, setUpdatedMajorGenre] = useState(majorGenre);
  const [updatedMinorGenre, setUpdatedMinorGenre] = useState(minorGenre);
  const [updatedCountry, setUpdatedCountry] = useState(country);
  const [updatePersons, setUpdatePersons] = useState(persons);

  const [availableMajorGenres, setAvailableMajorGenres] = useState<Genre[]>([]);
  const [availableMinorGenres, setAvailableMinorGenres] = useState<Genre[]>([]);
  const [availableCountries, setAvailableCountries] = useState<Country[]>([]);

  // Fetch all country and genre info when component mounts
  useEffect(() => {
    fetchCountries();
    fetchGenres();
  }, []);

  const handleDelete = async () => {
    setGroups((prevState: any) => prevState.filter((artist: any) => artist.id !== id));
    try {
      await API.graphql({ query: mutations.deleteGroup, variables: { input: { id } } });
      console.log('Successfully deleted artist');
    } catch (err) {
      console.log('error: ', err);
    }
  };

  const handleUpdate = async () => {
    try {
      await API.graphql({
        query: mutations.updateGroup,
        variables: {
          input: {
            id,
            name: updatedName,
            type: updatedType,
            dateFormed: updatedDateFormed,
            majorGenre: updatedMajorGenre,
            minorGenre: updatedMinorGenre,
            country: updatedCountry,
            // persons: updatedPersons
          },
        },
      });
      console.log('Successfully updated artist');
    } catch (err) {
      console.log('error: ', err);
    }
    setToggleUpdateGroup(false);
  };

  // reset update field values when toggling between read and update mode
  const handleUpdateToggle = () => {
    setToggleUpdateGroup((prevState) => !prevState);
    setUpdatedName(name);
    setUpdatedType(type);
    setUpdatedDateFormed(dateFormed);
    setUpdatedMajorGenre(majorGenre);
    setUpdatedMinorGenre(minorGenre);
    setUpdatedCountry(country);
    // setUpdatePersons(persons);
  };

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
      <Button onClick={handleGoBack}>Go Back</Button>
      {toggleUpdateGroup ? (
        <Fragment>
          <input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
          <select value={type} onChange={(e) => setUpdatedType(e.target.value)}>
            <option>Select type</option>
            <option value="BAND">BAND</option>
            <option value="ORCHESTRA">ORCHESTRA</option>
          </select>
          <input
            type="date"
            value={updatedDateFormed}
            onChange={(e) => setUpdatedDateFormed(e.target.value)}
          />
          <select value={majorGenre.id} onChange={(e) => handleUpdateMajorGenre(e)}>
            {availableMajorGenres.length &&
              availableMajorGenres.map((country: Country) => (
                <option key={`${majorGenre.id}-${majorGenre.name}`} value={majorGenre.id}>
                  {majorGenre.name}
                </option>
              ))}
          </select>
          <select value={minorGenre.id} onChange={(e) => handleUpdateMinorGenre(e)}>
            {availableMinorGenres.length &&
              availableMinorGenres.map((country: Country) => (
                <option key={`${minorGenre.id}-${minorGenre.name}`} value={minorGenre.id}>
                  {minorGenre.name}
                </option>
              ))}
          </select>

          <select value={updatedCountry.id} onChange={handleUpdateCountry}>
            {availableCountries.length &&
              availableCountries.map((country: Country) => (
                <option key={`${country.id}-${country.name}`} value={country.id}>
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
          <Button color={'light'} onClick={handleUpdateToggle}>
            Cancel Edit
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          <h3>{name}</h3>
          <p>Type: {type}</p>
          <p>Date formed: {dateFormed}</p>
          <p>Major genre: {majorGenre.name}</p>
          <p>Minor Genre: {minorGenre.name}</p>
          <p>Country: {country.name}</p>
          <p>Persons</p>
          {/* <ul>
            {persons.map((person) => (
              <li key={person.id}>{person.name}</li>
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

export default GroupPage;
