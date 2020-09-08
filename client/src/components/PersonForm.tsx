import React, { useState } from 'react';
import StyledForm from '../styled-components/Form';
import Button from '../styled-components/Button';
import API from '@aws-amplify/api';
import { createPerson as CreatePerson } from '../graphql/mutations';

interface Props {
  setPersons: React.Dispatch<React.SetStateAction<any>>;
}

// TODO: flesh out logic for adding country & groups
const Form: React.FC<Props> = ({ setPersons }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [dob, setDob] = useState('');
  const [country, setCountry] = useState<number | string>('');
  // const [groups, setGroups] = useState()

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
  };

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
      <input
        type="text"
        placeholder="Enter country"
        value={country}
        onChange={(e) => setType(e.target.value)}
      />
      <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
    </StyledForm>
  );
};

export default Form;
