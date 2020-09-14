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


export type UpdatePersonInput = {
  id: number,
  name: string,
  type: PersonType,
  dob: string,
  countryId: number,
  groups?: Array< number | null > | null,
};

export type CreateGroupInput = {
  name: string,
  type: GroupType,
  dateFormed: string,
  majorGenreId?: number | null,
  minorGenreId?: number | null,
  countryId?: number | null,
};

export type UpdateGroupInput = {
  id: number,
  name: string,
  type: GroupType,
  dateFormed: string,
  majorGenreId: number,
  minorGenreId: number,
  countryId: number,
};

export type CreateArtistMutationVariables = {
  input: CreatePersonInput,
};

export type CreateArtistMutation = {
  createArtist:  {
    __typename: "Person",
    id: number,
    name: string,
    type: PersonType,
    dob: string,
    countryId: number,
    country:  {
      __typename: "Country",
      id: number,
      name: string,
    } | null,
    groups:  Array< {
      __typename: "Group",
      id: number,
      name: string,
      type: GroupType,
      dateFormed: string,
      majorGenreId: number | null,
      minorGenreId: number | null,
      countryId: number | null,
    } > | null,
  },
};

export type UpdateArtistMutationVariables = {
  input: UpdatePersonInput,
};

export type UpdateArtistMutation = {
  updateArtist:  {
    __typename: "Person",
    id: number,
    name: string,
    type: PersonType,
    dob: string,
    countryId: number,
    country:  {
      __typename: "Country",
      id: number,
      name: string,
    } | null,
    groups:  Array< {
      __typename: "Group",
      id: number,
      name: string,
      type: GroupType,
      dateFormed: string,
      majorGenreId: number | null,
      minorGenreId: number | null,
      countryId: number | null,
    } > | null,
  },
};

export type DeleteArtistMutationVariables = {
  id: number,
};

export type DeleteArtistMutation = {
  deleteArtist: number,
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
    majorGenreId: number | null,
    majorGenre:  {
      __typename: "MajorGenre",
      id: number,
      name: string,
    } | null,
    minorGenreId: number | null,
    minorGenre:  {
      __typename: "MinorGenre",
      id: number,
      name: string,
    } | null,
    countryId: number | null,
    country:  {
      __typename: "Country",
      id: number,
      name: string,
    } | null,
    persons:  Array< {
      __typename: "Person",
      id: number,
      name: string,
      type: PersonType,
      dob: string,
      countryId: number,
    } > | null,
  },
};

export type UpdateGroupMutationVariables = {
  input: UpdateGroupInput,
};

export type UpdateGroupMutation = {
  updateGroup:  {
    __typename: "Group",
    id: number,
    name: string,
    type: GroupType,
    dateFormed: string,
    majorGenreId: number | null,
    majorGenre:  {
      __typename: "MajorGenre",
      id: number,
      name: string,
    } | null,
    minorGenreId: number | null,
    minorGenre:  {
      __typename: "MinorGenre",
      id: number,
      name: string,
    } | null,
    countryId: number | null,
    country:  {
      __typename: "Country",
      id: number,
      name: string,
    } | null,
    persons:  Array< {
      __typename: "Person",
      id: number,
      name: string,
      type: PersonType,
      dob: string,
      countryId: number,
    } > | null,
  },
};

export type DeleteGroupMutationVariables = {
  id: number,
};

export type DeleteGroupMutation = {
  deleteGroup: number,
};

export type CountriesQuery = {
  countries:  Array< {
    __typename: "Country",
    id: number,
    name: string,
  } >,
};

export type CountryQueryVariables = {
  id: number,
};

export type CountryQuery = {
  country:  {
    __typename: "Country",
    id: number,
    name: string,
  } | null,
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

export type ArtistsQuery = {
  artists:  Array< {
    __typename: "Person",
    id: number,
    name: string,
    type: PersonType,
    dob: string,
    countryId: number,
    country:  {
      __typename: "Country",
      id: number,
      name: string,
    } | null,
    groups:  Array< {
      __typename: "Group",
      id: number,
      name: string,
      type: GroupType,
      dateFormed: string,
      majorGenreId: number | null,
      minorGenreId: number | null,
      countryId: number | null,
    } > | null,
  } >,
};

export type ArtistQueryVariables = {
  id: number,
};

export type ArtistQuery = {
  artist:  {
    __typename: "Person",
    id: number,
    name: string,
    type: PersonType,
    dob: string,
    countryId: number,
    country:  {
      __typename: "Country",
      id: number,
      name: string,
    } | null,
    groups:  Array< {
      __typename: "Group",
      id: number,
      name: string,
      type: GroupType,
      dateFormed: string,
      majorGenreId: number | null,
      minorGenreId: number | null,
      countryId: number | null,
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
    majorGenreId: number | null,
    majorGenre:  {
      __typename: "MajorGenre",
      id: number,
      name: string,
    } | null,
    minorGenreId: number | null,
    minorGenre:  {
      __typename: "MinorGenre",
      id: number,
      name: string,
    } | null,
    countryId: number | null,
    country:  {
      __typename: "Country",
      id: number,
      name: string,
    } | null,
    persons:  Array< {
      __typename: "Person",
      id: number,
      name: string,
      type: PersonType,
      dob: string,
      countryId: number,
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
    majorGenreId: number | null,
    majorGenre:  {
      __typename: "MajorGenre",
      id: number,
      name: string,
    } | null,
    minorGenreId: number | null,
    minorGenre:  {
      __typename: "MinorGenre",
      id: number,
      name: string,
    } | null,
    countryId: number | null,
    country:  {
      __typename: "Country",
      id: number,
      name: string,
    } | null,
    persons:  Array< {
      __typename: "Person",
      id: number,
      name: string,
      type: PersonType,
      dob: string,
      countryId: number,
    } > | null,
  } | null,
};
