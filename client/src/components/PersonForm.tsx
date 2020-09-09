import React, { useState, useEffect } from 'react';
import StyledForm from '../styled-components/Form';
import Button from '../styled-components/Button';
import API from '@aws-amplify/api';
import { createPerson as CreatePerson } from '../graphql/mutations';
import * as queries from '../graphql/queries';
import { Country, Group } from '../types/ArtistTypes';

interface Props {
  setPersons: React.Dispatch<React.SetStateAction<any>>;
}

// TODO: flesh out logic for adding groups
const Form: React.FC<Props> = ({ setPersons }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [dob, setDob] = useState('');
  const [country, setCountry] = useState<number | string>('');
  const [availableCountries, setAvailableCountries] = useState<Country[]>([]);
  const [availableGroups, setAvailableGroups] = useState<Group[]>();
  const [selectedGroups, setSelectedGroups] = useState<Group[]>([]);

  useEffect(() => {
    fetchCountries();
    fetchGroups();
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
      const selectedGroup = availableGroups.find((group) => group.id === val);
      if (selectedGroup && !selectedGroups.find((group) => group.id === val)) {
        setSelectedGroups((prevState) => {
          const newState = [...prevState];
          newState.push(selectedGroup);
          return newState;
        });
      }
    }
  }

  async function removeGroup(id: number) {
    setSelectedGroups((prevState) => {
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
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        {availableCountries.length &&
          availableCountries.map((country: Country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
      </select>
      <select value="" onChange={addGroup}>
        <option value={0}>Select a Group</option>
        {availableGroups &&
          availableGroups.map((group: Group) => (
            <option value={Number(group.id)}>{group.name}</option>
          ))}
      </select>
      {selectedGroups && (
        <ul>
          {selectedGroups.map((group: Group) => (
            <div>
              <li key={group.id}>{group.name}</li>
              <button onClick={() => removeGroup(group.id)}>Remove</button>
            </div>
          ))}
        </ul>
      )}
      <Button onClick={handleSubmit}>Submit</Button>
    </StyledForm>
  );
};

export default Form;
