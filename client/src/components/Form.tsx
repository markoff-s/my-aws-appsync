import React, { useState } from 'react';
import StyledForm from '../styled-components/Form';
import Button from '../styled-components/Button';
import API from '@aws-amplify/api';
import { createArtist as CreateArtist } from '../graphql/mutations';
import { v4 as uuid } from 'uuid';

interface Props {
  setArtists: React.Dispatch<React.SetStateAction<any>>;
}

const Form: React.FC<Props> = ({ setArtists }) => {
  const [artistName, setArtistName] = useState('');
  const [artistDescription, setArtistDescription] = useState('');

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const newArtist = { id: uuid(), name: artistName, description: artistDescription };
    setArtists((prevState: any) => [...prevState, newArtist]);
    setArtistName('');
    setArtistDescription('');
    try {
      await API.graphql({ query: CreateArtist, variables: { input: newArtist } });
      console.log('Successfully added artist');
    } catch (err) {
      console.log('error: ', err);
    }
  };

  return (
    <StyledForm>
      <input
        type="text"
        placeholder="Enter artist name"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter artist description"
        value={artistDescription}
        onChange={(e) => setArtistDescription(e.target.value)}
      />
      <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
    </StyledForm>
  );
};

export default Form;
