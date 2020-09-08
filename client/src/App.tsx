import React, { useState, useEffect, Fragment } from 'react';
import PersonForm from './components/PersonForm';
import GroupForm from './components/GroupForm';
import GroupCard from './components/GroupCard';
import PersonCard from './components/PersonCard';
import { ThemeProvider } from 'styled-components';
import API from '@aws-amplify/api';
import theme from './styled-components/Theme';
import Button from './styled-components/Button';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import { Group, Person } from './types/ArtistTypes';
import './scss/app.scss';

const App = () => {
  const [groups, setGroups] = useState<[Group] | []>([]);
  const [persons, setPersons] = useState([]);
  const [toggleForm, setToggleForm] = useState('person');

  useEffect(() => {
    fetchGroups();
    fetchPersons();
  }, []);

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

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <h2>Add and update artists</h2>
        <div className="app__buttons">
          <Button
            color={toggleForm === 'group' ? 'red' : ''}
            onClick={() => setToggleForm('person')}
          >
            Add Person
          </Button>
          <Button
            color={toggleForm == 'person' ? 'red' : ''}
            onClick={() => setToggleForm('group')}
          >
            Add Group
          </Button>
        </div>

        {toggleForm === 'person' ? (
          <PersonForm setPersons={setPersons} />
        ) : (
          <GroupForm setGroups={setGroups} />
        )}

        <section className="groups">
          <h2>Groups</h2>
          <div className="results-grid">
            {groups.length ? (
              groups.map((group: Group) => (
                <GroupCard key={group.id} group={group} setGroups={setGroups} />
              ))
            ) : (
              <p>No groups currently found</p>
            )}
          </div>
        </section>
        <section className="persons">
          <h2>Persons</h2>
          <div className="results-grid">
            {persons.length ? (
              persons.map((person: Person) => (
                <PersonCard key={person.id} person={person} setPersons={setPersons} />
              ))
            ) : (
              <p>No people currently found</p>
            )}
          </div>
        </section>
      </div>
    </ThemeProvider>
  );
};

export default App;
