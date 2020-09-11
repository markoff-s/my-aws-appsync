import React, { useState, useEffect, Fragment } from 'react';
import Card from '../styled-components/Card';
import Button from '../styled-components/Button';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import API from '@aws-amplify/api';
import { Group, Person } from '../types/ArtistTypes';
import SearchContainer from './SearchContainer';
import ResultsContainer from './ResultsContainer';
import GroupPage from '../components/GroupPage';
import PersonPage from '../components/PersonPage';
import AddContainer from './AddContainer';

const MainContainer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [groups, setGroups] = useState<Group[]>([]);
  const [persons, setPersons] = useState<Person[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const [filteredPersons, setFilteredPersons] = useState<Person[]>([]);
  const [displayResults, setDisplayResults] = useState(false);
  const [displayGroupScreen, setDisplayGroupScreen] = useState(false);
  const [displayPersonScreen, setDisplayPersonScreen] = useState(false);
  const [displayAddScreen, setDisplayAddScreen] = useState(false);
  const [currentGroupData, setCurrentGroupData] = useState<Group | null>(null);
  const [currentPersonData, setCurrentPersonData] = useState<Person | null>();
  const [error, setError] = useState(false);

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
    } else updateResults();
  }, [searchTerm]);

  // display search results if a valid string has been inputted
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setDisplayResults(false);
      setFilteredGroups([]);
      setFilteredPersons([]);
    } else setDisplayResults(true);
  }, [searchTerm]);

  // log current persons data
  useEffect(() => {
    console.log({ persons });
    console.log({ groups });
  }, [persons]);

  async function fetchGroups() {
    try {
      const groupsData: any = await API.graphql({ query: queries.groups });
      setGroups(groupsData.data.groups);
    } catch (err) {
      setError(true);
      console.log('error: ', err);
    }
  }

  async function fetchPersons() {
    try {
      const personsData: any = await API.graphql({ query: queries.artists });
      console.log(personsData.data.artists);
      setPersons(personsData.data.artists);
      console.log('got artist data');
    } catch (err) {
      setError(true);
      console.log('error: ', err);
    }
  }

  // Note: filtering logic currently looks for the search string anywhere in the name
  // TODO: Refactor so that search only occurs when user explicitly clicks/taps button
  function updateResults() {
    const regex = new RegExp(searchTerm, 'i');
    const updatedGroups = groups.filter((group) => group.name.match(regex));
    const updatedPersons = persons.filter((person) => person.name.match(regex));
    console.log(updatedPersons);
    setFilteredGroups(updatedGroups);
    setFilteredPersons(updatedPersons);
  }

  const totalResults = filteredGroups.length + filteredPersons.length;

  function handleDisplayGroupScreen(group: Group) {
    setCurrentGroupData(group);
    setDisplayGroupScreen(true);
  }

  function handleDisplayPersonScreen(person: Person) {
    setCurrentPersonData(person);
    setDisplayPersonScreen(true);
  }

  // log current person and group data
  useEffect(() => {
    console.log('updated person data: ', currentPersonData);
    console.log('updated group data: ', currentGroupData);
  }, [currentGroupData, currentPersonData]);

  // switch back from artist, group, or create page to main search page
  function handleDisplayReset() {
    setCurrentGroupData(null);
    setCurrentPersonData(null);
    setDisplayPersonScreen(false);
    setDisplayGroupScreen(false);
    setDisplayAddScreen(false);
  }

  return (
    <div>
      <h1>Welcome to the Workspace</h1>
      <p>
        The central place for creating and managing names and IDs for artists, participants,
        writers, producers, engineers, musicians, and other contributors.
      </p>
      <Button onClick={() => setDisplayAddScreen(true)}>Add Artist or Group</Button>
      {error && <h2>Error</h2>}
      {displayAddScreen && !displayGroupScreen && !displayPersonScreen && !error && (
        <AddContainer
          setGroups={setGroups}
          setPersons={setPersons}
          handleDisplayReset={handleDisplayReset}
        />
      )}
      {!displayGroupScreen && !displayPersonScreen && !displayAddScreen && !error && (
        <Fragment>
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
            handleDisplayGroupScreen={handleDisplayGroupScreen}
            handleDisplayPersonScreen={handleDisplayPersonScreen}
          />
        </Fragment>
      )}
      {displayGroupScreen && !displayPersonScreen && currentGroupData && !error && (
        <GroupPage
          group={currentGroupData}
          setGroups={setGroups}
          handleGoBack={handleDisplayReset}
        />
      )}
      {!displayGroupScreen && displayPersonScreen && currentPersonData && !error && (
        <PersonPage
          person={currentPersonData}
          setPersons={setPersons}
          handleGoBack={handleDisplayReset}
        />
      )}
    </div>
  );
};

export default MainContainer;
