import React, { useState, useEffect, Fragment } from 'react';
import API, { graphqlOperation } from '@aws-amplify/api';
import { Link } from 'react-router-dom';
import Card from '../styled-components/Card';
import Button from '../styled-components/Button';
import Spinner from '../components/Spinner';
import * as queries from '../graphql/queries';
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
  const [displayGroupScreen, setDisplayGroupScreen] = useState(false);
  const [displayPersonScreen, setDisplayPersonScreen] = useState(false);
  const [displayAddScreen, setDisplayAddScreen] = useState(false);
  const [currentGroupData, setCurrentGroupData] = useState<Group | null>(null);
  const [currentPersonData, setCurrentPersonData] = useState<Person | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // Grab all group & person data (can later refactor for scalability)
  useEffect(() => {
    console.log('fetching data');
    const fetchAllData = async () => {
      setIsLoading(true);
      await fetchGroups();
      await fetchPersons();
      setIsLoading(false);
    };
    fetchAllData();
  }, []);

  // update filtered results based on search string
  // useEffect(() => {
  //   console.log('updating filtered results');
  //   if (searchTerm === '') {
  //     fetchGroups();
  //     fetchPersons();
  //   } else updateResults();
  // }, [searchTerm]);

  // display search results if a valid string has been inputted
  // useEffect(() => {
  //   if (searchTerm.trim() === '') {
  //     setDisplayResults(false);
  //     setFilteredGroups([]);
  //     setFilteredPersons([]);
  //   } else setDisplayResults(true);
  // }, [searchTerm]);

  // log current persons data
  useEffect(() => {
    console.log({ persons });
    console.log({ groups });
  }, [persons, groups]);

  // load all data when component mounts
  // useEffect(() => {
  //   const loadDataOnCompMount = async () => {
  //     setIsLoading(true);
  //     await fetchGroups();
  //     await fetchPersons();
  //     setIsLoading(false);
  //     setDisplayResults(true);
  //   };
  //   loadDataOnCompMount();
  // }, []);

  async function handleSearch(searchType: string) {
    if (searchType === 'groups') {
      const groupsData: any = await API.graphql(
        graphqlOperation(queries.groups, { filter: { name: searchTerm } })
      );
      setGroups(groupsData.data.groups);
      setPersons([]);
    } else if (searchType === 'artists') {
      const artistsData: any = await API.graphql(
        graphqlOperation(queries.artists, { filter: { name: searchTerm } })
      );
      setPersons(artistsData.data.artists);
      setGroups([]);
    }
  }

  async function fetchGroups() {
    try {
      const groupsData: any = await API.graphql({ query: queries.groups });
      setGroups(groupsData.data.groups);
    } catch (err) {
      setError(true);
      setIsLoading(false);
      console.log('error: ', err);
    }
  }

  async function fetchPersons() {
    try {
      const personsData: any = await API.graphql({ query: queries.artists });
      setPersons(personsData.data.artists);
      console.log('got artist data');
    } catch (err) {
      setError(true);
      setIsLoading(false);
      console.log('error: ', err);
    }
  }

  const totalResults = (groups ? groups.length : 0) + (persons ? persons.length : 0);

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
      <SearchContainer
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      <Link to="/add">
        <Button>Add Artist or Group</Button>
      </Link>
      {error && (
        <Card>
          <h2>Nothing Found. Please Adjust Your Search.</h2>
        </Card>
      )}
      {isLoading && (
        <Card>
          <Spinner />
        </Card>
      )}
      {displayAddScreen && !displayGroupScreen && !displayPersonScreen && !error && (
        <AddContainer />
      )}
      {!displayGroupScreen && !displayPersonScreen && !displayAddScreen && !error && !isLoading && (
        <Fragment>
          {totalResults > 0 && (
            <Card>
              <span className="bold">{totalResults}</span> Results
            </Card>
          )}
          <ResultsContainer
            groups={groups}
            persons={persons}
            handleDisplayGroupScreen={handleDisplayGroupScreen}
            handleDisplayPersonScreen={handleDisplayPersonScreen}
          />
        </Fragment>
      )}
    </div>
  );
};

export default MainContainer;
