/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPerson = /* GraphQL */ `
  mutation CreatePerson($input: CreatePersonInput!) {
    createPerson(input: $input) {
      id
      name
      type
      dob
      country {
        id
        name
      }
      groups {
        id
        name
        type
        dateFormed
      }
    }
  }
`;
export const createGroup = /* GraphQL */ `
  mutation CreateGroup($input: CreateGroupInput!) {
    createGroup(input: $input) {
      id
      name
      type
      dateFormed
      majorGenre {
        id
        name
      }
      minorGenre {
        id
        name
      }
      country {
        id
        name
      }
      persons {
        id
        name
        type
        dob
      }
    }
  }
`;

export const updatePerson = {};
export const updateGroup = {};
export const deletePerson = {};
export const deleteGroup = {};
