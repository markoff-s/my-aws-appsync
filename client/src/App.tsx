import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Artist from './components/Artist';
import { ThemeProvider } from 'styled-components';
import API from '@aws-amplify/api';
import theme from './styled-components/Theme';
import './scss/app.scss';

interface Artist {
  id: string;
  name: string;
  description: string;
}

const App = () => {
  const [artists, setArtists] = useState([]);

  const fetchArtists = async () => {
    try {
      const artistsData: any = await API.graphql({ query: ListArtists });
      setArtists(artistsData.data.listArtists.items);
    } catch (err) {
      console.log('error: ', err);
    }
  };
  useEffect(() => {
    fetchArtists();
  }, []);

  useEffect(() => {
    console.log(artists);
  }, [artists]);

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <h2>Add and update artists</h2>
        <Form setArtists={setArtists} />
        {artists && (
          <div className="artist-grid">
            {artists.map((artist: Artist) => (
              <Artist
                key={artist.id}
                id={artist.id}
                artistName={artist.name}
                artistDescription={artist.description}
                setArtists={setArtists}
              />
            ))}
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
