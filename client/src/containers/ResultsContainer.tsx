import React from 'react';
import Card from '../styled-components/Card';
import { Group, Person } from '../types/ArtistTypes';
import Result from '../components/Result';

interface Props {
  groups: Group[];
  persons: Person[];
  handleDisplayGroupScreen: (group: Group) => void;
  handleDisplayPersonScreen: (person: Person) => void;
}

const ResultsContainer: React.FC<Props> = ({
  groups,
  persons,
  handleDisplayGroupScreen,
  handleDisplayPersonScreen,
}) => {
  const groupResults = groups.map((group) => (
    <Result
      key={`${group.name}-${group.id}`}
      id={group.id}
      name={group.name}
      type="group"
      format="Band Name"
      country={group.country ? group.country.name : 'Not found'}
      comments="Awesome group"
    />
  ));
  const personResults = persons.map((person) => (
    <Result
      key={`${person.name}-${person.id}`}
      id={person.id}
      name={person.name}
      type="artist"
      format="Artist Name"
      country={person.country ? person.country.name : 'Not found'}
      comments="Awesome person"
    />
  ));

  return (
    <div className="results-container">
      <div className="results__categories">
        <p>Artist Name</p>
        <p>Format</p>
        <p>Country of Origin</p>
        <p>Internal Comments</p>
      </div>
      <Card className="results-grid">
        {groupResults}
        {personResults}
      </Card>
    </div>
  );
};

export default ResultsContainer;
