import React, { useState, useEffect } from 'react';
import StyledForm from '../../styled-components/Form';
import Button from '../../styled-components/Button';
import API from '@aws-amplify/api';
import { createGroup as CreateGroup } from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import { Genre, Person } from '../../types/ArtistTypes';

interface Props {
  setGroups: React.Dispatch<React.SetStateAction<any>>;
}

interface GroupPersonsData {
  persons: string;
  prevState: [string];
}

const AddGroup: React.FC<Props> = ({ setGroups }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [dateFormed, setDateFormed] = useState('');
  const [majorGenre, setMajorGenre] = useState<number | string>('');
  const [minorGenre, setMinorGenre] = useState<number | string>('');
  const [country, setCountry] = useState<number | string>('');
  const [availableMajorGenres, setAvailableMajorGenres] = useState<Genre[]>([]);
  const [availableMinorGenres, setAvailableMinorGenres] = useState<Genre[]>([]);
  const [availablePersons, setAvailablePersons] = useState<Person[]>([]);
  const [selectedPersons, setSelectedPersons] = useState<Person[]>([]);

  // TODO: add separate useEffect to update minor genres when majorGenre is changed
  useEffect(() => {
    fetchMajorGenres();
    fetchMinorGenres();
    fetchPersons();
  }, []);

  // TODO: update to find individual person by name once the relevant data is there
  async function fetchPersons() {
    try {
      const personsData: any = await API.graphql({ query: queries.artists });
      setAvailablePersons(personsData.data.persons);
    } catch (err) {
      console.log('error: ', err);
    }
  }

  async function addPerson(e: React.ChangeEvent<HTMLSelectElement>) {
    const val: any = Number(e.target.value);
    if (val) {
      const selectedPerson = availablePersons.find((person) => person.id === val);
      if (selectedPerson && !selectedPersons.find((person) => person.id === val)) {
        setSelectedPersons((prevState) => {
          const newState = [...prevState];
          newState.push(selectedPerson);
          return newState;
        });
      }
    }
  }

  async function removePerson(id: number) {
    setSelectedPersons((prevState) => {
      return prevState.filter((person) => person.id !== id);
    });
  }

  async function fetchMajorGenres() {
    try {
      const majorGenreData: any = await API.graphql({ query: queries.majorGenres });
      setAvailableMajorGenres(majorGenreData.data.majorGenres);
    } catch (err) {
      console.log('error: ', err);
    }
  }

  // TODO: refactor when data model is updated to pluck minor genres corresponding to selected major genre
  async function fetchMinorGenres() {
    try {
      const minorGenreData: any = await API.graphql({ query: queries.minorGenres });
      setAvailableMinorGenres(minorGenreData.data.minorGenres);
    } catch (err) {
      console.log('error: ', err);
    }
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const newGroup = {
      name,
      type,
      dateFormed,
      majorGenre,
      minorGenre,
      country,
      persons: ['Test'],
    };
    setGroups((prevState: any) => [...prevState, newGroup]);
    setName('');
    setType('');
    setDateFormed('');
    setMajorGenre('');
    setMinorGenre('');
    setCountry('');

    try {
      await API.graphql({ query: CreateGroup, variables: { input: newGroup } });
      console.log('Successfully added group');
    } catch (err) {
      console.log('error: ', err);
    }
  }

  return (
    <StyledForm>
      <input
        type="text"
        placeholder="Enter artist name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="type-select">Type</label>
      <select name="type-select" value={type} onChange={(e) => setType(e.target.value)}>
        <option value="BAND">Band</option>
        <option value="ORCHESTRA">Orchestra</option>
      </select>
      <input type="date" value={dateFormed} onChange={(e) => setDateFormed(e.target.value)} />
      <label htmlFor="major-genre-select">
        Major Genre
        <select
          name="major-genre-select"
          value={majorGenre}
          onChange={(e) => setMajorGenre(e.target.value)}
        >
          {availableMajorGenres.length &&
            availableMajorGenres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
        </select>
      </label>
      <label htmlFor="minor-genre-select">
        Minor Genre
        <select
          name="minor-genre-select"
          value={minorGenre}
          onChange={(e) => setMinorGenre(e.target.value)}
        >
          {availableMinorGenres.length &&
            availableMinorGenres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
        </select>
      </label>
      <label htmlFor="country-select"></label>
      <select
        name="country-select"
        value={country}
        onChange={(e) => setCountry(Number(e.target.value))}
      >
        <option value="1">Canada</option>
        <option value="2">UK</option>
        <option value="3">US</option>
      </select>
      <p>People</p>
      <select value="" onChange={addPerson}>
        <option value={0}>Select a person</option>
        {availablePersons.length &&
          availablePersons.map((person: Person) => (
            <option value={Number(person.id)}>{person.name}</option>
          ))}
      </select>
      {selectedPersons && (
        <ul>
          {selectedPersons.map((person: Person) => (
            <div>
              <li key={person.id}>{person.name}</li>
              <button onClick={() => removePerson(person.id)}>Remove</button>
            </div>
          ))}
        </ul>
      )}
      <Button onClick={handleSubmit}>Submit</Button>
    </StyledForm>
  );
};

export default AddGroup;
