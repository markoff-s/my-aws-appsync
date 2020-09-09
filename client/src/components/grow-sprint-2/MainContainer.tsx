import React, { useState, useEffect } from 'react';
import Card from '../../styled-components/Card';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import API from '@aws-amplify/api';
import { Group, Person } from '../../types/ArtistTypes';
import Header from './Header';
import SearchContainer from './SearchContainer';
import ResultsContainer from './ResultsContainer';
import GroupPage from './GroupPage';
import PersonPage from './PersonPage';

const MainContainer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [groups, setGroups] = useState<Group[]>([]);
  const [persons, setPersons] = useState<Person[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const [filteredPersons, setFilteredPersons] = useState<Person[]>([]);
  const [displayResults, setDisplayResults] = useState(false);

  // Grab all group & person data (can later refactor for scalability)
  useEffect(() => {
    console.log('initializing filtered results');
    fetchGroups();
    fetchPersons();
  }, []);

  // update filtered results based on search string
  useEffect(() => {
    console.log('updating filtered results');
    if (searchTerm === '') {
      fetchGroups();
      fetchPersons();
    } else {
      updateResults();
    }
  }, [searchTerm]);

  // display search results if there's a search string
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setDisplayResults(false);
      setFilteredGroups([]);
      setFilteredPersons([]);
    } else setDisplayResults(true);
  }, [searchTerm]);

  async function fetchGroups() {
    try {
      const groupsData: any = await API.graphql({ query: queries.groups });
      setGroups(groupsData.data.groups);
    } catch (err) {
      console.log('error: ', err);
    }
  }

  async function fetchPersons() {
    try {
      const personsData: any = await API.graphql({ query: queries.persons });
      setPersons(personsData.data.persons);
    } catch (err) {
      console.log('error: ', err);
    }
  }

  // Note: filtering logic currently looks for the search string anywhere in the name
  function updateResults() {
    const regex = new RegExp(searchTerm, 'i');
    const updatedGroups = groups.filter((group) => group.name.match(regex));
    const updatedPersons = persons.filter((person) => person.name.match(regex));
    setFilteredGroups(updatedGroups);
    setFilteredPersons(updatedPersons);
  }
  const totalResults = filteredGroups.length + filteredPersons.length;

  return (
    <div>
      <Header />
      <h1>Welcome to Party Workspace</h1>
      <p>
        The central place for creating and managing names and IDs for our artists, participants,
        writers, producers, engineers, musicians, and other contributors.
      </p>
      <SearchContainer searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {totalResults > 0 && (
        <Card>
          <span className="bold">{totalResults}</span> Results
        </Card>
      )}
      <ResultsContainer
        filteredGroups={filteredGroups}
        filteredPersons={filteredPersons}
        displayResults={displayResults}
      />
    </div>
  );
};

export default MainContainer;
