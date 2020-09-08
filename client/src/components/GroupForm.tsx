import React, { useState } from 'react';
import StyledForm from '../styled-components/Form';
import Button from '../styled-components/Button';
import API from '@aws-amplify/api';
import { createGroup as CreateGroup } from '../graphql/mutations';

interface Props {
  setGroups: React.Dispatch<React.SetStateAction<any>>;
}

interface GroupPersonsData {
  persons: string;
  prevState: [string];
}

// TODO: simplify state management
// TODO: flesh out logic for adding genres, country, and people

const Form: React.FC<Props> = ({ setGroups }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [dateFormed, setDateFormed] = useState('');
  const [majorGenre, setMajorGenre] = useState('');
  const [minorGenre, setMinorGenre] = useState('');
  const [country, setCountry] = useState<number | string>('');
  const [personVal, setPersonVal] = useState('');
  // const [persons, setPersons] = useState<GroupPersonsData | [string]>([]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
  };

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
          <option value="Pop">Pop</option>
          <option value="Rock">Rock</option>
          <option value="Hip Hop">Hip Hop</option>
          <option value="Classical">Classical</option>
        </select>
      </label>
      <label htmlFor="minor-genre-select">
        Minor Genre
        <select
          name="minor-genre-select"
          value={minorGenre}
          onChange={(e) => setMinorGenre(e.target.value)}
        >
          <option value="Jazz">Jazz</option>
          <option value="Punk">Punk</option>
          <option value="Indie">Indie</option>
          <option value="Folk">Folk</option>
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
      {/* <input
        type="text"
        placeholder="Add people here"
        value={personVal}
        onChange={(e) => setPersonVal(e.target.value)}
      />
      <button
        onClick={() => {
          setPersons((prevState) => [...prevState, personVal]);
          setPersonVal('');
        }}
      >
        Add person
      </button>
      <ul>
        {persons.map((person, idx) => (
          <li key={idx}>{person}</li>
        ))}
      </ul> */}
      <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
    </StyledForm>
  );
};

export default Form;
