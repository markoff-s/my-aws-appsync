import React from 'react';
import Card from '../../styled-components/Card';
import { Group, Person } from '../../types/ArtistTypes';
import Result from './Result';

interface Props {
  filteredGroups: Group[];
  filteredPersons: Person[];
  displayResults: boolean;
}

const ResultsContainer: React.FC<Props> = ({ filteredGroups, filteredPersons, displayResults }) => {
  const filteredGroupResults = filteredGroups.map((group) => (
    <Result
      key={`${group.id}-${group.name}`}
      name={group.name}
      type={group.type}
      country={group.country.name}
      comments="Awesome group"
    />
  ));
  const filteredPersonResults = filteredPersons.map((person) => (
    <Result
      key={`${person.id}-${person.name}`}
      name={person.name}
      type={person.type}
      country={person.country.name}
      comments="Awesome person"
    />
  ));

  return displayResults ? (
    <div className="results-container">
      <div className="results__categories">
        <p>Artist Name</p>
        <p>Type</p>
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
      <p>Search Artists, ISNI, WMG ID</p>
    </Card>
  );
};

export default ResultsContainer;
