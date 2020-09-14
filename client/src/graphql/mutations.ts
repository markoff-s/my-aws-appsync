/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createArtist = /* GraphQL */ `
  mutation CreateArtist($input: CreatePersonInput!) {
    createArtist(input: $input) {
      id
      name
      type
      dob
      countryId
      country {
        id
        name
      }
      groups {
        id
        name
        type
        dateFormed
        majorGenreId
        minorGenreId
        countryId
      }
    }
  }
`;
export const updateArtist = /* GraphQL */ `
  mutation UpdateArtist($input: UpdatePersonInput!) {
    updateArtist(input: $input) {
      id
      name
      type
      dob
      countryId
      country {
        id
        name
      }
      groups {
        id
        name
        type
        dateFormed
        majorGenreId
        minorGenreId
        countryId
      }
    }
  }
`;
export const deleteArtist = /* GraphQL */ `
  mutation DeleteArtist($id: Int!) {
    deleteArtist(id: $id)
  }
`;
export const createGroup = /* GraphQL */ `
  mutation CreateGroup($input: CreateGroupInput!) {
    createGroup(input: $input) {
      id
      name
      type
      dateFormed
      majorGenreId
      majorGenre {
        id
        name
      }
      minorGenreId
      minorGenre {
        id
        name
      }
      countryId
      country {
        id
        name
      }
      persons {
        id
        name
        type
        dob
        countryId
      }
    }
  }
`;
export const updateGroup = /* GraphQL */ `
  mutation UpdateGroup($input: UpdateGroupInput!) {
    updateGroup(input: $input) {
      id
      name
      type
      dateFormed
      majorGenreId
      majorGenre {
        id
        name
      }
      minorGenreId
      minorGenre {
        id
        name
      }
      countryId
      country {
        id
        name
      }
      persons {
        id
        name
        type
        dob
        countryId
      }
    }
  }
`;
export const deleteGroup = /* GraphQL */ `
  mutation DeleteGroup($id: Int!) {
    deleteGroup(id: $id)
  }
`;
