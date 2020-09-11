/* tslint:disable */
/* eslint-disable */

export const countries = /* GraphQL */ `
  query Countries {
    countries {
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
      country {
        id
        name
      }
      # groups {
      #   id
      #   name
      #   type
      #   dateFormed
      # }
    }
  }
`;
export const person = /* GraphQL */ `
  query Person($id: ID!) {
    person(id: $id) {
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

export const groups = /* GraphQL */ `
  query Groups {
    groups {
      id
      name
      type
      dateFormed
      # majorGenre {
      #   id
      #   name
      # }
      # minorGenre {
      #   id
      #   name
      # }
      # country {
      #   id
      #   name
      # }
      # persons {
      #   id
      #   name
      #   type
      #   dob
      # }
    }
  }
`;
export const group = /* GraphQL */ `
  query Group($id: ID!) {
    group(id: $id) {
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
export const authors = /* GraphQL */ `
  query Authors {
    authors {
      id
      name
    }
  }
`;
export const books = /* GraphQL */ `
  query Books {
    books {
      id
      title
    }
  }
`;
