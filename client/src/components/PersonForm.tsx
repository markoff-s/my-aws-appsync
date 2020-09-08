import React, { useState, useEffect } from 'react';
import StyledForm from '../styled-components/Form';
import Button from '../styled-components/Button';
import API from '@aws-amplify/api';
import { createPerson as CreatePerson } from '../graphql/mutations';
import * as queries from '../graphql/queries';
import { Country } from '../types/ArtistTypes';

interface Props {
  setPersons: React.Dispatch<React.SetStateAction<any>>;
}

// TODO: flesh out logic for adding groups
const Form: React.FC<Props> = ({ setPersons }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [dob, setDob] = useState('');
  const [country, setCountry] = useState<number | string>('');
  // const [groups, setGroups] = useState()
  const [availableCountries, setAvailableCountries] = useState<[Country] | []>([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const newPerson = { name, type, dob, country };
    setName('');
    setType('');
    setDob('');
    setCountry('');
    try {
      await API.graphql({ query: CreatePerson, variables: { input: newPerson } });
      console.log('Successfully added person');
    } catch (err) {
      console.log('error: ', err);
    }
  }

  async function fetchCountries() {
    try {
      const countryData: any = await API.graphql({ query: queries.countries });
      console.log(countryData);
      setAvailableCountries(countryData.data.countries);
    } catch (err) {
      console.log('error: ', err);
    }
  }

  return (
    <StyledForm>
      <input
        type="text"
        placeholder="Enter person's name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <input
        type="date"
        placeholder="Enter date of birth"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />
      <select value={country} onChange={(e) => setType(e.target.value)}>
        {availableCountries.length &&
          availableCountries.map((country: Country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
      </select>
      <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
    </StyledForm>
  );
};

export default Form;
