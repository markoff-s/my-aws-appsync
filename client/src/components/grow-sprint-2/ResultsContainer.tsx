import React from 'react';
import Card from '../../styled-components/Card';
import { Group, Person } from '../../types/ArtistTypes';
import Result from './Result';

interface Props {
  filteredGroups: Group[];
  filteredPersons: Person[];
  displayResults: boolean;
  handleDisplayGroupScreen: (group: Group) => void;
  handleDisplayPersonScreen: (person: Person) => void;
}

const ResultsContainer: React.FC<Props> = ({
  filteredGroups,
  filteredPersons,
  displayResults,
  handleDisplayGroupScreen,
  handleDisplayPersonScreen,
}) => {
  const filteredGroupResults = filteredGroups.map((group) => (
    <Result
      key={`${group.id}-${group.name}`}
      name={group.name}
      format="Band Name"
      country={group.country.name}
      comments="Awesome group"
      onClick={() => handleDisplayGroupScreen(group)}
    />
  ));
  const filteredPersonResults = filteredPersons.map((person) => (
    <Result
      key={`${person.id}-${person.name}`}
      name={person.name}
      format="Artist Name"
      country={'US'}
      comments="Awesome person"
      onClick={() => handleDisplayPersonScreen(person)}
    />
  ));

  return displayResults ? (
    <div className="results-container">
      <div className="results__categories">
        <p>Artist Name</p>
        <p>Format</p>
        <p>Country of Origin</p>
        <p>Internal Comments</p>
      </div>
      <Card className="results-grid">
        {filteredGroupResults}
        {filteredPersonResults}
      </Card>
    </div>
  ) : (
    <Card>
      <p>Search Artists, ISNI, ID</p>
    </Card>
  );
};

export default ResultsContainer;
