import React, { useState, Fragment } from 'react';
import Container from '../styled-components/Container';
import Button from '../styled-components/Button';
import API from '@aws-amplify/api';
import { deleteArtist as DeleteArtist, updateArtist as UpdateArtist } from '../graphql/mutations';

interface Props {
  id: string;
  artistName: string;
  artistDescription: string;
  setArtists: React.Dispatch<React.SetStateAction<any>>;
}

const Artist: React.FC<Props> = ({ id, artistName, artistDescription, setArtists }) => {
  const [toggleUpdateArtist, setToggleUpdateArtist] = useState(false);
  const [updateArtistName, setUpdateArtistName] = useState(artistName);
  const [updateArtistDescription, setUpdateArtistDescription] = useState(artistDescription);

  const handleDelete = async (id: string) => {
    setArtists((prevState: any) => prevState.filter((artist: any) => artist.id !== id));
    try {
      await API.graphql({ query: DeleteArtist, variables: { input: { id } } });
      console.log('Successfully deleted artist');
    } catch (err) {
      console.log('error: ', err);
    }
  };

  const handleUpdate = async (id: string) => {
    setArtists((prevState: any) => {
      const editedArtist = prevState.find((artist: any) => artist.id === id);
      editedArtist.name = updateArtistName;
      editedArtist.description = updateArtistDescription;
      return [...prevState];
    });

    try {
      await API.graphql({
        query: UpdateArtist,
        variables: { input: { id, name: updateArtistName, description: updateArtistDescription } },
      });
      console.log('Successfully updated artist');
    } catch (err) {
      console.log('error: ', err);
    }
    setToggleUpdateArtist(false);
  };

  const handleUpdateToggle = () => {
    setToggleUpdateArtist((prevState) => !prevState);
    setUpdateArtistName(artistName);
    setUpdateArtistDescription(artistDescription);
  };

  return (
    <Container>
      {toggleUpdateArtist ? (
        <Fragment>
          <input
            type="text"
            value={updateArtistName}
            onChange={(e) => setUpdateArtistName(e.target.value)}
          />
          <input
            type="text"
            value={updateArtistDescription}
            onChange={(e) => setUpdateArtistDescription(e.target.value)}
          />
          <Button onClick={() => handleUpdate(id)}>Submit Changes</Button>
          <Button color={'red'} onClick={handleUpdateToggle}>
            Cancel Edit
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          <h3>{artistName}</h3>
          <p>{artistDescription}</p>
          <Button onClick={handleUpdateToggle}>Edit Artist Info</Button>
          <Button color={'red'} onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </Fragment>
      )}
    </Container>
  );
};

export default Artist;
