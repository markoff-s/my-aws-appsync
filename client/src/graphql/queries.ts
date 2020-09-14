/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const countries = /* GraphQL */ `
  query Countries {
    countries {
      id
      name
    }
  }
`;
export const country = /* GraphQL */ `
  query Country($id: Int!) {
    country(id: $id) {
      id
      name
    }
  }
`;
export const majorGenres = /* GraphQL */ `
  query MajorGenres {
    majorGenres {
      id
      name
    }
  }
`;
export const minorGenres = /* GraphQL */ `
  query MinorGenres {
    minorGenres {
      id
      name
    }
  }
`;
export const artists = /* GraphQL */ `
  query Artists {
    artists {
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
export const artist = /* GraphQL */ `
  query Artist($id: Int!) {
    artist(id: $id) {
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
export const groups = /* GraphQL */ `
  query Groups {
    groups {
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
export const group = /* GraphQL */ `
  query Group($id: Int!) {
    group(id: $id) {
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
