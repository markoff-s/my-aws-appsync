/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePersonInput = {
  name: string,
  type: PersonType,
  dob: string,
  countryId: number,
  groups?: Array< number | null > | null,
};

export enum PersonType {
  NATURAL_PERSON = "NATURAL_PERSON",
  UNNATURAL_PERSON = "UNNATURAL_PERSON",
}


export enum GroupType {
  BAND = "BAND",
  ORCHESTRA = "ORCHESTRA",
}


export type CreateGroupInput = {
  name: string,
  type: GroupType,
  dateFormed: string,
  majorGenreId: number,
  minorGenreId: number,
  countryId: number,
  persons?: Array< number | null > | null,
};

export type CreatePersonMutationVariables = {
  input: CreatePersonInput,
};

export type CreatePersonMutation = {
  createPerson:  {
    __typename: "Person",
    id: number,
    name: string,
    type: PersonType,
    dob: string,
    country:  {
      __typename: "Country",
      id: number,
      name: string,
    },
    groups:  Array< {
      __typename: "Group",
      id: number,
      name: string,
      type: GroupType,
      dateFormed: string,
    } > | null,
  },
};

export type CreateGroupMutationVariables = {
  input: CreateGroupInput,
};

export type CreateGroupMutation = {
  createGroup:  {
    __typename: "Group",
    id: number,
    name: string,
    type: GroupType,
    dateFormed: string,
    majorGenre:  {
      __typename: "MajorGenre",
      id: number,
      name: string,
    },
    minorGenre:  {
      __typename: "MinorGenre",
      id: number,
      name: string,
    },
    country:  {
      __typename: "Country",
      id: number,
      name: string,
    },
    persons:  Array< {
      __typename: "Person",
      id: number,
      name: string,
      type: PersonType,
      dob: string,
    } > | null,
  },
};

export type CountriesQuery = {
  countries:  Array< {
    __typename: "Country",
    id: number,
    name: string,
  } >,
};

export type MajorGenresQuery = {
  majorGenres:  Array< {
    __typename: "MajorGenre",
    id: number,
    name: string,
  } >,
};

export type MinorGenresQuery = {
  minorGenres:  Array< {
    __typename: "MinorGenre",
    id: number,
    name: string,
  } >,
};

export type PersonsQuery = {
  persons:  Array< {
    __typename: "Person",
    id: number,
    name: string,
    type: PersonType,
    dob: string,
    country:  {
      __typename: "Country",
      id: number,
      name: string,
    },
    groups:  Array< {
      __typename: "Group",
      id: number,
      name: string,
      type: GroupType,
      dateFormed: string,
    } > | null,
  } >,
};

export type PersonQueryVariables = {
  id: number,
};

export type PersonQuery = {
  person:  {
    __typename: "Person",
    id: number,
    name: string,
    type: PersonType,
    dob: string,
    country:  {
      __typename: "Country",
      id: number,
      name: string,
    },
    groups:  Array< {
      __typename: "Group",
      id: number,
      name: string,
      type: GroupType,
      dateFormed: string,
    } > | null,
  } | null,
};

export type GroupsQuery = {
  groups:  Array< {
    __typename: "Group",
    id: number,
    name: string,
    type: GroupType,
    dateFormed: string,
    majorGenre:  {
      __typename: "MajorGenre",
      id: number,
      name: string,
    },
    minorGenre:  {
      __typename: "MinorGenre",
      id: number,
      name: string,
    },
    country:  {
      __typename: "Country",
      id: number,
      name: string,
    },
    persons:  Array< {
      __typename: "Person",
      id: number,
      name: string,
      type: PersonType,
      dob: string,
    } > | null,
  } >,
};

export type GroupQueryVariables = {
  id: number,
};

export type GroupQuery = {
  group:  {
    __typename: "Group",
    id: number,
    name: string,
    type: GroupType,
    dateFormed: string,
    majorGenre:  {
      __typename: "MajorGenre",
      id: number,
      name: string,
    },
    minorGenre:  {
      __typename: "MinorGenre",
      id: number,
      name: string,
    },
    country:  {
      __typename: "Country",
      id: number,
      name: string,
    },
    persons:  Array< {
      __typename: "Person",
      id: number,
      name: string,
      type: PersonType,
      dob: string,
    } > | null,
  } | null,
};

export type AuthorsQuery = {
  authors:  Array< {
    __typename: "Author",
    id: string,
    name: string,
  } >,
};

export type BooksQuery = {
  books:  Array< {
    __typename: "Book",
    id: string,
    title: string,
  } >,
};
